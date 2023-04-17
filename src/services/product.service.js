import ProductRepository from '../repositories/product.repository.js'

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
      throw error;
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
