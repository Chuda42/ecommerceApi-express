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
      let user = {}
      const { email, password } = req.body;

      // admin user
      if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
        rol = "admin"
        user = {
          email: "adminCoder@coder.com",
          first_name: "admin",
          last_name: "admin",
          Age: "admin",
        }
      }else{ // normal user
        user = await this.userService.getUserByEmail(email);

        if (!user){
          throw new Error('Email or password is incorrect');
        }
        if (!Utils.isValidPassword(password, user.password)){
          throw new Error('Email or password is incorrect');
        }
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

  async registerUser(req, res){
    try{
      const user = req.body;
      const newUser = await this.userService.addUser(user);
      res.status(201).json({ status: 'success', payload: newUser });

    }catch (error){
      console.log(`[ERROR] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
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
}