/*imports*/
import Utils from '../utils.js'

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

      res.status(200).json({ status: 'success', payload: user });

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
    try{
      const user = await this.userService.getUserByEmail(req.session.user)

      return res.status(200).json({ status: 'success', payload: user})
    }catch (error){
      console.log(`[ERROR] Not current user`);
      res.status(400).json({ status: 'error', error: 'Not current user' });
    }
  }

}