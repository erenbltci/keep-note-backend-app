import { NextFunction, Request, Response, Router } from 'express';
import checkAuth from '../middleware/checkAuth';


const router = Router();


router.post('/add', checkAuth, (req: Request, res: Response, next: NextFunction) => {
res.send('ok')
})


export default router