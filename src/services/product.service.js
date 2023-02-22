export default class ProductService{
  constructor(persistenceController){
    this.persistenceController = persistenceController;
  }

  async getProducts(){
    try {

      let products = this.persistenceController.getObjects();
      return products;

    } catch (error) {
      console.log(`[ERROR] ${error.message}`);
      throw error;
    }
  }
  
  async addProduct(product){
    try {

      let newProduct = await this.persistenceController.saveObject(product);
      return newProduct;

    }catch (error) {
      throw error;
    }
  }

  async getProductById(pid){
    try {
        
      let product = await this.persistenceController.getObjectById(pid);

      if (product === null) {
        throw new Error(`Product with id ${pid} not found`);
      }

      return product;
    
    }catch (error) {
      throw error;
    }
  }

  async updateProduct(pid, product){
    try {
        
      let updatedProduct = await this.persistenceController.updateObject(pid, product);

      return updatedProduct;

    }catch (error) {
      throw error;
    }
  }

  async deleteProduct(pid){
    try {
        
      let deleted = await this.persistenceController.deleteObject(pid);
      if(deleted === null){
        throw new Error(`Product with id ${pid} not found`);
      }
      return deleted;

    }catch (error) {
      throw error;
    }
  }
}
