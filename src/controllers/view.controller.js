/**
 * class ViewController
 */
export default class ViewController{

  constructor({productService, cartService, userService}){
    this.productService = productService;
    this.cartService = cartService;
    this.userService = userService;

    Object.getOwnPropertyNames(ViewController.prototype).forEach((key) => {
      if (key !== 'constructor' && key !== 'productService') {
        this[key] = this[key].bind(this);
      }
    });
  }  
  
  async getHome(req, res){
    //getting products
    const productList = await this.productService.getProducts();

    //getting user
    const user = {
      email: req.session.user,
      rol: req.session.rol
    } 
    
    //building response
    const data = {
      status : 'success',
      payload : JSON.parse(JSON.stringify(productList)),
      user: user
    }

    res.render('home', {
      inSession: true,
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
      inSession: true,
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
        inSession: true,
        title: 'Product Detail',
        data,
      });
    }catch (error){
      console.log(`[ERROR] ${error.message}`);
      res.render('error', {
        inSession: true,
        title: 'error',
        error: error.message
      });
    }

  }

  async getRealTimeProducts(req, res) {
    res.render('realTimeProducts', {
      inSession: true,
      title: 'Realtime Products'
    });
  }

  async getChat(req, res) {
    res.render('chat', {
      inSession: true,
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
        cart : cart,
        cartId: id
      }
      res.render('cart', {
        inSession: true,
        title: 'Cart',
        data,
      });
    }catch (error){
      console.log(`[ERROR] ${error.message}`);
      res.render('error', {
        inSession: true,
        title: 'error',
        error: error.message
      });
    }
  }

  async getCartsIds(req, res) {
    try{
      const cartsIds = await this.cartService.getCartsIds();
      const data = {
        status : 'success',
        cartsIds : cartsIds
      }
      res.render('verIdCarts', {
        inSession: true,
        title: 'verIdCarts',
        data: data
      });
    }catch (error){
      console.log(`[ERROR] ${error.message}`);
      res.render('error', {
        inSession: true,
        title: 'error',
        error: error.message
      });
    }
  }

  async getLogin(req, res) {
    res.render('login', {
      inSession: false,
      title: 'Login'
    });
  }

  async getRegister(req, res) {
    res.render('register', {
      inSession: false,
      title: 'Register'
    });
  }

  async getUserProfile(req, res) {
    try{
      const email = req.session.user;
      const isAdmin = req.session.rol == 'admin';

      if(email === 'adminCoder@coder.com'){
        res.render('userProfile', {
          inSession: true,
          title: 'userProfile',
          data: {
            status : 'success',
            user: {
              email: "adminCoder@coder.com",
              first_name: "admin",
              last_name: "admin",
            },
            isAdmin: isAdmin
          },
        });
        return
      }

      const user = await this.userService.getUserByEmail(email);
      const data = {
        status : 'success',
        user : user,
        isAdmin: isAdmin
      }

      res.render('userProfile', {
        inSession: true,
        title: 'userProfile',
        data,
      });

    }catch (error){
      console.log(`[ERROR] ${error.message}`);
      res.render('error', {
        inSession: true,
        title: 'error',
        error: error.message
      });
    }
  }

}