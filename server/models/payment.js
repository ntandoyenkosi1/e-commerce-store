const mongoose = require("../config");
const Payment = mongoose.model("Payment", {
	method: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	complete: {
		type: Boolean,
		required: true,
	},
});
module.exports = Payment;
