export default class CartDto {
  constructor({_id, products}) {
    this.id = _id;
    this.products = products;
  }
}