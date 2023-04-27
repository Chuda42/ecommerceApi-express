/* imports */
import MongooseDao from './mongoose.dao.js'
import TicketSchema from '../models/ticket.schema.js'
import TicketDto from '../../../dtos/ticket.dto.js'

/* const */
const collection = 'products';
const schema = TicketSchema;

export default class TicketDao extends MongooseDao{
  
  constructor(){
    super(collection, schema);
  }

  async getTickets(){
    try {
      let tickets = await this.getObjects();

      tickets = tickets.map(ticket => new TicketDto(ticket));
      return tickets;
    } catch (error) {
      throw error;
    }
  }

  async addTicket(ticket){
    try {
      const parsedTicket = this.parseDto(ticket);
      let newTicket = await this.saveObject(parsedTicket);
      newTicket = new TicketDto(newTicket);
      return newTicket;

    }catch (error) {
      throw error;
    }
  }

  parseDto(ticket){
    return {
      code: ticket.code,
      purchase_datetime: ticket.purchase_datetime,
      amount: ticket.amount,
      purchaser: ticket.purchaser
    }
  }

}