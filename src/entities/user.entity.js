export default class UserEntity {
  constructor({id, first_name, last_name, email, age, cart, role}) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.age = age;
    this.cart = cart;
    this.role = role;
  }
}