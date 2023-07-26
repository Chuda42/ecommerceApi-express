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
    let user = req.session.user;
    user = await userService.getUserByEmail(user);
    
    let data = null;

    if(user.rol === 'admin'){
      data = {
        status : 'success',
        payload : JSON.parse(JSON.stringify(productList)),
        user,
        isAdmin: true
      }
    }else{
      //building response
      data = {
        status : 'success',
        payload : JSON.parse(JSON.stringify(productList)),
        user: user,
        isAdmin: false
      }
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

    let user = req.session.user;
    user = await userService.getUserByEmail(user);
    const isAdmin = req.session.rol == 'admin';

    //building response
    const data = {
      status : 'success',
      payload : JSON.parse(JSON.stringify(productList.docs)),
      totalPages : productList.totalPages,
      actualPage : productList.page,
      hasPrevPage : productList.hasPrevPage,
      hasNextPage : productList.hasNextPage,
      prevPage,
      nextPage,
      user,
      isAdmin: isAdmin
    }

    res.render('products', {
      inSession: true,
      title: 'Products',
      data,
    });
  }

  async getProductDetail(req, res){
    try{
        //getting user
      let user = req.session.user;
      user = await userService.getUserByEmail(user);
      const { id } = req.params;
      const product = await productService.getProductById(id);
      const data = {
        status : 'success',
        product : product,
        user
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
    let user = req.session.user;
    user = await userService.getUserByEmail(user);
    const data = {
      user
    }
    res.render('realTimeProducts', {
      inSession: true,
      title: 'Realtime Products',
      data
    });
  }

  async getChat(req, res) {
    let user = req.session.user;
    user = await userService.getUserByEmail(user);
    const data = {
      user
    }
    res.render('chat', {
      inSession: true,
      title: 'Chat',
      data
    });
  }

  async getCart(req, res) {
    try{
      let user = req.session.user;
      user = await userService.getUserByEmail(user);
      const { id } = req.params;

      let cart = await cartService.getProductsCart(id);
      cart = JSON.parse(JSON.stringify(cart));
      
      const data = {
        status : 'success',
        cart : cart,
        cartId: id,
        user
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

  async getUploadDocuments(req, res) {
    const user = await userService.getUserByEmail(req.session.user);
    res.render('uploadDocuments', {
      inSession: true,
      title: 'Upload Documents',
      data: {
        uid: user.id,
        user
      }
    });
  }

  async getModifyUser(req, res) {
    const user = await userService.getUserByEmail(req.session.user);
    const users = await userService.getUsers();
    res.render('modifyUsers', {
      inSession: true,
      title: 'Modify User',
      data: {
        users: users,
        user
      }
    });
  }

}