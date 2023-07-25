import Stripe from 'stripe';
import Config from '../config/config.js'

export default class PaymentService {
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async createPaymentIntent(paymentInfo) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create(paymentInfo);
      return paymentIntent;
    } catch (error) {
      throw error;
    }
  }
}