/* imports */
import mongoose from 'mongoose';

import Utils from '../../utils.js';

const UserSchema = new mongoose.Schema({
  first_name:{
    type: String,
    required: true,
    max: 15
  },

  last_name:{
    type: String,
    required: true,
    max: 15
  },

  email:{
    type: String,
    unique: true,
    required: true,
    max: 25
  },

  age:{
    type: Number,
    required: true,
    min: 0
  },

  password:{
    type: String,
    max: 100
  },
  
  cart:{
    type: mongoose.Schema.Types.ObjectId,
    ref: Utils.DB_COLLECTION_CARTS
  },

  role:{
    type: String,
    default: 'user'
  }

});

export default UserSchema;