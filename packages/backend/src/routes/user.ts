import { NextFunction, Request, Response, Router } from 'express';

import { loginUser, registerUser } from '../controller/user.controller';

const router = Router();

// /user/create
router.post('/create', registerUser);

// /user/login
router.post('/login', loginUser);

export default router;
