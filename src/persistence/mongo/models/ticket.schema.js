/* imports */
import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    max: 100,
  },

  purchase_datetime: {
    type: Date,
    default: Date.now
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