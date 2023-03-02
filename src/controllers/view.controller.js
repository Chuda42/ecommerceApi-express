/**
 * class ViewController
 */
export default class ViewController{

  constructor(productService, cartService){
    this.productService = productService;
    this.cartService = cartService;

    Object.getOwnPropertyNames(ViewController.prototype).forEach((key) => {
      if (key !== 'constructor' && key !== 'productService') {
        this[key] = this[key].bind(this);
      }
    });
  }  
  
  async getHome(req, res){
    //getting products
    const productList = await this.productService.getProducts();

    //building response
    const data = {
      status : 'success',
      payload : JSON.parse(JSON.stringify(productList)),
    }

    res.render('home', {
      title: 'Home',
      data,
    });
  }

  async getProducts(req, res){
    //filtering query params
    let { limit= 10,
      page= 1,
      sort= '',
      query={} } = req.query;

    const options = { limit, page, sort : {price: sort} , query};
    //getting products
    const productList = await this.productService.getProductsPaginate(options);
    
    //linking pagination
    const prevPage = (productList.hasPrevPage) ? `${req.baseUrl}?page=${productList.prevPage}` : null;
    const nextPage = (productList.hasNextPage) ? `${req.baseUrl}?page=${productList.nextPage}` : null;

    //building response
    const data = {
      status : 'success',
      payload : JSON.parse(JSON.stringify(productList.docs)),
      totalPages : productList.totalPages,
      actualPage : productList.page,
      hasPrevPage : productList.hasPrevPage,
      hasNextPage : productList.hasNextPage,
      prevPage,
      nextPage
    }

    res.render('products', {
      title: 'Products',
      data,
    });
  }

  async getProductDetail(req, res){
    try{
      const { id } = req.params;
      const product = await this.productService.getProductById(id);
      const data = {
        status : 'success',
        product : product
      }
      res.render('productDetail', {
        title: 'Product Detail',
        data,
      });
    }catch (error){
      console.log(`[ERROR] ${error.message}`);
      res.render('error', {
        title: 'error',
        error: error.message
      });
    }

  }

  async getRealTimeProducts(req, res) {
    res.render('realTimeProducts', {
      title: 'Realtime Products'
    });
  }

  async getChat(req, res) {
    res.render('chat', {
      title: 'Chat'
    });
  }

  async getCart(req, res) {
    try{
      const { id } = req.params;

      let cart = await this.cartService.getProductsCart(id);
      cart = JSON.parse(JSON.stringify(cart));
      
      const data = {
        status : 'success',
        cart : cart
      }
      res.render('cart', {
        title: 'Cart',
        data,
      });
    }catch (error){
      console.log(`[ERROR] ${error.message}`);
      res.render('error', {
        title: 'error',
        error: error.message
      });
    }
  }
}