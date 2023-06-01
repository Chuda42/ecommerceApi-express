/* imports */
import ProductService from '../services/product.service.js';
import CartService from '../services/cart.service.js';
import UserService from '../services/user.service.js';

/* services */
const productService = new ProductService();
const cartService = new CartService();
const userService = new UserService();

import Utils from '../utils.js'

/**
 * class ViewController
 */
export default class ViewController{

  constructor(){
    //setting context to this
    Object.getOwnPropertyNames(ViewController.prototype).forEach((key) => {
      if (key !== 'constructor' && key !== 'productService') {
        this[key] = this[key].bind(this);
      }
    });
  }  
  
  async getHome(req, res){
    //getting products
    const productList = await productService.getProducts();

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
    const productList = await productService.getProductsPaginate(options);
    
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
      const product = await productService.getProductById(id);
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

      let cart = await cartService.getProductsCart(id);
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
      const cartsIds = await cartService.getCartsIds();
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

      const user = await userService.getUserByEmail(email);
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

  async getResetPasswordForm(req, res) {

    const code = req.query.code;
    const email = req.query.email;

    if(!Utils.isValidToken(code)){
      res.redirect('/forgotPassword')
    }

    res.render('resetPasswordForm', {
      inSession: false,
      title: 'Reset Password',
      data: {
        code: code,
        email: email
      }
    });
  }

  async getForgotPassword(req, res) {
    res.render('forgotPassword', {
      inSession: false,
      title: 'Forgot Password'
    });
  }

}