export default class ProductDto {
  constructor({_id, title, description, price, stock, code, status}) {
    this.id = _id;
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