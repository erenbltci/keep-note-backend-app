import { NextFunction, Request, response, Response } from 'express';

import bcrypt from 'bcrypt';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    if(!username || !password) throw 'Username or password is not entered.'

    const resp = await bcrypt.hash(password, 10);

    res.status(200).send({ isError: false, message: 'User created.' })
  } catch (error: any) {
    res.status(400).send({ isError: true, message: error.message ? error.message : error })
  }
};

export { createUser };
