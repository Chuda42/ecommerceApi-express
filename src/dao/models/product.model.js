/* imports */
const mongoose = require('mongoose');

/* collection */
const productCollection = 'products';

/* schema */
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  thumbnails: {
    type: [String],
    required: true,
    default: []
  },

  code: {
    type: String,
    required: true
  },

  stock: {
    type: Number,
    required: true,
    default: true
  },

  status: {
    type: Boolean,
    required: true
  },

  category: {
    type: String,
    required: true
  },
});

/* model */
const productModel = mongoose.model(productCollection, productSchema);

/* export */
module.exports = productModel;