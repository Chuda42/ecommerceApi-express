/**
 * class CartController
 */
export default class CartController{
  //dependency injection
  constructor(cartService){
    this.cartService = cartService;
    
    //bind all methods
    Object.getOwnPropertyNames(CartController.prototype).forEach((key) => {
      if (key !== 'constructor' && key !== 'cartService') {
        this[key] = this[key].bind(this);
      }
    });
  }

  async addCart(req, res) {
    try {
      await this.cartService.addCart();
      
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

      const products = await this.cartService.getProductsCart(cid);
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

      await this.cartService.addProductToCart(cid, pid);

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

      await this.cartService.deleteProductFromCart(cid, pid);

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

      await this.cartService.udateProductQuantityInCart(cid, pid, quantity);

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

      await this.cartService.deleteAllProductsFromCart(cid);

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

      await this.cartService.updateProductsToCart(cid, products);

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
}