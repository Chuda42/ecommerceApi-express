/* imports */
import { Router } from 'express';

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import { isLogged, isNotLogged, isUser } from '../middlewares/auth.middleware.js';
import ViewController from '../controllers/view.controller.js'

/* controller */
const viewController = new ViewController();

/* router */
const viewRouter = Router();

/* http methods */

viewRouter.route('/')
          .get(httpLogMiddleware, isLogged, viewController.getHome) 

viewRouter.route('/realtimeproducts')
          .get(httpLogMiddleware, isLogged, viewController.getRealTimeProducts)

viewRouter.route('/chat')
          .get(httpLogMiddleware, isUser, viewController.getChat)

viewRouter.route('/products')
          .get(httpLogMiddleware, isLogged, viewController.getProducts)
          
viewRouter.route('/products/:id')
          .get(httpLogMiddleware, isLogged, viewController.getProductDetail)

viewRouter.route('/cart/:id')
          .get(httpLogMiddleware, isLogged, viewController.getCart)

viewRouter.route('/login')
          .get(httpLogMiddleware, isNotLogged, viewController.getLogin)

viewRouter.route('/register')
          .get(httpLogMiddleware, isNotLogged, viewController.getRegister)

viewRouter.route('/cartsIds')
          .get(httpLogMiddleware, isLogged, viewController.getCartsIds)

viewRouter.route('/profile')
          .get(httpLogMiddleware, isLogged, viewController.getUserProfile)

viewRouter.route('/resetPasswordForm')
          .get(httpLogMiddleware, isNotLogged, viewController.getResetPasswordForm)

viewRouter.route('/forgotPassword')
          .get(httpLogMiddleware, isNotLogged, viewController.getForgotPassword)

viewRouter.route('/uploadDocuments')
          .get(httpLogMiddleware, isLogged, viewController.getUploadDocuments)

/* export */
export default viewRouter;