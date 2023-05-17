/* imports */
import SmsService from '../services/sms.service.js';

/* user service */
const smsService = new SmsService();

export default class SmsController{
  constructor(){
    //setting context to this
    Object.getOwnPropertyNames(SmsController.prototype).forEach((key) => {
      if (key !== 'constructor' && key !== 'SmsService') {
        this[key] = this[key].bind(this);
      }
    });
  }

  async sendSms(req, res){
    try{
      const { to, body } = req.body;
      const sms = await smsService.sendSms(to, body);
      res.status(201).json({ status: 'success', payload: 'Message sent' });

    }catch (error){
      req.logger.error(`[ERROR] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

}