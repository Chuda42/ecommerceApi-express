export default class UserDto {
  constructor({_id, first_name, last_name, email, age, password, cart, role}) {
    this.id = _id?_id.toString():'';
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.age = age;
    this.password = password;
    this.cart = cart.toString();
    this.role = role;
  }
}