import { NextFunction, Request, Response, Router } from 'express';
import { addNote, deleteNote, getNote } from '../controller/text.controller';
import checkAuth from '../middleware/checkAuth';


const router = Router();

// /note/add
router.post('/add', checkAuth, addNote);

// /note/delete
router.delete('/delete', checkAuth, deleteNote);

// /note/:user/:title
router.get('/:user/:title', checkAuth, getNote);

export default router