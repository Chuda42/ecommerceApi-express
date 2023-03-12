export default class UserDao{
  
  constructor(persistenceController){
    this.persistenceController = persistenceController;
  }

  async getUserByEmail(email){
    try {
      const filter = {email: email}
      let user = await this.persistenceController.getObject(filter);

      if (user === null) {
        throw new Error(`User with email ${email} not found`);
      }

      return user;
    } catch (error) {
      console.log(`[ERROR] ${error.message}`);
      throw error;
    }
  }

  async getUserById(uid){
    try {
        
      let user = await this.persistenceController.getObjectById(uid);

      if (user === null) {
        throw new Error(`User with id ${uid} not found`);
      }

      return user;
    
    }catch (error) {
      throw error;
    }
  }

  async getUsers(){
    try {
      let users = await this.persistenceController.getObjects();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async addUser(user){
    try {
      let newUser = await this.persistenceController.saveObject(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

}