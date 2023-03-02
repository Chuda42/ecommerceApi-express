/**
 * class ProductController
 */
export default class ProductController{
  //dependency injection
  constructor(productService){
    this.productService = productService;

    //setting context to this
    Object.getOwnPropertyNames(ProductController.prototype).forEach((key) => {
      if (key !== 'constructor' && key !== 'productService') {
        this[key] = this[key].bind(this);
      }
    });
  }

  async getProducts(req, res){
    try {
      //filtering query params
      let { limit= 10,
            page= 1,
            sort= '',
            query } = req.query;
      
      query = (query)? JSON.parse(query) : {};
      
      const options = { limit, page, sort : {price: sort} , query };
      //getting products
      const productList = await this.productService.getProductsPaginate(options);
      
      //linking pagination
      const prevPage = (productList.hasPrevPage) ? `${req.baseUrl}?limit=${limit}&page=${productList.prevPage}&sort=${sort}&query=${JSON.stringify(query)}` : null;
      const nextPage = (productList.hasNextPage) ? `${req.baseUrl}?limit=${limit}&page=${productList.nextPage}&sort=${sort}&query=${JSON.stringify(query)}` : null;

      //building response
      const response = {
        status: 'success',
        payload: productList.docs,
        totalPages: productList.totalPages,
        page: productList.page,
        nextPage: nextPage,
        prevPage: prevPage,
        hasPrevPage: productList.hasPrevPage,
        hasNextPage: productList.hasNextPage
      }

      res.status(200).json(response);
      
    } catch (error) {
      console.log(`[ERROR] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
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