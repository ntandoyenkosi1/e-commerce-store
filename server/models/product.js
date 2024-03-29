const mongoose = require("../config");
const Product = mongoose.model("Product", {
	name: {
		type: String,
		required: true,
		minlength: 1,
	},
	price: {
		type: Number,
		required: true,
		minlength: 1,
	},
	description: {
		type: String,
		required: true,
		minlength: 1,
	},
	image: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
	},
	category: {
		type: [{type:mongoose.Schema.Types.ObjectId, ref:'Category'}],
		required: true,
		minlength: 1,
	},
});
module.exports = Product;
