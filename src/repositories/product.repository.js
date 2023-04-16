import FactoryDaos from '../persistence/factory.js';
import Config from '../config/config.js';
import ProductDto from '../dtos/product.dto.js';
import Product from '../entities/product.entity.js';

export default class ProductRepository {

  constructor() {
    this.dao = FactoryDaos.getProductDao(Config.PERSISTENCE);
  }

  async getProductsPaginate(options) {
    try {
      let products = await this.dao.getProductsPaginate(options);
      return products;
    } catch (error) {
      console.log(`[ERROR REPOSITORY] ${error.message}`);
      throw error;
    }
  }

  async getProducts() {
    try {
      let products = await this.dao.getProducts();
      return products;
    } catch (error) {
      console.log(`[ERROR REPOSITORY] ${error.message}`);
      throw error;
    }
  }

  async addProduct(product) {
    try {
      const newProductDto = new ProductDto(product);
      let newProduct = await this.dao.addProduct(newProductDto);
      return newProduct;
    } catch (error) {
      console.log(`[ERROR REPOSITORY] ${error.message}`);
      throw error;
    }
  }

  async getProductById(pid) {
    try {
      let product = await this.dao.getProductById(pid);
      return product;
    } catch (error) {
      console.log(`[ERROR REPOSITORY] ${error.message}`);
      throw error;
    }
  }

  async updateProduct(pid, product) {
    try {
      const updatedProductDto = new ProductDto(product);
      let updatedProduct = await this.dao.updateProduct(pid, updatedProductDto);
      return updatedProduct;
    } catch (error) {
      console.log(`[ERROR REPOSITORY] ${error.message}`);
      throw error;
    }
  }

  async deleteProduct(pid) {
    try {
      let deletedProduct = await this.dao.deleteProduct(pid);
      return deletedProduct;
    } catch (error) {
      console.log(`[ERROR REPOSITORY] ${error.message}`);
      throw error;
    }
  }

}