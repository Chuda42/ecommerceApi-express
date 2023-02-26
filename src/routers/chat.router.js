/* imports */
import { Router } from 'express';

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import Factory from '../factory.js';

/* controller */
const chatController = Factory.getChatController();

/* Router */
const chatRouter = Router();

/* Routes middlewares */
chatRouter.use(httpLogMiddleware);

/* http methods */
chatRouter.route('/')
          .get(chatController.getMessages)
          .post(chatController.addMessage)

/* export */
export default chatRouter;