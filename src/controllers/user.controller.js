/* imports */
import UserService from '../services/user.service.js';

/* user service */
const userService = new UserService();

export default class UserController{
  constructor(){
    //setting context to this
    Object.getOwnPropertyNames(UserController.prototype).forEach((key) => {
      if (key !== 'constructor' && key !== 'UserService') {
        this[key] = this[key].bind(this);
      }
    });
  }

  async getUsers(req, res){
    try{
      const users = await userService.getUsers();
      res.status(200).json({ status: 'success', payload: users });

    }catch (error){
      req.logger.error(`[ERROR] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

  async addUser(req, res){
    try{
      const user = req.body;
      const newUser = await userService.addUser(user);
      res.status(201).json({ status: 'success', payload: newUser });

    }catch (error){
      req.logger.error(`[ERROR] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

  async sendResetPassword(req, res){
    try{
      const { email } = req.query;

      const user = await userService.sendResetPassword(email);
      res.status(200).json({ status: 'success', payload: user });

    }catch (error){
      req.logger.error(`[ERROR] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

  async resetPassword(req, res){
    try{
      const { email, token, newPassword } = req.body;

      const user = await userService.resetPassword(token, email, newPassword);
      res.status(200).json({ status: 'success', payload: user });

    }catch (error){
      req.logger.error(`[ERROR] ${error.message}`);

      res.status(400).json({ status: 'error', error: error.message });
    }
  }

}