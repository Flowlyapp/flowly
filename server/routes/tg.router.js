import Router from 'express';
const router = new Router();
import { getInvoiceLink } from '../controllers/tg/tg.controller';

router.post('/getInvoiceLink', getInvoiceLink);

export default router;