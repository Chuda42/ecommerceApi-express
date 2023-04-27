import { v4 as uuidv4 } from 'uuid';

export default class ProductModel {
  constructor({title, description, price, stock, code, thumbnails, category, status}) {
    this._id = uuidv4();
    this.title = title;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.code = code;
    this.thumbnails = thumbnails;
    this.category = category;
    this.status = status;
  }
}