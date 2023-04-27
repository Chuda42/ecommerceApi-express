/* imports */
import fs from 'fs';

import MessageModel from '../models/message.model.js'
import MessageDto from '../../../dtos/message.dto.js'

export default class MessageManager{

  #path = './data/messages.json';

  constructor(){
  }
  
  async #dontExist() {
    if (!fs.existsSync(this.#path)) {
      await fs.promises.writeFile(this.#path, JSON.stringify({
        messages: []
      }));
    }
  }

  async #save(messages) {
    try {
      await fs.promises.writeFile(this.#path, JSON.stringify({
        messages: messages
      }));
    } catch (error) {
      console.log(error.message);
    }
  }

  async #getObject() {
    try {
      const content = await fs.promises.readFile(this.#path);
      return JSON.parse(content);
    } catch (error) {
      console.log(error.message);
    }
  }

  async getMessages() {
    await this.#dontExist();
    let { messages } = await this.#getObject();
    messages = messages.map(message => new MessageDto(message));
    return messages;
  }

  async addMessage(message) {
    await this.#dontExist();
    let { messages } = await this.#getObject();
    const newMessage = new MessageModel(message);
    messages.push(newMessage);
    await this.#save(messages);
    return newMessage;
  }

}