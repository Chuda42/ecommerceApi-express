/* imports */
import fs from 'fs';

import TicketModel from '../models/ticket.model.js'
import TicketDto from '../../../dtos/ticket.dto.js'

export default class TicketManager{

  #path = './data/tickets.json';

  constructor(){
  }

  async #dontExist() {
    if (!fs.existsSync(this.#path)) {
      await fs.promises.writeFile(this.#path, JSON.stringify({
        tickets: []
      }));
    }
  }

  async #save(tickets) {
    try {
      await fs.promises.writeFile(this.#path, JSON.stringify({
        tickets: tickets
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

  async getTickets(){
    try {
      const obj = await this.#getObject();
      const tickets = obj.tickets;

      const ticketsDtos = tickets.map(ticket => new TicketDto(ticket));
      return ticketsDtos;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async addTicket(ticket){
    try {
      await this.#dontExist();
      const obj = await this.#getObject();
      let tickets = obj.tickets;

      for (const ticketObj of tickets) {
        if (ticketObj.id === ticket.id) {
          throw new Error('Ticket already exists');
        }
      }

      const newTicket = new TicketModel(ticket);
      tickets.push(newTicket);
      await this.#save(tickets);
      return newTicket;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}