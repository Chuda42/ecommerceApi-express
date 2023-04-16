/* imports */
import FactoryDaos from '../persistence/factory.js'
import Config from '../config/config.js'
import Cart from '../entities/cart.entity.js'


export default class CartRepository {

  constructor(){
    this.dao = FactoryDaos.getCartDao(Config.PERSISTENCE);
  }
  
  async addCart(){
    try {
      const newCart = await this.dao.addCart();
      const CartEntity = new Cart(newCart);
      return CartEntity;
    } catch (error) {
      throw error;
    }
  }

  async getProductsCart(cid){
    try {
      const products = await this.dao.getProductsCart(cid);
      return products;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cid, pid){
    try {
      const cart = await this.dao.addProductToCart(cid, pid);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductFromCart(cid, pid){
    try {
      const cart = await this.dao.deleteProductFromCart(cid, pid);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async udateProductQuantityInCart(cid, pid, quantity){
    try {
      const cart = await this.dao.udateProductQuantityInCart(cid, pid, quantity);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async deleteAllProductsFromCart(cid){
    try {
      const cart = await this.dao.deleteAllProductsFromCart(cid);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 
   * @param {String} cid - cart id
   * @param {[{String, number}]} products - array of objects with product id and quantity to update 
   * @returns 
  */
  async updateProductsToCart(cid, products){
    try {
      const cart = await this.dao.updateProductsToCart(cid, products);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async getCartsIds(){
    try {
      const carts = await this.dao.getCartsIds();
      return carts;
    } catch (error) {
      throw error;
    }
  }
}