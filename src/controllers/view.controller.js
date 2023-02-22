import mongoose from 'mongoose';

import ProductService from '../services/product.service.js';
import MongoContainer from '../dao/mongo.container.js';
import ProductSchema from '../dao/models/product.schema.js';
import ChatService from '../services/chat.service.js';
import MessageSchema from '../dao/models/message.schema.js';
import Utils from '../utils.js';

const perisitenceManager = new MongoContainer(Utils.DB_COLLECTION_PRODUCTS, ProductSchema);
const productService = new ProductService(perisitenceManager)
const chatService = new ChatService(new MongoContainer(Utils.DB_COLLECTION_MESSAGES, MessageSchema));

/**
 * class ViewController
 */
export default class ViewController{
  
  async getHome(req, res){
    res.render('home', {
      title: 'Home',
      products: await productService.getProducts()
    });
  }

  async getRealTimeProducts(req, res) {
    res.render('realTimeProducts', {
      title: 'Realtime Products'
    });
  }

  async getChat(req, res) {
    res.render('chat', {
      title: 'Chat',
      messages: await chatService.getMessages()
    });
  }

}