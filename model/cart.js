const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: String,
  items:[{
    count:Number,
    item:{
      type:Schema.ObjectId,
      ref:'Item'
    }
  }]
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;



