/**
 * class ViewController
 */
export default class ViewController{

  constructor(productService){
    this.productService = productService;

    Object.getOwnPropertyNames(ViewController.prototype).forEach((key) => {
      if (key !== 'constructor' && key !== 'productService') {
        this[key] = this[key].bind(this);
      }
    });
  }  
  
  async getHome(req, res){
    const products = await this.productService.getProducts()

    res.render('home', {
      title: 'Home',
      products: products
    });
  }

  async getRealTimeProducts(req, res) {
    res.render('realTimeProducts', {
      title: 'Realtime Products'
    });
  }

  async getChat(req, res) {
    res.render('chat', {
      title: 'Chat'
    });
  }

}