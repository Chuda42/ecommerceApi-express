import { v4 as uuidv4 } from 'uuid';

export default class CartModel {
  constructor({products}) {
    this._id = uuidv4();
    this.products = products;
  }
}