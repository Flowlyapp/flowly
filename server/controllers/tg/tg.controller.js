import { upgradeToPro } from '../../service/tgbot.service';

class TgController {
    async getInvoiceLink(req, res) {
        let result = await upgradeToPro();
        if (result) {
            res.json({ success: true, data: result });
        } else {
            res.json({ success: false, message: `Can't get invoice link: ${result}` });
        }
    }
}

export default new TgController();