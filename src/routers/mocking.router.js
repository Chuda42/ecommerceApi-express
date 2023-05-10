/* imports */
import { Router } from 'express';

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import MockingController from '../controllers/mocking.controller.js';

/* controller */
const mockingController = new MockingController();

/* Router */
const mockingRouter = Router();

/* Routes middlewares */
mockingRouter.use(httpLogMiddleware);

/* http methods */
mockingRouter.route('/')
             .get(mockingController.getProducts)

/* export */
export default mockingRouter;