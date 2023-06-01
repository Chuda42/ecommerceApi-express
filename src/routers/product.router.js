/* imports */
import { Router } from 'express';

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import {isLogged, isAdmin, isAdminOrPremium} from '../middlewares/auth.middleware.js';
import errorHandler  from '../middlewares/error.middleware.js';
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
             .post(isAdminOrPremium, proController.addProduct)

productRouter.route('/:pid')
             .get(isLogged, proController.getProductById)
             .put( isAdminOrPremium, proController.updateProduct)
             .delete(isAdminOrPremium, proController.deleteProduct)

productRouter.use(errorHandler);

/* export */
export default productRouter;