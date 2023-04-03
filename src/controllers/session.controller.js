/*imports*/
import Utils from '../utils.js'
import jwt from 'jsonwebtoken'

export default class SessionController{
  constructor(userService){
    this.userService = userService;

    //setting context to this
    Object.getOwnPropertyNames(SessionController.prototype).forEach((key) => {
      if (key !== 'constructor' && key !== 'UserService') {
        this[key] = this[key].bind(this);
      }
    });
  }

  async loginUser(req, res){
    try{
      let rol = "user"
      let user = req.user;

      if(user.email === "adminCoder@coder.com"){
          rol = "admin"
      }

      /* set session */
      req.session.user = user.email;
      req.session.rol = rol

      let token = jwt.sign(user, Utils.JWT_PRIVATE_KEY, { expiresIn: '24h'})
      res.cookie('cookieToken', token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true 
      }).status(200).json({ status: 'success'});

    }catch (error){
      console.log(`[ERROR] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

  async failLogin(req, res){
    console.log(`[ERROR] Error logging in`);
    res.status(400).json({status: 'error', error: 'Error logging in'})
  }

  async registerUser(req, res){
    res.status(201).json({status: 'success', payload: 'User registered'})
  }

  async failRegister(req, res){
    console.log(`[ERROR] Error logging in`);
    res.status(400).json({status: 'error', error: 'Error registering user'})
  }

  async logoutUser(req, res){
    try{
      req.session.destroy();
      res.clearCookie("cookieToken");
      res.status(200).json({ status: 'success', payload: 'User logged out' });

    }catch (error){
      console.log(`[ERROR] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

  async gitHubSession(req, res){
    try{
      req.session.user = req.user.email;
      req.session.rol = "user"
      res.redirect('/');

    }catch (error){
      console.log(`[ERROR] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

  async getCurrentUser(req, res){
    res.send(req.user)
  }

}