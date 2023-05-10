/* imports */
import MockingService from '../services/mocking.service.js';

/* mocking service */
const mockingService = new MockingService();

export default class MockingController{
  constructor(){
    //setting context to this
    Object.getOwnPropertyNames(MockingController.prototype).forEach((key) => {
      if (key !== 'constructor' && key !== 'MockingService') {
        this[key] = this[key].bind(this);
      }
    });
  }

  getProducts(req, res){
    try {
      //building response
      const response = {
        status: 'success',
        payload: mockingService.getProducts()
      }

      res.status(200).json(response);
      
    } catch (error) {
      console.log(`[ERROR] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

}