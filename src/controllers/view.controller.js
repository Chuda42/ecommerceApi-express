import mongoose from 'mongoose';

import ProductService from '../services/product.service.js';
import MongoContainer from '../dao/mongo.container.js';
import ProductSchema from '../dao/models/product.schema.js';
import Utils from '../utils.js';

const perisitenceManager = new MongoContainer(Utils.DB_COLLECTION_PRODUCTS, ProductSchema);
const productService = new ProductService(perisitenceManager)

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

}