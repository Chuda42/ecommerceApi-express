export default class UserDto {
  constructor({_id, first_name, last_name, email, age, password, cart, role, documents, last_connection, addressProof, identityProof, accountStatamentProof}) {
    this.id = _id?_id.toString():'';
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.age = age;
    this.password = password;
    this.cart = cart.toString();
    this.role = role;
    this.documents = documents;
    this.last_connection = last_connection;
    this.addressProof = addressProof;
    this.identityProof = identityProof;
    this.accountStatamentProof = accountStatamentProof;
  }
}