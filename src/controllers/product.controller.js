/* imports */
import ProductService from '../services/product.service.js'

/* Product service */
const productService = new ProductService();

/**
 * class ProductController
 */
export default class ProductController{
  constructor(){
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
      const productList = await productService.getProductsPaginate(options);
      
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
      req.logger.error(`[ERROR CONTROLLER] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

  async addProduct(req, res, next){
    try{
      const product = req.body;
  
      product.price = parseInt(product.price);
      product.stock = parseInt(product.stock);
  
      product.owner = req.session.user;

      let newProduct = await productService.addProduct(product);
  
      /* get io server */
      req.app.get('io').emitSockets('newProduct', newProduct);
  
      res.status(200).json({ status: 'ok', message: 'Added product', payload: newProduct });
    }catch(e){
      next(e);
    }
    
  }

  async getProductById(req, res){
    try {
      const id = req.params.pid;
      const product = await productService.getProductById(id);
      res.status(200).json(product);
    } catch (error) {
      req.logger.error(`[ERROR CONTROLLER] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

  async updateProduct(req, res){
    try {
      const product = req.body;
      const user = req.session.user;
      const id = req.params.pid 
      await productService.updateProduct(id, product, user);
      res.status(200).json({ status: 'ok', message: 'Updated product', payload: product });
    } catch (error) {
      req.logger.error(`[ERROR CONTROLLER] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

  async deleteProduct(req, res){
    try {
      const id = req.params.pid;
      const user = req.session.user;
      await productService.deleteProduct(id, user);
  
      /* get io server */
      req.app.get('io').emitSockets('deleteProduct', id);
  
      res.status(200).json({ status: 'ok', message: 'Deleted product', payload: id });
    } catch (error) {
      req.logger.error(`[ERROR CONTROLLER] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

}