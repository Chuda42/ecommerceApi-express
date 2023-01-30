/* imports */
const fs = require('fs');
const ProductManager = require('./ProductManager');

/* const */
const PRODUCT_PATH = './products.json';

class CartManager {
    /*Atributes*/
    #path
    #carts
    #lastId
    /*Methods*/
    constructor(path) {
        this.#path = path;
    }

    async dontExist() {
        /*Si el archivo no existe lo crea*/
        if (!fs.existsSync(this.#path)) {
            await fs.promises.writeFile(this.#path, JSON.stringify({
                lastId: 0,
                carts: []
            }));
        }
    }

    async save(){
        try{
            await fs.promises.writeFile(this.#path, JSON.stringify({
                lastId: this.#lastId,
                carts: this.#carts
            }));
        }catch(error) {
            console.log(error.message);
        }
    }

    async getObject(){
        try{
            const content = await fs.promises.readFile(this.#path);
            return JSON.parse(content);
        }catch(error) {
            console.log(error.message);
        }

    }

    async addCart() {
        try {
            await this.dontExist();

            let { lastId, carts } = await this.getObject();

            lastId++;

            /* Create de cart */
            const cart = {
                id: lastId,
                products: [],
            }
            carts.push(cart);

            this.#lastId = lastId;
            this.#carts = carts;
            await this.save();

            console.log(`Cart ${lastId} added successfully`);

        } catch (error) {
            throw error;
        }
    }

    async getProductsCart(cartId) {
        try {
            await this.dontExist();

            let { carts } = await this.getObject();
            let resultado = [];

            const cart = carts.find(cart => cart.id == cartId);
            if (!!cart) {
                const productManager = new ProductManager(PRODUCT_PATH);
                for(const product of cart.products){
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

    async addProductToCart(cartId, productId) {
        try {
            await this.dontExist();

            let { lastId, carts } = await this.getObject();

            let cart = carts.map(cart => {
                if (cart.id == cartId) {
                    if (!cart.products.find(product => product.product == productId)) {
                        cart.products.push({product: productId, quantity: 1});
                    }else{
                        cart.products.map(product => {
                            if (product.product == productId) {
                                product.quantity++;
                            }
                        })
                    }
                    return cart;
                }
            }) ?? null;

            if (!!cart) {
                this.#lastId = lastId;
                this.#carts = carts;
                await this.save();
                return;
            }

            throw new Error('Cart not found');
        } catch (error) {
            throw error;
        }
    }

}

/* exports */
module.exports = CartManager;