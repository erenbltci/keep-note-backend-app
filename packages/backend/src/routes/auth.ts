import { NextFunction, Request, Response, Router } from 'express';

import { loginUser, registerUser } from '../controller/user.controller';

const router = Router();

// /user/create
router.post('/register', registerUser);

// /user/login
router.post('/login', loginUser);

export default router;
