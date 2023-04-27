/* imports */
import CartRepository from '../repositories/cart.repository.js';
import UserService from '../services/user.service.js';
import ProductService from '../services/product.service.js';
import TicketService from './ticket.service.js';
import MailService from '../services/mail.service.js';

/* cart repository */
const cartRepository = new CartRepository();

/* user service */
const userService = new UserService();

/* product service */
const productService = new ProductService();

/* ticket service */
const ticketService = new TicketService();

/* mail service */
const mailService = new MailService();

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
        'emailUser': userEmail,
        'amount': 0,
      }

      let productsNotProcessed = []
      
      for (let product of productsCart){
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

      ticket = await ticketService.addTicket(ticket);
      await mailService.sendMail(userEmail, 'Ticket', `
      Your ticket id is: ${ticket.id},
      the code is: ${ticket.code},
      the amount is: ${ticket.amount},
      the purchase_datetime is: ${ticket.purchase_datetime}
      `);

      return productsNotProcessed
    } catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

}