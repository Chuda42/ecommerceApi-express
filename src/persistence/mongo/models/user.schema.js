/* imports */
import mongoose from 'mongoose';

/* const */
const cartCollection = 'carts';

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
    ref: cartCollection
  },

  role:{
    type: String,
    default: 'user'
  },

  documents:{
    type:[{
      name: String,
      reference: String
    }],
    default: []
  },

  addressProof:{
    type: Boolean,
    default: false
  },

  identityProof:{
    type: Boolean,
    default: false
  },

  accountStatamentProof:{
    type: Boolean,
    default: false
  },

  last_connection:{
    type: Date,
  }

});

export default UserSchema;