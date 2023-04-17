/* imports */
import ChatRepository from ''

/* const */
const chatRepository = new ChatRepository();

/**
 * class ChatService
 */
export default class ChatService{
  constructor(){
  }

  async getMessages(){
    try {

      let messages = chatRepository.getMessages();
      return messages;

    } catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }    
  }

  async addMessage(message){
    try {

      let newMessage = await chatRepository.addMessage(message);
      return newMessage;

    }catch (error) {
      console.log(`[ERROR SERVICE] ${error.message}`);
      throw error;
    }
  }
}