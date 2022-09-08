import { NextFunction, Response, Request } from 'express';
import prisma from '../helpers/prisma';
import redis from '../helpers/redisClient';

const REDIS_CACHE_DURATION = 60 * 5;

const addNote = async (req: Request, res: Response, next: NextFunction) => {
  const { title, text } = req.body;

  try {
    if (!title || !text || text.length < 1)
      throw 'Required fields is not entered.';

    if (title.length < 3 || title.length > 10)
      throw 'Title length must be beetween 5 and 10';

    const user = await prisma.user.findUnique({
      where: {
        username: res.locals.jwt.username,
      },
    });

    if (!user) throw 'There was a problem with the authentication.';

    const isExist = await prisma.text
    .findFirstOrThrow({
      where: {
        title: title,
        author: {
          username: user.username,
        },
      },
    })
    

    if(isExist) throw 'This title already exist.'

    const textInfo = await prisma.text.create({
      data: {
        authorId: user.id,
        title: title,
        text: text,
      },
    });

    return res.status(200).send({
      isError: false,
      message: 'Text added successfuly',
      addedTextInfo: textInfo,
    });
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(400).send({ isError: true, message: error.message });

    return res.status(400).send({ isError: true, message: error });
  }
};

const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;

  try {
    if (!id) throw 'Required fields is not entered.';

    const textInfo = await prisma.text
      .delete({
        where: {
          id: id,
        },
      })
      .catch((e: unknown) => {
        throw 'an error occurred while processing your request. Please try again.';
      });

    return res.status(200).send({
      isError: false,
      message: 'Text deleted successfuly',
      deletedTextInfo: textInfo,
    });
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(400).send({ isError: true, message: error.message });

    return res.status(400).send({ isError: true, message: error });
  }
};

const getNote = async (req: Request, res: Response, next: NextFunction) => {
  const { user, title } = req.params;

  try {
    if (!title || !user) throw 'Required fields is not entered.';

    let textInfo: unknown | null = null;

    // get redis cache

    const getFromCache = await redis.get(`${user}:${title}`);

    if (getFromCache) {
      textInfo = JSON.parse(getFromCache);
    } else {
      textInfo = await prisma.text
        .findFirstOrThrow({
          where: {
            title: title,
            author: {
              username: user,
            },
          },
        })
        .catch((e: unknown) => {
          throw 'Requested text is not existing.';
        });

      redis.set(`${user}:${title}`, `${JSON.stringify(textInfo)}`, 'EX', REDIS_CACHE_DURATION);
    }

    return res
      .status(200)
      .send({ isError: false, message: null, textInfo: textInfo });
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(400).send({ isError: true, message: error.message });

    return res.status(400).send({ isError: true, message: error });
  }
};

export { addNote, deleteNote, getNote };
