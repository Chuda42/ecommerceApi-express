/* imports */
import CartService from '../services/cart.service.js';

/* cart service */
const cartService = new CartService();

/**
 * class CartController
 */
export default class CartController{
  constructor(){
    //bind all methods
    Object.getOwnPropertyNames(CartController.prototype).forEach((key) => {
      if (key !== 'constructor' && key !== 'cartService') {
        this[key] = this[key].bind(this);
      }
    });
  }

  async addCart(req, res) {
    try {
      await cartService.addCart();
      
      res.status(200).json({
        status: 'success',
        message: 'Cart created'
      });

    } catch (error) {
      console.log(error.message);
    }
  }

  async getProductsCart(req, res) {
    try {
      const { cid } = req.params;

      const products = await cartService.getProductsCart(cid);
      res.status(200).json(products);
    } catch (error) {
      console.log(`[ERROR] ${error.message}`);

      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async addProductToCart(req, res) {
    try {
      const { cid, pid } = req.params;

      await cartService.addProductToCart(cid, pid);

      res.status(200).json({
        status: 'success',
        message: `Product: ${pid} added to cart: ${cid}`
      });

    } catch (error) {
      res.status(400).json({
        status: 'error', message: error.message
      });
    }
  }

  async deleteProductFromCart(req, res) {
    try {
      const { cid, pid } = req.params;

      await cartService.deleteProductFromCart(cid, pid);

      res.status(200).json({
        status: 'success',
        message: `Product: ${pid} deleted from cart: ${cid}`
      });

    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async udateProductQuantityInCart(req, res) {
    try {
      const { cid, pid } = req.params;

      let { quantity } = req.body;
      quantity = parseInt(quantity);

      await cartService.udateProductQuantityInCart(cid, pid, quantity);

      res.status(200).json({
        status: 'success',
        message: `Product: ${pid} quantity updated in cart: ${cid}`
      });

    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async deleteAllProductsFromCart(req, res) {
    try {
      const { cid } = req.params;

      await cartService.deleteAllProductsFromCart(cid);

      res.status(200).json({
        status: 'success',
        message: `All products deleted from cart: ${cid}`
      });

    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async updateProductsToCart(req, res) {
    try {
      const { cid } = req.params;

      const products  = req.body;

      await cartService.updateProductsToCart(cid, products);

      res.status(200).json({
        status: 'success',
        message: `Many products added to cart: ${cid}`
      });

    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async getCartsIds(req, res) {
    try {
      const cartsIds = await cartService.getCartsIds();
      res.status(200).json({
        status: 'success',
        payload: cartsIds
      });
    } catch (error) {
      console.log(`[ERROR] ${error.message}`);
    }
  }

}