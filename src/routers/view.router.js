/* imports */
import { Router } from 'express';

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import ViewController from '../controllers/view.controller.js';

/* router */
const viewRouter = Router();
const viewController = new ViewController();

/* http methods */

viewRouter.route('/', httpLogMiddleware)
          .get(viewController.getHome) 

viewRouter.route('/realtimeproducts', httpLogMiddleware)
          .get(viewController.getRealTimeProducts)

viewRouter.route('/chat', httpLogMiddleware)
          .get(viewController.getChat)

/* export */
export default viewRouter;