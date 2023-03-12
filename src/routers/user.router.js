/* imports */
import { Router } from 'express';

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import Factory from '../factory.js';

/* controller */
const userController = Factory.getUserController();

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