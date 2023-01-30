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
        let { title, description, price, thumbnail, code, stock } = product;
        let notVoid = !!title && !!description && !!price && !!thumbnail && !!code && !!stock;
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
                console.error("Producto no valido");
                return;
            };

            lastId++;
            product.id = lastId;
            products.push(product);

            this.#lastId = lastId;
            this.#products = products;
            await this.save();

            console.log(`Producto agregado correctamente con el id ${lastId}`);

        } catch (error) {
            console.log(error.message);
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
            throw new Error(`El producto con el id ${id} no existe`);
        } catch (error) {
            console.log(error.message);
            throw new Error(`El producto con el id ${id} no existe`);
        }

    }

    async udateProduct(id, updateProduct) {
        try {
            await this.dontExist();

            let { lastId, products } = await this.getObject();
            const sameCode = products.find(product => product.code === updateProduct.code);
            if(!!sameCode){
                console.log(`No se puede actualizar el producto, debido a que ya existe otro producto con el valor code: ${updateProduct.code}`);
                return
            }

            products.map(product => {
                if (product.id === id) {
                    product.title = (updateProduct.title) ?? product.title;
                    product.description = (updateProduct.description) ?? product.description;
                    product.price = (updateProduct.price) ?? product.price;
                    product.thumbnail = (updateProduct.thumbnail) ?? product.thumbnail;
                    product.code = (updateProduct.code) ?? product.code;
                    product.stock = (updateProduct.stock) ?? product.stock;
                    return;
                }
            })

            this.#lastId = lastId;
            this.#products = products;
            await this.save();

        } catch (error) {
            console.log(error.message);
        }
    }

    async deleteProduct(id) {
        try {
            await this.dontExist();
            let { lastId, products } = await this.getObject();

            const initialLength = products.length;
            products = products.filter((product) => {
                product.id != id
            })
            const finalLength = products.length;
            if (initialLength == finalLength){
                console.log(`El elemento con el id ${id} no existe por lo tanto no se elemino.`);
                return;
            }

            this.#lastId = lastId;
            this.#products = products;
            await this.save();

            console.log(`Producto con el id ${id}, eliminado correctamente`);
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = ProductManager;

