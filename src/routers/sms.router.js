/* imports */
import { Router } from 'express';

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import SmsController from '../controllers/sms.controller.js';

/* controller */
const smsController = new SmsController();

/* Router */
const smsRouter = Router();

/* Routes middlewares */
smsRouter.use(httpLogMiddleware);

/* http methods */
smsRouter.route('/')
             .post(smsController.sendSms)

/* export */
export default smsRouter;