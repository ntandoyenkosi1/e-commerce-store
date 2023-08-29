const mongoose = require("mongoose");
const Shipping = mongoose.model("Shipping", {
	method: {
		type: String,
		required: [true, "Shipping method is required"],
	},
	address: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	town: {
		type: String,
		required: true,
	},
	code: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	complete: {
		type: Boolean,
		default: false,
	},
	user: {
		type: [{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
		required: true,
	},
	sale: {
		type: [{type:mongoose.Schema.Types.ObjectId, ref:'Sale'}],
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: String,
		default: "pending",
	},
});
module.exports = Shipping;
