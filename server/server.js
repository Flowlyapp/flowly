import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT;
import tgRouter from '../server/routes/tg.router.js';
import { Telegraf } from 'telegraf';

app.use(json());
app.use(cors());

var bot = "";

let upgradeToPro = async() => {
  let titleText = "Some Title";
  let descriptionText = "Some Description";
  let payload = { userid: 12345678 };
  let providerToken = ""; // Leave empty string if payment in XTR (telegram stars)
  let currency = "XTR";
  let prices = [{ label: "Price Label", amount: 1 }]; // amount - price in XTR
  let obj = {
      title: titleText,
      description: descriptionText,
      payload: payload,
      provider_token: providerToken,
      currency: currency,
      prices: prices
  };

  let result = await bot.telegram.createInvoiceLink(obj);
  console.log('result: ', result);
  return result;
}

export async function getInvoiceLink(req, res) {
  let result = await upgradeToPro();
  if (result) {
      res.json({ success: true, data: result });
  } else {
      res.json({ success: false, message: `Can't get invoice link: ${result}` });
  }
}

let tgbotInit = async() => {
  bot = new Telegraf(process.env.TG_TOKEN);
  bot.launch();
  console.log('bot launched');
}

let start = async () => {
  await tgbotInit();

  app.listen(3001, () => {
    console.log('server has been launched', port);
  });
};

app.use('/tg', tgRouter);

start();