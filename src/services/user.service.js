/* imports */
import Utils from '../utils.js'

export default class UserService{
  constructor(persistenceController, cartPersistenceController){
    this.persistenceController = persistenceController;
    this.cartPersistenceController = cartPersistenceController;
  }

  async getUsers(){
    try {
      let users = await this.persistenceController.getUsers();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email){
    try {
      let user = await this.persistenceController.getUserByEmail(email);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async addUser(user){
    try {
      if(user.password === undefined || user.password === null || user.password === ""){
        throw new Error("Password is required");
      }
      user.password = Utils.createHash(user.password);
      user.rol = 'user'

      const cart = await this.cartPersistenceController.addCart()
      user.cart = cart._id

      let newUser = await this.persistenceController.addUser(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async addUserByThirdParty(user){
    try {
      let newUser = await this.persistenceController.addUser(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

}
