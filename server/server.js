import express, { json } from 'express';
import cors from 'cors';
require('dotenv').config();
const app = express();
const port = process.env.PORT;
import { tgbotInit } from './service/tgbot.service';
import tgRouter from './routes/tg.router';

app.use(json());
app.use(cors());

let start = async () => {
  await tgbotInit();

  app.listen(port, () => {
    console.log('server has been launched');
  });
};

app.use('/tg', tgRouter);

start();