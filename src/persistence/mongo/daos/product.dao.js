/* imports */
import MongooseDao from './mongoose.dao.js'
import ProductSchema from '../models/product.schema.js'
import ProductDto from '../../../dtos/product.dto.js'

/* const */
const collection = 'products';
const schema = ProductSchema;

export default class ProductDao extends MongooseDao{
  
  constructor(){
    super(collection, schema);
  }

  async getProductsPaginate({ limit, page, sort, query}){
    try {
      let products = await this.getPaginate({ limit, page, sort, query});
      
      products.docs = products.docs.map(product => new ProductDto(product));
      return products;
    } catch (error) {
      console.log(`[ERROR] ${error.message}`);
      throw error;
    }
  }

  async getProducts(){
    try {
      let products = await this.getObjects();

      products = products.map(product => new ProductDto(product));
      return products;
    } catch (error) {
      console.log(`[ERROR] ${error.message}`);
      throw error;
    }
  }

  async addProduct(product){
    try {
      const parsedProduct = this.parseDto(product);
      let newProduct = await this.saveObject(parsedProduct);
      newProduct = new ProductDto(newProduct);
      return newProduct;

    }catch (error) {
      throw error;
    }
  }

  async getProductById(pid){
    try {
        
      let product = await this.getObjectById(pid);

      if (product === null) {
        throw new Error(`Product with id ${pid} not found`);
      }

      product = new ProductDto(product);
      return product;
    
    }catch (error) {
      throw error;
    }
  }

  async updateProduct(pid, product){
    try {
      
      let parsedProduct = this.parseDto(product);
      let updatedProduct = await this.updateObject(pid, parsedProduct);
      updatedProduct = new ProductDto(updatedProduct)

      return updatedProduct;

    }catch (error) {
      throw error;
    }
  }

  async deleteProduct(pid){
    try {
        
      let deleted = await this.deleteObject(pid);
      if(deleted === null){
        throw new Error(`Product with id ${pid} not found`);
      }
      
      deleted = new ProductDto(deleted);
      return deleted;

    }catch (error) {
      throw error;
    }
  }

  async existProduct(pid){
    try {
      let product = await this.getProductById(pid);
      return true;
    }catch (error) {
      return false;
    }
  }

  parseDto(product){
    let parsedProduct = {
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock,
      code: product.code,
      thumbnails: product.thumbnails,
      category: product.category,
      status: product.status,
      owner: product.owner
    }
    return parsedProduct;
  }
}