/* imports */
import FactoryDaos from '../persistence/factory.js'
import Config from '../config/config.js'
import MessageDto from '../dtos/message.dto.js'
import Message from '../entities/message.entity.js'


export default class ChatRepository {
    constructor() {
        this.dao = FactoryDaos.getMessageDao(Config.PERSISTENCE);
    }

    async getMessages() {
        try {
          let messages = await this.dao.getMessages();
          messages = messages.map(message => new Message(message));
          return messages;
        } catch (error) {
          console.log(`[ERROR REPOSITORY] ${error.message}`);
          throw error;
        }
    }

    async addMessage(message) {
        try {
          let newMessage = new MessageDto(message);
          newMessage = await this.dao.addMessage(newMessage);
          newMessage = new Message(newMessage);
          return newMessage;
        } catch (error) {
            console.log(`[ERROR REPOSITORY] ${error.message}`);
            throw error;
        }
    }
}

