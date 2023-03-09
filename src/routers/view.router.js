/* imports */
import { Router } from 'express';

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import Factory from '../factory.js';

/* controller */
const viewController = Factory.getViewController();

/* router */
const viewRouter = Router();

/* http methods */

viewRouter.route('/', httpLogMiddleware)
          .get(viewController.getHome) 

viewRouter.route('/realtimeproducts', httpLogMiddleware)
          .get(viewController.getRealTimeProducts)

viewRouter.route('/chat', httpLogMiddleware)
          .get(viewController.getChat)

viewRouter.route('/products', httpLogMiddleware)
          .get(viewController.getProducts)
          
viewRouter.route('/products/:id', httpLogMiddleware)
          .get(viewController.getProductDetail)

viewRouter.route('/cart/:id', httpLogMiddleware)
          .get(viewController.getCart)

viewRouter.route('/cartsIds', httpLogMiddleware)
          .get(viewController.getCartsIds)

/* export */
export default viewRouter;