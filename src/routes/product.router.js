/* imports */
const Router = require('express');
const productManager = require('../manager/ProductManager');

/* Router */
const ProductRouter = Router();

/* http methods */

ProductRouter.get('/', async (req, res) => {
    return res.json('Hello World');
});


module.exports = ProductRouter;