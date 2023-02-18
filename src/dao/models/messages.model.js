/* imports */
const fs = require('fs');

/**
 * ProductManager class, provides a persistence manager to store products
*/
class ProductManager {
  /*Atributes*/
  #path

  /* Methods */

  /* Constructors */
  /**
  * @param {string} path - path to persistence file
  * @return {ProductManager}
  */
  constructor(path) {
    this.#path = path;
  }

  /* PRIVATE METHODS */
  /**
  *  Check if persistence file exists, if not, create it
  */
  async #dontExist() {
    if (!fs.existsSync(this.#path)) {
      await fs.promises.writeFile(this.#path, JSON.stringify({
        lastId: 0,
        products: []
      }));
    }
  }

  /** 
  * Commit changes to persistence
  * @param {int} lastId - lastId of products
  * @param {Array<object>} products - array of products
  */
  async #save(lastId, products) {
    try {
      await fs.promises.writeFile(this.#path, JSON.stringify({
        lastId: lastId,
        products: products
      }));
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
  * Get object from persistence, parse it into object and return it
  * @return {Promise<{lastId: int, products: Array<object>}>}
  */
  async #getObject() {
    try {
      const content = await fs.promises.readFile(this.#path);
      return JSON.parse(content);
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
  *  Check if product has one or more void fields
  *  @param {{
  *       title: string,
  *       description: string,
  *       price: int,
  *       code: string,
  *       stock: int,
  *       category: string}} product
  *  @throws {Error} - if product has one or more void fields
  */
  async #isNotVoid(product) {
    let { title, description, price, code, stock, category } = product;
    /* void validations */
    let notVoidPrice = typeof price === 'number' && price >= 0;
    let notVoidStock = typeof stock === 'number' && stock >= 0;
    let notVoid = !!title && !!description && notVoidPrice && !!code && notVoidStock && !!category;
    if (!notVoid) throw new Error('Any field can be void, except thumbnails and status');
  }

  /**
  * Check if product with product.code equals code already exists
  * @param {string} code
  */
  async #isValidCode(code) {
    try {
      let products = await this.getProducts();
      const sameCode = products.find(product => product.code === code);
      if (!!sameCode) {
        throw new Error(`Product with value code: ${code} already exists `);
      }
      return;
    } catch (error) {
      throw error;
    }
  }

  /**
  *  Check if product has one or more invalid types fields
  *  @param {{
  *       title: string,
  *       description: string,
  *       price: int,
  *       thumbnails: Array<string> | undefined,
  *       code: string,
  *       stock: int,
  *       status: boolean | undefined,
  *       category: string}} product
  *  @throws {Error} if product has one or invalid types fields
  */
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

  /* PUBLIC METHODS */

  /**
  *  Store new product in persistence
  *  @param {{
  *      id: string,
  *       title: string,
  *       description: string,
  *       price: int,
  *       thumbnails: Array<string> | undefined,
  *       code: string,
  *       stock: int,
  *       status: boolean | undefined,
  *       category: string}} product 
  *  @throws {Error} - if product has one or more void fields, or if product has one or more invalid types 
  */
  async addProduct(product) {
    try {
      await this.#dontExist();

      let { lastId, products } = await this.#getObject();

      await this.#isValidCode(product.code);
      await this.#isNotVoid(product);
      await this.#isValidTypes(product);

      lastId++;
      product.id = lastId;
      product.thumbnails = product.thumbnails ?? [];
      product.status = product.status ?? true;
      products.push(product);

      await this.#save(lastId, products);

      console.log(`Product added successfully with id ${lastId}`);

    } catch (error) {
      throw error;
    }
  }

  /**
  * Return products in persistence
  * @returns {Promise<Array<object>>} products
  */
  async getProducts() {
    try {
      await this.#dontExist();
      const { products } = await this.#getObject();
      return products;
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
  * Return product in persistence where product.id equals parameter id
  * @param {int} id 
  * @returns {Promise<{
  *      id: string,
  *      title: string,
  *      description: string,
  *      price: int,
  *      thumbnails: Array<string>,
  *      code: string,
  *      stock: int,
  *      status: boolean,
  *      category: string}>} product
  * @throws {Error} if product where product.id equals id does not exist
  */
  async getProductById(id) {
    try {
      await this.#dontExist();

      const products = await this.getProducts();

      let prod = products.find(product => product.id == id);
      if (!!prod) {
          return prod;
      };
      console.error('Not found');
      throw new Error(`Product ${id} does not exist`);
    
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  /**
  * Update product in persistence where product.id equals parameter id
  * @param {int} id 
  * @param {{title: string | undefined,
  *          description: string | undefined,
  *          price: int | undefined,
  *          thumbnails: Array<string> | undefined,
  *          code: string | undefined,
  *          stock: int | undefined,
  *          status: boolean | undefined,
  *          category: string | undefined}} updateProduct 
  * @throws {Error} if product where product.id equals id does not exist
  * @throws {Error} if updateProduct has one or more invalid types
  */
  async updateProduct(id, updateProduct) {
    try {
      await this.#dontExist();
      if (!await this.getProductById(id))
        throw new Error(`Product ${id} does not exist`);

      let { lastId, products } = await this.#getObject();

      await this.#isValidCode(updateProduct.code);
      await this.#isValidTypes(updateProduct);

      products.map(product => {
        if (product.id === parseInt(id)) {
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


      await this.#save(lastId, products);

    } catch (error) {
      throw error;
    }
  }

  /**
  * Delete product in persistence where product.id equals parameter id
  * @param {int} id
  * @throws {Error} if product where product.id equals id does not exist
  */
  async deleteProduct(id) {
    try {
      await this.#dontExist();
      let { lastId, products } = await this.#getObject();

      const initialLength = products.length;
      let finalProducts = [];
      for (const element of products) {
        if (element.id != id) {
          finalProducts.push(element);
        }
      }
      const finalLength = finalProducts.length;
      if (initialLength === finalLength) {
        throw new Error(`The product with id ${id} does not exist so it was not removed.`);
      }

      await this.#save(lastId, finalProducts);

      console.log(`Product with id ${id}, deleted successfully`);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductManager;