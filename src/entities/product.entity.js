export default class ProductDto {
  constructor({id, title, description, price, stock, code, thumbnails, category, status}) {
    this.id = id;
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