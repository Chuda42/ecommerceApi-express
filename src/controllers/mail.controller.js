/* imports */
import MailService from '../services/mail.service.js';

/* user service */
const mailService = new MailService();

export default class MailController{
  constructor(){
    //setting context to this
    Object.getOwnPropertyNames(MailController.prototype).forEach((key) => {
      if (key !== 'constructor' && key !== 'MailService') {
        this[key] = this[key].bind(this);
      }
    });
  }

  async sendMail(req, res){
    try{
      const { to, subject, body } = req.body;
      const mail = await mailService.sendMail(to, subject, body);
      res.status(201).json({ status: 'success', payload: 'Mail sent' });

    }catch (error){
      req.logger.error(`[ERROR CONTROLLER] ${error.message}`);
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

}