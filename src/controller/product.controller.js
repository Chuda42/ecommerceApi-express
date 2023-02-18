/* import  */
const ProductService = require('../service/product.service.js');

class ProductController{
  constructor(){
    this.productService = new ProductService();
  }

  async getProducts(req, res){
    return res.json("funca");
  }

}

module.exports = ProductController;