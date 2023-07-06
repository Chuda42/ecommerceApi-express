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

  async upgradeToPremium(req, res){
    try{
      const { uid } = req.params;

      const user = await userService.upgradeToPremium(uid);

      req.session.rol = 'premium';
      res.status(200).json({ status: 'success', payload: user });

    }catch (error){
      req.logger.error(`[ERROR] ${error.message}`);

      res.status(400).json({ status: 'error', error: error.message });
    }
  }

  async uploadDocuments(req, res){
    try{
      const { uid } = req.params;
      const files = req.files;

      let documents = [];

      if (files.profile){
        documents.push({
          name: files.profile[0].filename,
          reference: files.profile[0].destination
        })
      }

      if (files.identity){
        documents.push({
          name: files.identity[0].filename,
          reference: files.identity[0].destination
        })
      }

      if (files.addressProof){
        documents.push({
          name: files.addressProof[0].filename,
          reference: files.addressProof[0].destination
        })
      }

      if (files.accountStatement){
        documents.push({
          name: files.accountStatement[0].filename,
          reference: files.accountStatement[0].destination
        })
      }

      const user = await userService.uploadDocuments(uid, documents);

      res.status(200).json({ status: 'success', payload: user });

    }catch (error){
      req.logger.error(`[ERROR] ${error.message}`);

      res.status(400).json({ status: 'error', error: error.message });
    }
  }

}