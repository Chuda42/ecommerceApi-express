import { logger } from '../logger.js';
import ProductRepository from '../repositories/product.repository.js'
import ProductErrors from './errors/products.errors.js'
import MailService from './mail.service.js';
import {generateProductErrorInfo} from './errors/error.info.js'
import {EErrors} from './errors/error.enums.js'

/* Product Repository */
const productRepository = new ProductRepository();

export default class ProductService{

  async getProductsPaginate(options){
    try {

      let products = productRepository.getProductsPaginate(options);
      return products;

    } catch (error) {
      logger.error(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

  async getProducts(){
    try {

      let products = productRepository.getProducts();
      return products;

    } catch (error) {
      logger.error(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }
  
  async addProduct(product){
    try {

      let newProduct = await productRepository.addProduct(product);
      return newProduct;

    }catch (error) {
      logger.error(`[ERROR SERVICE] ${error.message}`);
      ProductErrors.createError({ 
        name: 'Product creation error',
        cause: generateProductErrorInfo(product),
        message: error.message, 
        code: EErrors.REQUIRED_PARAMS
      })
    }
  }

  async getProductById(pid){
    try {
        
      let product = await productRepository.getProductById(pid);
      return product;
    
    }catch (error) {
      logger.error(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

  async updateProduct(pid, product, user){
    try {
        
      let updatedProduct = await productRepository.updateProduct(pid, product, user);
      return updatedProduct;

    }catch (error) {
      logger.error(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

  async deleteProduct(pid, user){
    try {
        
      let deleted = await productRepository.deleteProduct(pid, user);
      if (deleted.owner) {
        const mailService = new MailService();
        await mailService.sendMail(deleted.owner, 'Product deleted', `The product ${deleted.title} has been deleted`);
      }
      return deleted;

    }catch (error) {
      logger.error(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }
}
