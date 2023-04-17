/* imports */
import FactoryDaos from '../persistence/factory.js'
import Config from '../config/config.js'
import MessageDto from '../dtos/message.dto.js'


export default class ChatRepository {
    constructor() {
        this.dao = FactoryDaos.getMessageDao(Config.PERSISTENCE);
    }

    async getMessages() {
        try {
          let messages = await this.dao.getMessages();
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
          return newMessage;
        } catch (error) {
            console.log(`[ERROR REPOSITORY] ${error.message}`);
            throw error;
        }
    }
}

