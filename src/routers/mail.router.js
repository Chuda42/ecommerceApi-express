/* imports */
import { Router } from 'express';

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import MailController from '../controllers/mail.controller.js';

/* controller */
const mailController = new MailController();

/* Router */
const mailRouter = Router();

/* Routes middlewares */
mailRouter.use(httpLogMiddleware);

/* http methods */
mailRouter.route('/')
             .post(mailController.sendMail)

/* export */
export default mailRouter;