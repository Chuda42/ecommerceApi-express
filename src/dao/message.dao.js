export default class MessageDao{
  constructor(persistenceController){
    this.persistenceController = persistenceController;
  }

  async getMessages(){
    try {

      let messages = this.persistenceController.getObjects();
      return messages;

    } catch (error) {
      throw error;
    }    
  }

  async addMessage(message){
    try {

      let newMessage = await this.persistenceController.saveObject(message);
      return newMessage;

    }catch (error) {
      throw error;
    }
  }
}