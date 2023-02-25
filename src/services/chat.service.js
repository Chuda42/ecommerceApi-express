/**
 * class ChatService
 */
export default class ChatService{
  constructor(messagesPersistence){
    this.messagesPersistence = messagesPersistence;
  }

  async getMessages(){
    try {

      let messages = this.messagesPersistence.getMessages();
      return messages;

    } catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }    
  }

  async addMessage(message){
    try {

      let newMessage = await this.messagesPersistence.addMessage(message);
      return newMessage;

    }catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }
}