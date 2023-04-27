import { v4 as uuidv4 } from 'uuid';

export default class UserModel {
  constructor({first_name, last_name, email, age, password, cart, role}) {
    this._id = uuidv4();
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.age = age;
    this.password = password;
    this.cart = cart.toString();
    this.role = role;
  }
}