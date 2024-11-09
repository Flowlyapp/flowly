import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
dotenv.config();

class TgbotService {

    // https://core.telegram.org/bots/api#createinvoicelink
    bot = "";

    async tgbotInit() {
        this.bot = new Telegraf(process.env.TG_TOKEN);
        this.bot.launch();
        console.log('bot launched');
    }

    async upgradeToPro() {
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

        let result = await this.bot.telegram.createInvoiceLink(obj);
        console.log('result: ', result);
        return result;
    }
}

export default new TgbotService();