/* imports */
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    max: 100
  },

  description:{
    type: String,
    required: true,
    max: 255
  },

  price:{
    type: Number,
    required: true,
    min: 0
  },

  stock:{
    type: Number,
    required: true,
    min: 0
  },

  code:{
    type: String,
    required: true,
    unique: true,
    max: 100
  },

  thumbnails:{
    type: [String],
    default: [],
  },

  category:{
    type: String,
    required: true,
    max: 100
  },

  status:{
    type: Boolean,
    default: true
  }
  
});

/* pagination */
ProductSchema.plugin(mongoosePaginate);

export default ProductSchema;