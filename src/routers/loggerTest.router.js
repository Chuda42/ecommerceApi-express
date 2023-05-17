/* imports */
import { Router } from 'express';

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import LoggerTestController from '../controllers/loggerTest.controller.js';

/* controller */
const loggerTestController = new LoggerTestController();

/* Router */
const loggerTestRouter = Router();

/* Routes middlewares */
loggerTestRouter.use(httpLogMiddleware);

/* http methods */
loggerTestRouter.route('/')
             .post(loggerTestController.testLogger)

/* export */
export default loggerTestRouter;