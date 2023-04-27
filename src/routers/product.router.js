/* imports */
import { Router } from 'express';

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import {isLogged, isAdmin} from '../middlewares/auth.middleware.js';
import ProductController from '../controllers/product.controller.js';

/* controller */
const proController = new ProductController();

/* Router */
const productRouter = Router();

/* Routes middlewares */
productRouter.use(httpLogMiddleware);

/* http methods */
productRouter.route('/')
             .get(isLogged, proController.getProducts)
             .post(isAdmin, proController.addProduct)

productRouter.route('/:pid')
             .get(isLogged, proController.getProductById)
             .put( isAdmin, proController.updateProduct)
             .delete(isAdmin, proController.deleteProduct)

/* export */
export default productRouter;