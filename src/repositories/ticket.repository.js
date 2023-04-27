/* imports */
import FactoryDaos from '../persistence/factory.js'
import Config from '../config/config.js'
import TicketDto from '../dtos/user.dto.js'
import Ticket from '../entities/user.entity.js'

import Utils from '../utils.js'

export default class TicketRepository {

  constructor(){
    this.dao = FactoryDaos.getTicketDao(Config.PERSISTENCE);
  }

  async getTickets(){
    try {
      let tickets = await this.dao.getTickets();
      return tickets;
    } catch (error) {
      throw error;
    }
  }

  async addTicket(ticket){
    try {
      const ticketDto = new TicketDto(ticket);
      let newTicket = await this.dao.addTicket(ticketDto);
      newTicket = new Ticket(newTicket);
      return newTicket;
    } catch (error) {
      throw error;
    }
  }

}