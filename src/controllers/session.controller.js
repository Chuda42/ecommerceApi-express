/*imports*/
import Config from '../config/config.js'	
import Utils from '../utils.js'

import UserService from '../services/user.service.js';

import UserEntity from '../entities/user.entity.js'

/* user service */
const userService = new UserService();

export default class SessionController{
  constructor(){
    //setting context to this
    Object.getOwnPropertyNames(SessionController.prototype).forEach((key) => {
      if (key !== 'constructor' && key !== 'UserService') {
        this[key] = this[key].bind(this);
      }
    });
  }

  async loginUser(req, res){
    try{
      let rol = req.user.role;
      let user = req.user;

      if(user.email === Config.ADMIN_EMAIL){
          rol = "admin"
      }

      /* set session */
      req.session.user = user.email;
      req.session.rol = rol

      res.status(200).json({ status: 'success', payload: user });

    }catch (error){
      req.logger.error(`[ERROR CONTROLLER] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

  async failLogin(req, res){
    req.logger.error(`[ERROR CONTROLLER] Error registreing user`);
    res.status(400).json({status: 'error', error: 'Error logging in'})
  }

  async registerUser(req, res){
    res.status(201).json({status: 'success', payload: 'User registered'})
  }

  async failRegister(req, res){
    req.logger.error(`[ERROR CONTROLLER] Error logging in`);
    res.status(400).json({status: 'error', error: 'Error registering user'})
  }

  async logoutUser(req, res){
    try{
      req.session.destroy();
      res.status(200).json({ status: 'success', payload: 'User logged out' });

    }catch (error){
      req.logger.error(`[ERROR CONTROLLER] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

  async gitHubSession(req, res){
    try{
      req.session.user = req.user.email;
      req.session.rol = "user"
      res.redirect('/');

    }catch (error){
      req.logger.error(`[ERROR CONTROLLER] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

  async getCurrentUser(req, res){
    try{
      const user = await userService.getUserByEmail(req.session.user)

      const userEntity = new UserEntity(user)

      return res.status(200).json({ 
        status: 'success',
        payload: userEntity 
      })
    }catch (error){
      req.logger.error(`[ERROR CONTROLLER] ${error.message}`);
      res.status(400).json({ status: 'error', error: 'Not current user' });
    }
  }

  async none(req, res) {

  }

}