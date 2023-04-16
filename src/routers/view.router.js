/* imports */
import { Router } from 'express';

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import {auth, isLogged} from '../middlewares/auth.middleware.js';
import ViewController from '../controllers/view.controller.js'

/* controller */
const viewController = new ViewController();

/* router */
const viewRouter = Router();

/* http methods */

viewRouter.route('/')
          .get(httpLogMiddleware, auth, viewController.getHome) 

viewRouter.route('/realtimeproducts')
          .get(httpLogMiddleware, auth, viewController.getRealTimeProducts)

viewRouter.route('/chat')
          .get(httpLogMiddleware, auth, viewController.getChat)

viewRouter.route('/products')
          .get(httpLogMiddleware, auth, viewController.getProducts)
          
viewRouter.route('/products/:id')
          .get(httpLogMiddleware, auth, viewController.getProductDetail)

viewRouter.route('/cart/:id')
          .get(httpLogMiddleware, auth, viewController.getCart)

viewRouter.route('/login')
          .get(httpLogMiddleware, isLogged, viewController.getLogin)

viewRouter.route('/register')
          .get(httpLogMiddleware, isLogged, viewController.getRegister)

viewRouter.route('/cartsIds')
          .get(httpLogMiddleware, auth, viewController.getCartsIds)

viewRouter.route('/profile')
          .get(httpLogMiddleware, auth, viewController.getUserProfile)

/* export */
export default viewRouter;