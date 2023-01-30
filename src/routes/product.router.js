/* imports */
const Router = require('express');
const ProductManager = require('../manager/ProductManager');

/* const */
const PRODUCT_PATH = './products.json';

/* Router */
const ProductRouter = Router();

/* http methods */
ProductRouter.get('/', async (req, res) => {
    try{
        const productManager = new ProductManager(PRODUCT_PATH);
        const productList = await productManager.getProducts();
        
        const { limit } = req.query ?? -1;

        if (limit > 0) {
            res.status(200).json(productList.slice(0, limit));
        }else{
            res.status(200).json(productList);
        }
    }catch(error){
        console.log(error.message);
    } 
});

ProductRouter.get('/:id', async (req, res) => {
    return res.json('product by id');
});

/* export */
module.exports = ProductRouter;