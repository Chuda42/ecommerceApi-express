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
      res.status(200).json({ status: 'success', message: 'Cart created' });
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
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async addProductToCart(req, res) {
    try {
      const { cid, pid } = req.params;

      await this.cartService.addProductToCart(cid, pid);
      res.status(200).json({ status: 'success', message: 'Product added to cart' });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

}