import { NextFunction, Request, response, Response } from 'express';

import bcrypt from 'bcrypt';
import prisma from '../helpers/prisma';

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) throw 'Username or password is not entered.';

    const hashedPasword = await bcrypt.hash(password, 10);

    await prisma.user
      .create({
        data: {
          username: username,
          password: hashedPasword,
        },
      })
      .catch(() => {
        throw `Username "${username}" is must be uniqe.`;
      });

    res.status(200).send({ isError: false, message: 'User created.' });
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(400).send({ isError: true, message: error.message });

    res.status(400).send({ isError: true, message: error });
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) throw 'Username or password is not entered.';

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        username: username,
      },
    });

    const hashedPasword = await bcrypt.compare(password, user.password);
    if (!hashedPasword) throw 'Password is not correct.';

    // TODO: JWT TRANSACTION

    res.status(200).send({ isError: false, message: 'Auth successful.' });
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(400).send({ isError: true, message: error.message });

    res.status(400).send({ isError: true, message: error });
  }
};

export { registerUser, loginUser };
