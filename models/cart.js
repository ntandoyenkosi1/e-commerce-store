const mongoose = require("mongoose");
const Cart = mongoose.model("Cart", {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    minlength: 1,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
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