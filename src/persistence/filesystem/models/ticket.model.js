import { v4 as uuidv4 } from 'uuid';

export default class TicketModel {
  constructor({code, amount, purchaser}) {
    this._id = uuidv4();
    this.code = code;
    this.purchase_datetime = new Date();
    this.amount = amount;
    this.purchaser = purchaser;
  }
}