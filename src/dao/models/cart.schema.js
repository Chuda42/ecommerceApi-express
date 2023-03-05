/* imports */
import mongoose from 'mongoose';

import Utils from '../../utils.js';

const CartSchema = new mongoose.Schema({
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Utils.DB_COLLECTION_PRODUCTS
    },
    quantity: {
      type: Number,
      min: 0
    }
  }]
  
});

CartSchema.pre("findOne",  function(){
  this.populate("products.product");
});

export default CartSchema;