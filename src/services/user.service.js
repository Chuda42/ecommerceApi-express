export default class UserService{
  constructor(persistenceController){
    this.persistenceController = persistenceController;
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
      let newUser = await this.persistenceController.addUser(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

}
