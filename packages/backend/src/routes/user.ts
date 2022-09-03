import { NextFunction, Request, Response, Router } from 'express';

import { createUser } from '../controller/user.controller';

const router = Router();

// /user/create
router.post('/create', createUser);

export default router