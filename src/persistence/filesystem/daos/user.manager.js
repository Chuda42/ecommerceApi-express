/* imports */
import fs from 'fs';

import UserModel from '../models/user.model.js'
import UserDto from '../../../dtos/user.dto.js'

export default class UserManager{

  #path = './data/users.json';

  constructor(){
  }

  async #dontExist() {
    if (!fs.existsSync(this.#path)) {
      await fs.promises.writeFile(this.#path, JSON.stringify({
        users: []
      }));
    }
  }

  async #save(users) {
    try {
      await fs.promises.writeFile(this.#path, JSON.stringify({
        users: users
      }));
    } catch (error) {
      console.log(error.message);
    }
  }

  async #getObject() {
    try {
      const content = await fs.promises.readFile(this.#path);
      return JSON.parse(content);
    } catch (error) {
      console.log(error.message);
    }
  }

  async getUsers(){
    try {
      const obj = await this.#getObject();
      const users = obj.users;

      const usersDtos = users.map(user => new UserDto(user));
      return usersDtos;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async addUser(user){
    try {
      await this.#dontExist();
      const obj = await this.#getObject();
      let users = obj.users;

      for (const userObj of users) {
        if (userObj.email === user.email) {
          throw new Error(`User with email ${user.email} already exists`);
        }
      }

      const newUser = new UserModel(user);
      users.push(newUser);

      await this.#save(users);

      const userDto = new UserDto(newUser);
      return userDto;
    } catch (error) {
      throw error;
    }
  } 

  async getUserByEmail(email){
    try {
      const obj = await this.#getObject();
      const users = obj.users;

      for (const user of users) {
        if (user.email === email) {
          const userDto = new UserDto(user);
          return userDto;
        }
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

}