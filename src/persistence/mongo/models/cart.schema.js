/* imports */
import mongoose from 'mongoose';

const productCollection = 'products';

const CartSchema = new mongoose.Schema({
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: productCollection
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

//cartSchema.pre("")

export default CartSchema;