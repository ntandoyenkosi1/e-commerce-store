const mongoose = require("mongoose");
const Cart = mongoose.model("Cart", {
  user: {
    type: [{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    required: false,
    minlength: 1,
  },
  product: {
    type: [{type:mongoose.Schema.Types.ObjectId, ref:'Product'}],
    required: true,
    minlength: 1,
  },
  quantity: {
    type: Number,
    required: true,
    minlength: 1,
  },
  price: {
    type: Number,
    required: true,
    minlength: 1,
  }
});
module.exports = Cart;