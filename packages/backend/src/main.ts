require('dotenv').config();
import express from 'express';
import logger from './helpers/logger';
const app = express();

import noteRouter from './routes/note';
import userRouter from './routes/user';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/note', noteRouter);
app.use('/user', userRouter);

app.listen(5000, () => {
  logger.info(`Running on 5000 port. http://localhost:5000`);
});
