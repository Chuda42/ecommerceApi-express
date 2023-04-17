/* imports */
import MongooseDao from './mongoose.dao.js'
import MessageSchema from '../models/message.schema.js'

import MessageDto from '../../../dtos/message.dto.js';

/* const */
const collection = 'messages';
const schema = MessageSchema;

export default class MessageDao extends MongooseDao {
  constructor(){
    super(collection, schema)
  }

  async getMessages(){
    try {

      let messages = await this.getObjects();
      messages = messages.map(message => new MessageDto(message));
      return messages;

    } catch (error) {
      throw error;
    }    
  }

  async addMessage(message){
    try {
      let newMessage = this.parseMessageDto(message);
      newMessage = await this.saveObject(newMessage);
      newMessage = new MessageDto(newMessage);
      return newMessage;

    }catch (error) {
      throw error;
    }
  }

  parseMessageDto(message) {
    return {
      user: message.user,
      message: message.message
    }
  }

}