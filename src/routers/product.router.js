/* imports */
import { Router } from 'express';

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import Factory from '../factory.js';

/* controller */
const proController = Factory.getProductController();

/* Router */
const productRouter = Router();

/* Routes middlewares */
productRouter.use(httpLogMiddleware);

/* http methods */
productRouter.route('/')
             .get(proController.getProducts)
             .post(proController.addProduct)

productRouter.route('/:pid')
             .get(proController.getProductById)
             .put(proController.updateProduct)
             .delete(proController.deleteProduct)

/* export */
export default productRouter;