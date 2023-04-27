/* imports */
import mongoose from 'mongoose';

import MongooseDao from './mongoose.dao.js'
import UserSchema from '../models/user.schema.js'
import UserDto from '../../../dtos/user.dto.js'

/* const */
const collection = 'users';
const schema = UserSchema;

export default class UserDao extends MongooseDao {
  
  constructor(){
    super(collection, schema)
  }

  async getUserByEmail(email){
    try {
      const filter = {email: email}
      let user = await this.getObject(filter);

      if (user === null) {
        throw new Error(`User with email ${email} not found`);
      }

      user = new UserDto(user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(uid){
    try {
        
      let user = await this.getObjectById(uid);

      if (user === null) {
        throw new Error(`User with id ${uid} not found`);
      }

      user = new UserDto(user);
      return user;
    }catch (error) {
      throw error;
    }
  }

  async getUsers(){
    try {
      let users = await this.getObjects();

      users = users.map(user => {
        return new UserDto(user)
      })

      return users;
    } catch (error) {
      throw error;
    }
  }

  async addUser({first_name, last_name, email, age, password, cart, role}){
    try {
      let user = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        age: age,
        password: password,
        cart: mongoose.Types.ObjectId(cart),
        role: role
      }
      let newUser = await this.saveObject(user);
      newUser = new UserDto(newUser);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

}