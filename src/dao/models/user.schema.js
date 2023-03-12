/* imports */
import mongoose from 'mongoose';

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
    required: true,
    max: 100
  },
  
});

export default UserSchema;