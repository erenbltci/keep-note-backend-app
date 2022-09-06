import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if(!token) throw 'Auth failed.'

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    next();
  } catch (error) {
    return res.status(401).send({
      message: 'Auth failed.',
    });
  }
};

export default checkAuth;
