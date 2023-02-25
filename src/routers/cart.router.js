/* imports */
import { Router } from 'express';

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
/* import MongoContainer from '../dao/mongo.container.js';
import CartService from '../services/cart.service.js';
import CartController from '../controllers/cart.controller.js';
import CartSchema from '../dao/models/cart.schema.js'; */
import Factory from '../factory.js';

/* const */
/* const persistenceController = new MongoContainer(Utils.DB_COLLECTION_CARTS, CartSchema);
const cartService = new CartService(persistenceController);
const cartController = new CartController(cartService); */
const cartController = Factory.getCartController();

/* Router */
const cartRouter = Router();

/* Router middlewares */
cartRouter.use(httpLogMiddleware);

/* http methods */

 cartRouter.route('/')
          .post(cartController.addCart)

cartRouter.route('/:cid')
          .get(cartController.getProductsCart)

cartRouter.route('/:cid/product/:pid')
          .post(cartController.addProductToCart)

/* export */
export default cartRouter;