export default class CartDto {
  constructor({_id, products}) {
    this.id = _id? _id.toString() : '';
    this.products = products;
  }
}