/**
 * class ProductController
 */
export default class ProductController{
  //dependency injection
  constructor(productService){
    this.productService = productService;

    //setting context to this
   /*  this.getProducts = this.getProducts.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.getProductById = this.getProductById.bind(this); 
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this); */
    //auto binding
    Object.getOwnPropertyNames(ProductController.prototype).forEach((key) => {
      if (key !== 'constructor' && key !== 'productService') {
        this[key] = this[key].bind(this);
      }
    });
  }

  async getProducts(req, res){
    try {
      const productList = await this.productService.getProducts();
  
      const { limit } = req.query ?? -1;
  
      if (limit > 0) {
        res.status(200).json(productList.slice(0, limit));
      } else {
        res.status(200).json(productList);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async addProduct(req, res){
    try {
      const product = req.body;
  
      product.price = parseInt(product.price);
      product.stock = parseInt(product.stock);
  
      let newProduct = await this.productService.addProduct(product);
  
      /* get io server */
      req.app.get('io').sockets.emit('newProduct', newProduct);
  
      res.status(200).json({ status: 'ok', message: 'Added product' });
    } catch (error) {
      console.log(`[ERROR] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

  async getProductById(req, res){
    try {
      const id = req.params.pid;
      const product = await this.productService.getProductById(id);
      res.status(200).json(product);
    } catch (error) {
      console.log(`[ERROR] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

  async updateProduct(req, res){
    try {
      const product = req.body;
      const id = req.params.pid 
      await this.productService.updateProduct(id, product);
      res.status(200).json({ status: 'ok', message: 'Updated product' });
    } catch (error) {
      console.log(`[ERROR] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

  async deleteProduct(req, res){
    try {
      const id = req.params.pid;
      await this.productService.deleteProduct(id);
  
      /* get io server */
      req.app.get('io').sockets.emit('deleteProduct', id);
  
      res.status(200).json({ status: 'ok', message: 'Deleted product' });
    } catch (error) {
      console.log(`[ERROR] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

}