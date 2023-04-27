/* imports */
import Utils from '../utils.js'
import TicketRepository from '../repositories/ticket.repository.js';

import Config from '../config/config.js';

export default class TicketService{
  constructor(){
    this.repository = new TicketRepository();
  }

  async getTickets(){
    try {
      let tickets = await this.repository.getTickets();
      return tickets;
    } catch (error) {
      throw error;
    }
  }

  async addTicket({emailUser, amount}){
    try {

      const ticket = {
        code: Utils.generateCode(),
        purchase_datetime: new Date(),
        amount: amount,
        purchaser: emailUser
      }

      let newTicket = await this.repository.addTicket(ticket);
      return newTicket;
    } catch (error) {
      throw error;
    }
  }

}