import { Router } from 'express';
import httpLogMiddleware from '../middlewares/httpLog.middleware.js';
import PaymentController from '../controllers/payment.controller.js';

const paymentController = new PaymentController();

const paymentRouter = Router();


paymentRouter.route('/payment')
              .post(httpLogMiddleware, paymentController.createPaymentIntent)
