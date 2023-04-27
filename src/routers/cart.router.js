/* imports */
import { Router } from 'express';

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import CartController from '../controllers/cart.controller.js';
import {isLogged, isAdmin, isUser} from '../middlewares/auth.middleware.js';

/* controller */
const cartController = new CartController();

/* Router */
const cartRouter = Router();

/* Router middlewares */
cartRouter.use(httpLogMiddleware);

/* http methods */
cartRouter.route('/')
          .get(cartController.getCartsIds)
          .post(cartController.addCart)

cartRouter.route('/:cid')
          .get(cartController.getProductsCart)
          .put(isUser, cartController.updateProductsToCart)
          .delete(cartController.deleteAllProductsFromCart)

cartRouter.route('/:cid/product/:pid')
          .post(isUser, cartController.addProductToCart)
          .put(isUser, cartController.udateProductQuantityInCart)
          .delete(cartController.deleteProductFromCart)

cartRouter.route('/:cid/purchase')
          .post(isUser, cartController.purchaseCart)

/* export */
export default cartRouter;