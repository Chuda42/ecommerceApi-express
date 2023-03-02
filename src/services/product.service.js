export default class ProductService{
  constructor(persistenceController){
    this.persistenceController = persistenceController;
  }

  async getProductsPaginate(options){
    try {

      let products = this.persistenceController.getProductsPaginate(options);
      return products;

    } catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

  async getProducts(){
    try {

      let products = this.persistenceController.getProducts();
      return products;

    } catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }
  
  async addProduct(product){
    try {

      let newProduct = await this.persistenceController.addProduct(product);
      return newProduct;

    }catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

  async getProductById(pid){
    try {
        
      let product = await this.persistenceController.getProductById(pid);
      return product;
    
    }catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

  async updateProduct(pid, product){
    try {
        
      let updatedProduct = await this.persistenceController.updateProduct(pid, product);
      return updatedProduct;

    }catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }

  async deleteProduct(pid){
    try {
        
      let deleted = await this.persistenceController.deleteProduct(pid);
      return deleted;

    }catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }
}
