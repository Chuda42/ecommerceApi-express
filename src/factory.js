/* import */
import Utils from './utils.js';

/* import controllers */
import ProductController from './controllers/product.controller.js';
import ChatController from './controllers/chat.controller.js';
import CartController from './controllers/cart.controller.js';

/* import services */
import ProductService from './services/product.service.js';
import ChatService from './services/chat.service.js';
import CartService from './services/cart.service.js';

/* import schemas */
import ProductSchema from './dao/models/product.schema.js';
import MessageSchema from './dao/models/message.schema.js';
import CartSchema from './dao/models/cart.schema.js';

/* import persistence */
import MongoContainer from './dao/mongo.container.js';

/**
 * class Factory
 * @description
 * This class is a factory to resolve dependency injection
 */
export default class Factory{

  /* SERVICES */
  static getProductService(){
    const peristenceController = new MongoContainer(Utils.DB_COLLECTION_PRODUCTS, ProductSchema);
    const productService = new ProductService(peristenceController);
    return productService;
  }

  static getChatService(){
    const peristenceController = new MongoContainer(Utils.DB_COLLECTION_MESSAGES, MessageSchema);
    const chatService = new ChatService(peristenceController);
    return chatService;
  }

  static getCartService(){
    const persistenceController = new MongoContainer(Utils.DB_COLLECTION_CARTS, CartSchema);
    const cartService = new CartService(persistenceController);
    return cartService;
  }

  /* CONTROLLERS */
  static getProductController(){
    const productService = this.getProductService();
    const proController = new ProductController(productService);
    return proController;
  }

  static getChatController(){
    const chatService = this.getChatService();
    const chatController = new ChatController(chatService);
    return chatController;
  }

  static getCartController(){
    const cartService = this.getCartService();
    const cartController = new CartController(cartService);
    return cartController;
  }
}