import { logger } from '../logger.js';
import nodemailer from 'nodemailer';
import Config from '../config/config.js';

export default class MailService{
  constructor(){
    this.transport = nodemailer.createTransport({
      service: Config.MAIL_SERVICE,
      port: Config.MAIL_PORT,
      auth: {
        user: Config.MAIL_USER,
        pass: Config.MAIL_PASS
      }
    }); 
  }

  async sendMail(to, subject, body){
    try {
      let info = await this.transport.sendMail({
        from: Config.MAIL_SERVICE,
        to: to,
        subject: subject,
        html: body
      });
      logger.info(`[MAIL SERVICE] ${info.messageId}`);
    } catch (error) {
      logger.error(`[MAIL SERVICE] ${error.message}`);
    }
  }
}