/* imports */
import fs from 'fs';
import ProductManager from './product.manager.js';

import CartModel from '../models/cart.model.js'
import CartDto from '../../../dtos/cart.dto.js'

/* const */
const PRODUCT_PATH = './products.json';

class CartManager {
  /*Atributes*/
  #path = './data/carts.json'
  /*Methods*/
  constructor() {
  }

  async #dontExist() {
    if (!fs.existsSync(this.#path)) {
      await fs.promises.writeFile(this.#path, JSON.stringify({
        carts: []
      }));
    }
  }

  async #save(carts) {
    try {
      await fs.promises.writeFile(this.#path, JSON.stringify({
        carts: carts
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


  async addCart() {
    try {
      await this.#dontExist();

      let { carts } = await this.#getObject();

      /* Create de cart */
      let newCart = new CartModel({products: []})

      carts.push(newCart);

      await this.#save(carts);

      newCart = new CartDto(newCart);
      return newCart

    } catch (error) {
      throw error;
    }
  }

  async getProductsCart(cartId) {
    try {
      await this.dontExist();

      let { carts } = await this.#getObject();
      let resultado = [];

      const cart = carts.find(cart => cart.id == cartId);
      if (!!cart) {
        const productManager = new ProductManager(PRODUCT_PATH);
        for (const product of cart.products) {
          let productInfo = await productManager.getProductById(product.product);
          productInfo.quantity = product.quantity;
          resultado.push(productInfo);
        }
        return resultado;
      };

      throw new Error('Cart not found');
    } catch (error) {
      throw error;
    }
  }

  async isCart(cartId) {
    try {
      await this.#dontExist();

      let { carts } = await this.#getObject();

      const cart = carts.find(cart => cart._id == cartId);
      if (!!cart) {
        return;
      };

      throw new Error('Cart not found');
    } catch (error) {
      throw error;
    }
  }

async getProductObject() {
    try {
      const content = await fs.promises.readFile('./data/products.json');
      return JSON.parse(content);
    } catch (error) {
      console.log(error.message);
    }
}

  async isProduct(productId){
    try {
      await this.#dontExist();

      let {products} = await this.getProductObject();

      const product = products.find(product => product._id == productId);
      if (!!product) {
        return;
      };

      throw new Error('Product not found');
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      await this.#dontExist();

      let { carts } = await this.#getObject();

      await this.isCart(cartId); //throw error if cart not exist
      await this.isProduct(productId); //throw error if product not exist

      let cart = carts.map(cart => {
        if (cart._id === cartId) {
          if (!cart.products.find(product => product.product == productId)) {
            cart.products.push({ product: productId, quantity: 1 });
          } else {
            cart.products.map(product => {
              if (product.product == productId) {
                product.quantity++;
              }
            })
          }
          return cart;
        }
      });

      await this.#save(carts);
      cart = new CartDto(cart[0]);
      return cart;

    } catch (error) {
      throw error;
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      await this.#dontExist();

      let { carts } = await this.#getObject();

      await this.isCart(cartId); //throw error if cart not exist
      await this.isProduct(productId); //throw error if product not exist

      let cart = carts.map(cart => {
        if (cart._id == cartId) {
          cart.products = cart.products.filter(product => product.product != productId);
          return cart;
        }
      });

      await this.#save(carts);
      cart = new CartDto(cart[0]);
      return cart;

    } catch (error) {
      throw error;
    }
  }

  async udateProductQuantityInCart(cartId, productId, quantity) {
    try {
      await this.#dontExist();

      let { carts } = await this.#getObject();

      await this.isCart(cartId); //throw error if cart not exist
      await this.isProduct(productId); //throw error if product not exist

      let cart = carts.map(cart => {
        if (cart._id == cartId) {
          cart.products.map(product => {
            if (product.product == productId) {
              product.quantity = quantity;
            }
          })
          return cart;
        }
      });

      await this.#save(carts);
      cart = new CartDto(cart[0]);
      return cart;

    } catch (error) {
      throw error;
    }
  }

  async deleteAllProductsFromCart(cartId) {
    try {
      await this.#dontExist();

      let { carts } = await this.#getObject();

      await this.isCart(cartId); //throw error if cart not exist

      let cart = carts.map(cart => {
        if (cart._id == cartId) {
          cart.products = [];
          return cart;
        }
      });

      await this.#save(carts);
      cart = new CartDto(cart[0]);
      return cart;

    } catch (error) {
      throw error;
    }
  }

  async updateProductsToCart(cartId, products) {
    try {
      await this.#dontExist();

      let { carts } = await this.#getObject();

      await this.isCart(cartId); //throw error if cart not exist

      let cart = carts.map(cart => {
        if (cart._id == cartId) {
          cart.products = products;
          return cart;
        }
      });

      await this.#save(carts);
      cart = new CartDto(cart[0]);
      return cart;

    } catch (error) {
      throw error;
    }
  }

  async getCartsIds() {
    try {
      await this.#dontExist();

      let { carts } = await this.#getObject();
      let ids = carts.map(cart => cart._id);
      return ids;

    } catch (error) {
      throw error;
    }
  }

}

/* exports */
export default CartManager;