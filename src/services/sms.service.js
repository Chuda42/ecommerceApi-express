import twilio from 'twilio';
import Config from '../config/config.js';

export default class SmsService{
  constructor(){
    this.client = twilio(Config.SMS_SID, Config.SMS_TOKEN);
  }

  async sendSms(to, body){
    let result = await this.client.messages.create({
      body: body,
      from: Config.SMS_FROM,
      to: to
    });

  }
}