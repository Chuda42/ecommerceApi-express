/* imports */
import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    max: 100,
  },

  purchase_datetime: {
    type: date,
    required: true,
    max: 255,
  },

  amount: {
    type: Number,
    required: true,
  },

  purchaser : {
    type: String,
    required: true,
  }
});

export default TicketSchema;