/* import */
import Utils from './utils.js';

/* import controllers */
import ProductController from './controllers/product.controller.js';
import ChatController from './controllers/chat.controller.js';
import CartController from './controllers/cart.controller.js';
import ViewController from './controllers/view.controller.js';

/* import services */
import ProductService from './services/product.service.js';
import ChatService from './services/chat.service.js';
import CartService from './services/cart.service.js';

/* import schemas */
import ProductSchema from './dao/models/product.schema.js';
import MessageSchema from './dao/models/message.schema.js';
import CartSchema from './dao/models/cart.schema.js';

/* import persistence */
import ProductDao from './dao/product.dao.js';
import CartDao from './dao/cart.dao.js';
import MessageDao from './dao/message.dao.js';
import MongoContainer from './dao/mongo.container.js';

/**
 * class Factory
 * @description
 * This class is a factory to resolve dependency injection
 */
export default class Factory{

  /* DAO */
  static getProductDao(){
    const persistenceController = new MongoContainer(Utils.DB_COLLECTION_PRODUCTS, ProductSchema);
    const productDao = new ProductDao(persistenceController);
    return productDao;
  }

  static getMessagesDao(){
    const persistenceController = new MongoContainer(Utils.DB_COLLECTION_MESSAGES, MessageSchema);
    const messagesDao = new MessageDao(persistenceController);
    return messagesDao;
  }

  static getCartDao(){
    const productPersistenceController = this.getProductDao();
    const persistenceController = new MongoContainer(Utils.DB_COLLECTION_CARTS, CartSchema);
    const cartDao = new CartDao(persistenceController, productPersistenceController);
    return cartDao;
  }

  /* SERVICES */
  static getProductService(){
    const productDao  = this.getProductDao();
    const productService = new ProductService(productDao);
    return productService;
  }

  static getChatService(){
    const messageesDao = this.getMessagesDao();
    const chatService = new ChatService(messageesDao);
    return chatService;
  }

  static getCartService(){
    const cartDao = this.getCartDao();
    const cartService = new CartService(cartDao);
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

  static getViewController(){
    const cartService = this.getCartService();
    const productService = this.getProductService();
    const viewController = new ViewController(productService, cartService);
    return viewController;
  }
}