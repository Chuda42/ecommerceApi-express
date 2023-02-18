class ProductService{
  //constructor(){}

  async getProducts(){
    return [{title: 'product1', price:8}, {title: 'product2', price:81}]
  }  
}

module.exports = ProductService;