/* imports */
import { Router } from 'express';

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import ChatController from '../controllers/chat.controller.js';
import ChatService from '../services/chat.service.js';
import MongoContainer from '../dao/mongo.container.js';
import MessageSchema from '../dao/models/message.schema.js'
import Utils from '../utils.js';

/* const */
const peristenceController = new MongoContainer(Utils.DB_COLLECTION_MESSAGES, MessageSchema);
const chatService = new ChatService(peristenceController);
const chatController = new ChatController(chatService);

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