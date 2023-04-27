/* imports */
import { Router } from 'express';

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import UserController from '../controllers/user.controller.js';	

/* controller */
const userController = new UserController();

/* Router */
const userRouter = Router();

/* Routes middlewares */
userRouter.use(httpLogMiddleware);

/* http methods */
userRouter.route('/')
             .get(userController.getUsers)
             .post(userController.addUser)

userRouter.route('/:email')
             .get(userController.getUserByEmail)

/* export */
export default userRouter;