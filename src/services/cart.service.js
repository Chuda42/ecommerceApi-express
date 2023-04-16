/* imports */
import CartRepository from '../repositories/cart.repository.js';

/* cart repository */
const cartRepository = new CartRepository();

export default class CartService{
  constructor(){
  }

  async addCart(){
    try{
      const newCart = await cartRepository.addCart();
      return newCart;
    }catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

  async getProductsCart(cid){
    try {
      const products = await cartRepository.getProductsCart(cid);
      return products
    } catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

  async addProductToCart(cid, pid){
    try {
      const cart = await cartRepository.addProductToCart(cid, pid);
      return cart
    } catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

  async deleteProductFromCart(cid, pid){
    try {
      const cart = await cartRepository.deleteProductFromCart(cid, pid);
      return cart
    } catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

  async udateProductQuantityInCart(cid, pid, quantity){
    try {

      if(quantity < 0){
        throw new Error('Quantity must be greater than 0');
      }

      if(quantity === 0){
        const cart = await this.deleteProductFromCart(cid, pid);
        return cart;
      }

      const cart = await cartRepository.udateProductQuantityInCart(cid, pid, quantity);
      return cart
    } catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

  async deleteAllProductsFromCart(cid){
    try {
      const cart = await cartRepository.deleteAllProductsFromCart(cid);
      return cart
    } catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

  async updateProductsToCart(cid, products){
    try {
      if(products.length === 0){
        throw new Error('Products list is empty');
      }

      const cart = await cartRepository.updateProductsToCart(cid, products);
      return cart
    } catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

  async getCartsIds(){
    try {
      const cartsIds = await cartRepository.getCartsIds();
      return cartsIds
    } catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }
}