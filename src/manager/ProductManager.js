const fs = require('fs');

class ProductManager {
    /*Atributes*/
    #path
    #products
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
                products: []
            }));
        }
    }

    async save(){
        try{
            await fs.promises.writeFile(this.#path, JSON.stringify({
                lastId: this.#lastId,
                products: this.#products
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

    async isValidProduct(product) {
        let { title, description, price, code, stock, category } = product;
        let notVoid = !!title && !!description && !!price && !!code && !!stock && !!category;
        if (!notVoid) return false;

        try {
            let products = await this.getProducts();
            let sameId = products.find(prod => prod.code === code);
            if (!!sameId) return false;
    
            return true;
        }catch(error) {
            console.log(error.message);
        }

    }

    async addProduct(product) {
        try {
            await this.dontExist();

            let { lastId, products } = await this.getObject();

            if (!await this.isValidProduct(product)) {
                throw new Error('Product not valid');
            };

            lastId++;
            product.id = lastId;
            product.thumbnails = product.thumbnails ?? [];
            product.status = product.status ?? true;
            products.push(product);

            this.#lastId = lastId;
            this.#products = products;
            await this.save();

            console.log(`Product added successfully with id ${lastId}`);

        } catch (error) {
            throw error;
        }
    }

    async getProducts() {
        try {
            await this.dontExist();
            const {products} = await this.getObject();
            return products;
        } catch (error) {
            console.log(error.message);
        }
    }

    async getProductById(id) {
        try {
            await this.dontExist();

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

    async updateProduct(id, updateProduct) {
        try {
            await this.dontExist();
            if(!await this.getProductById(id)) 
                throw new Error(`Product ${id} does not exist`);

            let { lastId, products } = await this.getObject();
            const sameCode = products.find(product => product.code === updateProduct.code);
            if(!!sameCode){
                throw new Error(`Cannot update product, because another product already exists with value code: ${updateProduct.code}`);
            }

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

            this.#lastId = lastId;
            this.#products = products;
            await this.save();

        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            await this.dontExist();
            let { lastId, products } = await this.getObject();

            const initialLength = products.length;
            let finalProducts = [];
            for(const element of products){
                if(element.id != id){
                    finalProducts.push(element);
                }
            }
            const finalLength = finalProducts.length;
            if (initialLength === finalLength){
                throw new Error(`The product with id ${id} does not exist so it was not removed.`);
            }

            this.#lastId = lastId;
            this.#products = finalProducts;
            await this.save();

            console.log(`Product with id ${id}, deleted successfully`);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductManager;

