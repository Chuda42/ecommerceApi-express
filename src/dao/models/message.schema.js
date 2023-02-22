/* imports */
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    max: 100,
  },

  message: {
    type: String,
    required: true,
    max: 255,
  }
});

export default MessageSchema;
