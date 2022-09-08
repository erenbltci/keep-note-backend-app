require('dotenv').config();
import express, { Request, Response } from 'express';
import logger from './helpers/logger';
const app = express();

import noteRouter from './routes/note';
import authRouter from './routes/auth';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/note', noteRouter);
app.use('/auth', authRouter);

app.listen(5000, () => {
  logger.info(`Running on 5000 port. http://localhost:5000`);
});
