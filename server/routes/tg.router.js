import Router from 'express';
const router = new Router();
import { getInvoiceLink } from '../server.js';

router.post('/getInvoiceLink', getInvoiceLink);

export default router;