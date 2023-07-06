/* imports */
import { logger } from '../logger.js';
import MailService from './mail.service.js';
import Utils from '../utils.js'
import UserRepository from '../repositories/user.repository.js';
import CartRepository from '../repositories/cart.repository.js';

import Config from '../config/config.js';

export default class UserService{
  constructor(){
    this.repository = new UserRepository();
    this.cartRepository = new CartRepository();
  }

  async getUsers(){
    try {
      let users = await this.repository.getUsers();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async authUser(email, password) {
    try {
      let user = null;
      if(email === Config.ADMIN_EMAIL && password === Config.ADMIN_PASSWORD){
        user = {
          email: Config.ADMIN_EMAIL,
          first_name: "admin",
          last_name: "admin",
          Age: 0,
          rol: "admin"
        }
      }else{
        user = await this.repository.auth(email, password)
        if (!user){
          return null;
        }
      }
      return user;
    } catch (error) {
      logger.error(`[ERROR] ${error.message}`);
      return null;
    }
  }

  async getUserByEmail(email){
    try {
      let user = await this.repository.getUserByEmail(email);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async addUser(user){
    try {
      if(user.email === Config.ADMIN_EMAIL) {
        throw new Error("Email is not valid");
      }
      if(user.password === undefined || user.password === null || user.password === ""){
        throw new Error("Password is required");
      }
      user.password = Utils.createHash(user.password);
      user.rol = 'user'

      const cart = await this.cartRepository.addCart()
      user.cart = cart.id

      let newUser = await this.repository.addUser(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async addUserByThirdParty(user){
    try {
      const cart = await this.cartRepository.addCart()
      user.cart = cart.id

      let newUser = await this.repository.addUser(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  getAdmin(email) {
    if(email === Config.ADMIN_EMAIL){
      return {
        email: Config.ADMIN_EMAIL,
        first_name: "admin",
        last_name: "admin",
        Age: 0,
        rol: "admin"
      }
    }
    return null;
  }

  async sendResetPassword(email){
    try {

      let user = await this.repository.getUserByEmail(email);

      if (!user){
        throw new Error("User not found");
      }

      const newCode = await Utils.generateToken();
      Utils.saveToken(newCode);
      const link = `http://localhost:8080/resetPasswordForm?code=${newCode}&&email=${email}`

      const mailService = new MailService();

      const to = user.email;
      const subject = 'Reset Password';
      const body = `<h1>link to reset password </h1>
      <a href='${link}'>link</a>`

      mailService.sendMail(to, subject, body);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(token, email, newPassword){
    try {
      let user = await this.repository.getUserByEmail(email);

      if (!user){
        throw new Error("User not found");
      }

      if (!Utils.isValidToken(token)){
        throw new Error("Expired or invalid token");
      }else {
        user = await this.repository.auth(email, newPassword)
        if (user){
          throw new Error("New password must be different from old password");
        }
      }

      const password = Utils.createHash(newPassword);

      await this.repository.updateUserPassword(email, password);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async upgradeToPremium(uid){
    try {
      let user = await this.repository.getUserById(uid);

      if (!user){
        throw new Error("User not found");
      }

      if (user.role === 'user'){
        user = await this.repository.upgradeToPremium(uid);
        user.role = 'premium';
      } else if (user.role === 'premium'){
        user = await this.repository.downgradeToUser(uid);
        user.role = 'user';
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateLastConnection(email){
    try {
      let user = await this.repository.updateLastConnection(email);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async uploadDocuments(uid, documents, addressProof=false, identityProof=false, accountStatementProof=false){
    try {
      let user = await this.repository.uploadDocuments(uid, documents, addressProof, identityProof, accountStatementProof);
      return user;
    } catch (error) {
      throw error;
    }
  }

}
