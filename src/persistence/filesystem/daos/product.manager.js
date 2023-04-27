/* imports */
import fs from 'fs';

import ProductModel from '../models/product.model.js'
import ProductDto from '../../../dtos/product.dto.js'

export default class ProductManager {
  #path = './data/products.json'

  async #dontExist() {
    if (!fs.existsSync(this.#path)) {
      await fs.promises.writeFile(this.#path, JSON.stringify({
        products: []
      }));
    }
  }

  async #save(products) {
    try {
      await fs.promises.writeFile(this.#path, JSON.stringify({
        products: products
      }));
    } catch (error) {
      console.log(error.message);
    }
  }

 
  async #getObject() {
    try {
      const content = await fs.promises.readFile(this.#path);
      return JSON.parse(content);
    } catch (error) {
      console.log(error.message);
    }
  }


  async #isNotVoid(product) {
    let { title, description, price, code, stock, category } = product;
    /* void validations */
    let notVoidPrice = typeof price === 'number' && price >= 0;
    let notVoidStock = typeof stock === 'number' && stock >= 0;
    let notVoid = !!title && !!description && notVoidPrice && !!code && notVoidStock && !!category;
    if (!notVoid) throw new Error('Any field can be void, except thumbnails and status');
  }

 
  async #isValidCode(code) {
    try {
      let { products } = await this.#getObject();

      const sameCode = products.find(product => product.code === code);
      if (!!sameCode) {
        throw new Error(`Product with value code: ${code} already exists `);
      }
      return;
    } catch (error) {
      throw error;
    }
  }

  async #isValidTypes(product) {
    let { title, description, price, code, stock, category, thumbnails, status } = product;
    /* types validations */
    let isValidTypes = (typeof title === 'undefined' || typeof title === 'string')
      && (typeof description === 'undefined' || typeof description === 'string')
      && (typeof price === 'undefined' || typeof price === 'number')
      && (typeof code === 'undefined' || typeof code === 'string')
      && (typeof stock === 'undefined' || typeof stock === 'number')
      && (typeof category === 'undefined' || typeof category === 'string')
      && (typeof thumbnails === 'undefined' || Array.isArray(product.thumbnails))
      && (typeof status === 'undefined' || typeof status === 'boolean');

    if (!isValidTypes) throw new Error('Invalid types');
  }

  async addProduct(product) {
    try {
      await this.#dontExist();

      let { products } = await this.#getObject();

      await this.#isValidCode(product.code);
      await this.#isNotVoid(product);
      await this.#isValidTypes(product);

      product.thumbnails = product.thumbnails ?? [];
      product.status = product.status ?? true;
      const newProduct = new ProductModel(product)
      products.push(newProduct);

      await this.#save(products);
      console.log(`Product added successfully with id ${newProduct._id}`);
      return new ProductDto(newProduct);
    } catch (error) {
      throw error;
    }
  }

  async getProducts() {
    try {
      await this.#dontExist();
      const { products } = await this.#getObject();

      let productsDtos = products.map(product => new ProductDto(product));

      if(!!productsDtos){
        productsDtos = []
      }

      return productsDtos;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getProductById(id) {
    try {
      await this.#dontExist();

      let { products } =  await this.#getObject();

      let prod = products.find(product => product._id === id);
      if (!!prod) {
        prod = new ProductDto(prod);
        return prod;
      };
      console.error('Not found');
      throw new Error(`Product ${id} does not exist`);
    } catch (error) {
      console.log(error.message);
      throw error;
    }

  }

  async updateProduct(id, updateProduct) {
    try {
      await this.#dontExist();
      if (!await this.getProductById(id))
        throw new Error(`Product ${id} does not exist`);

      let { products } = await this.#getObject()

      await this.#isValidCode(updateProduct.code);
      await this.#isNotVoid(updateProduct);
      await this.#isValidTypes(updateProduct);

      products.map(product => {
        if (product._id === id) {
          product.title = (updateProduct.title) ?? product.title;
          product.description = (updateProduct.description) ?? product.description;
          product.price = (updateProduct.price) ?? product.price;
          product.thumbnails = (updateProduct.thumbnails) ?? product.thumbnails;
          product.code = (updateProduct.code) ?? product.code;
          product.stock = (updateProduct.stock) ?? product.stock;
          product.category = (updateProduct.category) ?? product.category;
          product.status = (updateProduct.status) ?? product.status;
          return;
        }
      })

      console.log(products);
      await this.#save(products);
      console.log(`Product with id ${id}, updated successfully`);

      let product = await this.getProductById(id);
      product = new ProductDto(product);
      return product;

    } catch (error) {
      console.log(`[ERROR DAO] ${error.message}`);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      await this.#dontExist();
      let { products } = await this.#getObject();

      const initialLength = products.length;
      let finalProducts = [];
      let product = {}
      for (const element of products) {
        if (element.id != id) {
          finalProducts.push(element);
        }else {
          product = element;
        }
      }
      const finalLength = finalProducts.length;
      if (initialLength === finalLength) {
        throw new Error(`The product with id ${id} does not exist so it was not removed.`);
      }

      await this.#save(lastId, finalProducts);
      product = new ProductDto(product);
      console.log(`Product with id ${id}, deleted successfully`);
      return product;

    } catch (error) {
      throw error;
    }
  }

}
