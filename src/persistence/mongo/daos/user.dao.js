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

  async updateUserPassword(email, password){
    try {
      const filter = {email: email}
      const update = {password: password}
      const user = await this.updateObjectByFilter(filter, update);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async upgradeToPremium(uid){
    try {
      const filter = {_id: uid}
      const usr = await this.getUserById(uid);
      if(usr.identityProof === undefined || usr.addressProof === undefined || usr.accountStatamentProof === undefined){
        await this.updateObjectByFilter(filter, {accountStatamentProof: false, identityProof: false, addressProof: false})
      }

      if(usr.identityProof === false || usr.addressProof === false || usr.accountStatamentProof === false){
        throw new Error("You must upload all the documents to upgrade to premium");
      }

      const update = {role: 'premium'}
      const user = await this.updateObjectByFilter(filter, update);
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

  async downgradeToUser(uid){
    try {
      const filter = {_id: uid}
      const update = {role: 'user'}
      const user = await this.updateObjectByFilter(filter, update);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateLastConnection(email){
    try {
      const filter = {email: email}
      const update = {last_connection: Date.now()}
      const user = await this.updateObjectByFilter(filter, update);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async uploadDocuments(uid, documents, addressProof=false, identityProof=false, accountStatementProof=false){
    try {
      const filter = {_id: uid}

      if (addressProof){
        const update = {addressProof: true}
        await this.updateObjectByFilter(filter, update);
      }

      if (identityProof){
        const update = {identityProof: true}
        await this.updateObjectByFilter(filter, update);
      }

      if (accountStatementProof){
        const update = {accountStatamentProof: true}
        await this.updateObjectByFilter(filter, update);
      }

      const update =  { $push: { documents: { $each: documents } } }
      const user = await this.updateObjectByFilter(filter, update);
      return user;
    } catch (error) {
      throw error;
    }
  }

}