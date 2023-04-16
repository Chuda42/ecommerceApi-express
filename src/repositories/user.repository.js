/* imports */
import FactoryDaos from '../persistence/factory.js'
import Config from '../config/config.js'
import UserDto from '../dtos/user.dto.js'
import User from '../entities/user.entity.js'


export default class UserRepository {

  constructor(){
    this.dao = FactoryDaos.getUserDao(Config.PERSISTENCE);
  }
  
  async getUsers(){
    try {
      const users = await this.dao.getUsers();
      const usersEntity = users.map(user => new User(user));
      return usersEntity;
    } catch (error) {
      throw error;
    }
  }

  async addUser(user){
    try {
      const newUserDTO = new UserDto(user);
      const newUser = await this.dao.addUser(newUserDTO);
      const userEntity = new User(newUser);
      return userEntity;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email){
    try {
      const user = await this.dao.getUserByEmail(email);
      const userEntity = new User(user);
      return userEntity;
    } catch (error) {
      throw error;
    }
  }
}