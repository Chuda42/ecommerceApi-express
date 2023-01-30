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

ProductRouter.get('/:pid', async (req, res) => {
    try{
        const productManager = new ProductManager(PRODUCT_PATH);
        const product = await productManager.getProductById(req.params.pid);
        res.status(200).json(product);
    }catch(error){
        res.status(400).json({status: 'error', error: error.message});
    }
});

ProductRouter.post('/', async (req, res) => {
    try{
        const productManager = new ProductManager(PRODUCT_PATH);
        const product = req.body;
        await productManager.addProduct(product);
        res.status(200).json({status: 'ok', message: 'Added product'});
    }catch(error){
        res.status(400).json({status: 'error', error: error.message});
    }
});

/* export */
module.exports = ProductRouter;