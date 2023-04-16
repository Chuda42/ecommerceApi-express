/* imports */
import { Router } from 'express';

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import CartController from '../controllers/cart.controller.js';

/* controller */
const cartController = new CartController();

/* Router */
const cartRouter = Router();

/* Router middlewares */
cartRouter.use(httpLogMiddleware);

/* http methods */
cartRouter.route('/')
          .post(cartController.addCart)

cartRouter.route('/:cid')
          .get(cartController.getProductsCart)
          .put(cartController.updateProductsToCart)
          .delete(cartController.deleteAllProductsFromCart)

cartRouter.route('/:cid/product/:pid')
          .post(cartController.addProductToCart)
          .put(cartController.udateProductQuantityInCart)
          .delete(cartController.deleteProductFromCart)

/* export */
export default cartRouter;