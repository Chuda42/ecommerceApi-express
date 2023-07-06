/* imports */
import FactoryDaos from '../persistence/factory.js'
import Config from '../config/config.js'
import UserDto from '../dtos/user.dto.js'
import User from '../entities/user.entity.js'

import Utils from '../utils.js'

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

  async auth(email, password){
    try {
      const user = await this.dao.getUserByEmail(email);
      if(Utils.isValidPassword(password, user.password)){
        const userEntity = new User(user);
        return userEntity;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async updateUserPassword(email, password){
    try {
      const user = await this.dao.updateUserPassword(email, password);
    } catch (error) {
      throw error;
    }
  }
  
  async upgradeToPremium(uid){
    try {
      const user = await this.dao.upgradeToPremium(uid);
    } catch (error) {
      throw error;
    }
  }

  async getUserById(uid){
    try {
      const user = await this.dao.getUserById(uid);
      const userEntity = new User(user);
      return userEntity;
    } catch (error) {
      throw error;
    }
  }

  async downgradeToUser(uid){
    try {
      const user = await this.dao.downgradeToUser(uid);
      const userEntity = new User(user);
    } catch (error) {
      throw error;
    }
  }

  async updateLastConnection(email){
    try {
      const user = await this.dao.updateLastConnection(email);
      const userEntity = new User(user);
      return userEntity;
    } catch (error) {
      throw error;
    }
  }

  async uploadDocuments (uid, documents){
    try {
      const user = await this.dao.uploadDocuments(uid, documents);
      const userEntity = new User(user);
      return userEntity;
    } catch (error) {
      throw error;
    }
  }

}