/* imports */
import { Router } from 'express';

import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import ProductController from '../controllers/product.controller.js';
import ProductService from '../services/product.service.js';
import MongoContainer from '../dao/mongo.container.js';
import ProductSchema from '../dao/models/product.schema.js'
import Utils from '../utils.js';

/* const */
const peristenceController = new MongoContainer(Utils.DB_COLLECTION_PRODUCTS, ProductSchema);
const productService = new ProductService(peristenceController);
const proController = new ProductController(productService);

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