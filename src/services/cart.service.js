/* imports */
import CartRepository from '../repositories/cart.repository.js';
import UserService from '../services/user.service.js';
import ProductService from '../services/product.service.js';
import TicketService from './ticket.service.js';

/* cart repository */
const cartRepository = new CartRepository();

/* user service */
const userService = new UserService();

/* product service */
const productService = new ProductService();

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

  async addProductToCart(userEmail, cid, pid){
    try {
      const user = await userService.getUserByEmail(userEmail);
      if(user.cart !== cid){
        throw new Error('User does not have this cart');
      }
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

  async purchaseCart(userEmail, cid){
    try {
      const user = await userService.getUserByEmail(userEmail);

      
      if(user.cart !== cid){
        throw new Error('User does not have this cart');
      }
      const productsCart = await this.getProductsCart(cid);

      let ticket = {
        'user': userEmail,
        'amount': 0,
      }

      let productsNotProcessed = []
      
      for (product in productsCart){
        const productInBase = await productService.getProductById(product.product.id);
        const productStock = productInBase.stock
        if(productStock >= product.quantity){
          await productService.updateProduct(product.product.id, {stock: productStock - product.quantity})
          await this.deleteProductFromCart(cid, product.product.id)
          ticket.amount += product.product.price * product.quantity
        }else{
          productsNotProcessed.push(product.product.id)
        }
      }

      ticket = await TicketService.addTicket(ticket);
      return productsNotProcessed
    } catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

}