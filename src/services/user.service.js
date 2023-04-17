/* imports */
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
        user = await this.getUserByEmail(email);
        if (!user || !Utils.isValidPassword(password, user.password)){
          return null;
        }
      }
      return user;
    } catch (error) {
      console.log(`[ERROR] ${error.message}`);
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

}
