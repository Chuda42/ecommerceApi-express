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

/* export */
export default viewRouter;