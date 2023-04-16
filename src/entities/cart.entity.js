export default class CartEntity {
  constructor(cart) {
    this.id = cart.id;
    this.products = cart.products;
  }
}