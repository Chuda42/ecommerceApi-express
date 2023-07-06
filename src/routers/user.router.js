/* imports */
import { Router } from 'express';

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import UserController from '../controllers/user.controller.js';	
import upload from '../middlewares/upload.middleware.js';

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

userRouter.route('/sendResetPassword')
              .get(userController.sendResetPassword)

userRouter.route('/resetPassword')
              .post(userController.resetPassword)

userRouter.route('/premium/:uid')
              .get(userController.upgradeToPremium)

userRouter.route('/:uid/documents')
              .post(upload.fields([
                { name: 'profile', maxCount: 1 },
                { name: 'identity', maxCount: 1 },
                { name: 'addressProof', maxCount: 1 },
                { name: 'accountStatement', maxCount: 1 }
              ]), userController.uploadDocuments)


/* export */
export default userRouter;