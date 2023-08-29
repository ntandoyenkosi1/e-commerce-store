const mongoose = require("mongoose");
const Sale = mongoose.model("Sale", {
	product: {
		type: [{type:mongoose.Schema.Types.ObjectId, ref:'Product'}],
		required: [true, "Product ID is required"],
		minlength: 1,
		trim: true,
	},
	quantity: {
		type: Number,
		required: true,
		minlength: [1, "Quantity must be at least 1"],
		trim: true,
	},
	price: {
		type: Number,
		required: true,
		minlength: 1,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: [{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
		required: true,
		minlength: 1,
		trim: true,
	},
});
module.exports = Sale;
