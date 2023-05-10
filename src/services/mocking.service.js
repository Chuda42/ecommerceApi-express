import Utils from '../utils.js';

export default class MockingService{

  getProducts(){
    let products = []

    for (let i = 0; i < 101; i++) {
      products.push(Utils.generateProduct())
    }

    return products;
  }
}