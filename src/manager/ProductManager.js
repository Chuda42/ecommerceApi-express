const fs = require('fs');

class ProductManager {
    /*Atributes*/
    #path
    #products
    #lastId
    
    /*Methods*/

    /* PRIVATE METHODS */
    constructor(path) {
        this.#path = path;
    }

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
    */
    async #save(){
        try{
            await fs.promises.writeFile(this.#path, JSON.stringify({
                lastId: this.#lastId,
                products: this.#products
            }));
        }catch(error) {
            console.log(error.message);
        }
    }

    /**
     * Get object from persistence, parse it into object and return it
    */
    async #getObject(){
        try{
            const content = await fs.promises.readFile(this.#path);
            return JSON.parse(content);
        }catch(error) {
            console.log(error.message);
        }

    }

    /**
     *  Check if product has one or more void fields
     *  @param {object} product
     *  @return {void}
     *  @throws {Error} if product has one or more void fields
    */
    async #isNotVoid(product) {
        let { title, description, price, code, stock, category } = product;
        /* void validation */
        let notVoidPrice = typeof price === 'number' && price >= 0;
        let notVoidStock = typeof stock === 'number' && stock >= 0;
        let notVoid = !!title && !!description && notVoidPrice && !!code && notVoidStock && !!category;
        if (!notVoid) throw new Error('Any field can be void, except thumbnails');

        try {
            let products = await this.getProducts();
            let sameId = products.find(prod => prod.code === code);
            if (!!sameId) throw new Error('Product code already exists');
    
            return;
        }catch(error) {
            throw error;
        }

    }

    /**
     *  Check if product has one or more invalid types fields
     *  @param {object} product
     *  @return {void}
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
     *  Store new product in persistence, prodcut must be an object with the following structure: {id, title, description, price, thumbnails, code, stock, category, status}
     *  @param {object} product 
     *  @throws {Error} if product has one or more void fields, or if product has one or more invalid types 
     */
    async addProduct(product) {
        try {
            await this.#dontExist();

            let { lastId, products } = await this.#getObject();
            
            await this.#isNotVoid(product);
            await this.#isValidTypes(product);
            
            lastId++;
            product.id = lastId;
            product.thumbnails = product.thumbnails ?? [];
            product.status = product.status ?? true;
            products.push(product);

            this.#lastId = lastId;
            this.#products = products;
            await this.#save();

            console.log(`Product added successfully with id ${lastId}`);

        } catch (error) {
            throw error;
        }
    }

    /**
     * Return products in persistence
     * @returns {Array<object>} products
     */
    async getProducts() {
        try {
            await this.#dontExist();
            const {products} = await this.#getObject();
            return products;
        } catch (error) {
            console.log(error.message);
        }
    }

    /**
     * Return product in persistence where product.id equals parameter id
     * @param {int} id 
     * @returns {object} product
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
            if(!await this.getProductById(id)) 
                throw new Error(`Product ${id} does not exist`);

            let { lastId, products } = await this.#getObject();
            const sameCode = products.find(product => product.code === updateProduct.code);
            if(!!sameCode){
                throw new Error(`Cannot update product, because another product already exists with value code: ${updateProduct.code}`);
            }

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

            this.#lastId = lastId;
            this.#products = products;
            await this.#save();

        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            await this.#dontExist();
            let { lastId, products } = await this.#getObject();

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
            await this.#save();

            console.log(`Product with id ${id}, deleted successfully`);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductManager;

