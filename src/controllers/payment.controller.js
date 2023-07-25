/* imports */
import PaymentService from '../services/payment.service.js'
import ProductService from '../services/product.service.js'


/* services */
const paymentService = new PaymentService();
const productService = new ProductService();

/**
 * class PaymentController
 */
export default class PaymentController{
  constructor(){
    //setting context to this
    Object.getOwnPropertyNames(PaymentController.prototype).forEach((key) => {
      if (key !== 'constructor' && key !== 'productService') {
        this[key] = this[key].bind(this);
      }
    });
  }

  async createPaymentIntent(req, res){
    try {
      let productRequested = req.query.id
      productRequested = await productService.getProductById(productRequested);

      if(!productRequested){
        throw new Error('Product not found');
      }
      
      const paymentInfo = {
        amount: productRequested.price,
        currency: 'usd'
      }

      const paymentIntent = await paymentService.createPaymentIntent(paymentInfo);

      res.status(200).json({ status: 'success', payload: paymentIntent });
    } catch (error) {
      req.logger.error(`[ERROR CONTROLLER] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }

  }
}