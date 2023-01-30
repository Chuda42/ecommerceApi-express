/* imports */
const Router = require('express');
const CartManager = require('../manager/CartManager');
const ProductManager = require('../manager/ProductManager');

/* const */
const CART_PATH = './cart.json';
const PRODUCT_PATH = './products.json';

/* Router */
const CartRouter = Router();

/* http methods */
CartRouter.get('/:cid', async (req, res) => {
    try {
        const {cid} = req.params;
        const cartManager = new CartManager(CART_PATH);
        const products = await cartManager.getProductsCart(parseInt(cid));
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({status: 'error', message: error.message});
    }
});

CartRouter.post('/', async (req, res) => {
    try {
        const cartManager = new CartManager(CART_PATH);
        await cartManager.addCart();
        res.status(200).json({status: 'success', message: 'Cart created'});
    } catch (error) {
        console.log(error.message);
    }
})

CartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const {cid, pid} = req.params;
        const productManager = new ProductManager(PRODUCT_PATH);
        await productManager.getProductById(pid);
        const cartManager = new CartManager(CART_PATH);
        await cartManager.addProductToCart(parseInt(cid), parseInt(pid));
        res.status(200).json({status: 'success', message: 'Product added to cart'});
    } catch (error) {
        res.status(400).json({status: 'error', message: error.message});
    }
});

/* export */
module.exports = CartRouter;