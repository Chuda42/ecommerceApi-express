export default class CartService{
  constructor(persistenceController){
    this.persistenceController = persistenceController;
  }

  async addCart(){
    try{
      const newCart = await this.persistenceController.addCart();
      return newCart;
    }catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

  async getProductsCart(cid){
    try {
      const products = await this.persistenceController.getProductsCart(cid);
      return products
    } catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

  async addProductToCart(cid, pid){
    try {
      const cart = await this.persistenceController.addProductToCart(cid, pid);
      return cart
    } catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

  async deleteProductFromCart(cid, pid){
    try {
      const cart = await this.persistenceController.deleteProductFromCart(cid, pid);
      return cart
    } catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

}