import { v4 as uuidv4 } from 'uuid';

export default class MessageModel {
  constructor({user, message}) {
    this._id = uuidv4();
    this.user = user;
    this.message = message;
  }
}