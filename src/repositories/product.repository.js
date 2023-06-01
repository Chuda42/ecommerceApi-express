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
      products = products.map(product => new Product(product));
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
      newProduct = new Product(newProduct);
      return newProduct;
    } catch (error) {
      console.log(`[ERROR REPOSITORY] ${error.message}`);
      throw error;
    }
  }

  async getProductById(pid) {
    try {
      let product = await this.dao.getProductById(pid);
      product = new Product(product);
      return product;
    } catch (error) {
      console.log(`[ERROR REPOSITORY] ${error.message}`);
      throw error;
    }
  }

  async updateProduct(pid, product, user) {
    try {
      const updatedProductDto = new ProductDto(product);

      const prod = await this.getProductById(pid);

      if (prod.owner !== user && user !== Config.ADMIN_EMAIL) {
        throw new Error('You are not the owner of this product');
      }

      let updatedProduct = await this.dao.updateProduct(pid, updatedProductDto);
      updatedProduct = new Product(updatedProduct);
      return updatedProduct;
    } catch (error) {
      console.log(`[ERROR REPOSITORY] ${error.message}`);
      throw error;
    }
  }

  async deleteProduct(pid, user) {
    try {

      const product = await this.getProductById(pid);

      if (product.owner !== user && user !== Config.ADMIN_EMAIL) {
        throw new Error('You are not the owner of this product');
      }

      let deletedProduct = await this.dao.deleteProduct(pid);
      deletedProduct = new Product(deletedProduct);
      return deletedProduct;
    } catch (error) {
      console.log(`[ERROR REPOSITORY] ${error.message}`);
      throw error;
    }
  }

}