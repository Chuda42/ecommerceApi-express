/* imports */
import { Router } from 'express';

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import ChatController from '../controllers/chat.controller.js'

/* controller */
const chatController = new ChatController();

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