const mongoose = require("mongoose");

const Sale = mongoose.model("Sale", {
	productId: {
		type: String,
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
	userId: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
	},
});
module.exports = Sale;
