import { NextFunction, Request, response, Response } from 'express';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../helpers/prisma';

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password)
      throw 'Required values is not entered.';

    const hashedPasword = await bcrypt.hash(password, 10);

    const user = await prisma.user
      .create({
        data: {
          email: email,
          username: username,
          password: hashedPasword,
        },
      })
      .catch(() => {
        throw `Username or email is already exist.`;
      });

    const token = jwt.sign(req.body, process.env.JWT_SECRET_KEY as string, {
      expiresIn: '1d',
    });

    res.status(200).send({
      isError: false,
      message: 'Registration is success.',
      user: {
        token: token,
        ...user,
      },
    });
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

    const token = jwt.sign(req.body, process.env.JWT_SECRET_KEY as string, {
      expiresIn: '1d',
    });

    res.status(200).send({
      isError: false,
      message: 'Login is success.',
      user: {
        token: token,
        ...user,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(400).send({ isError: true, message: error.message });

    res.status(400).send({ isError: true, message: error });
  }
};

export { registerUser, loginUser };
