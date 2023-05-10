import ProductRepository from '../repositories/product.repository.js'
import ProductErrors from './errors/products.errors.js'
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
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

  async getProducts(){
    try {

      let products = productRepository.getProducts();
      return products;

    } catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }
  
  async addProduct(product){
    try {

      let newProduct = await productRepository.addProduct(product);
      return newProduct;

    }catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
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
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

  async updateProduct(pid, product){
    try {
        
      let updatedProduct = await productRepository.updateProduct(pid, product);
      return updatedProduct;

    }catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

  async deleteProduct(pid){
    try {
        
      let deleted = await productRepository.deleteProduct(pid);
      return deleted;

    }catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }
}
