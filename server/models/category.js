const mongoose = require("../config");
const Category = mongoose.model("Category", {
	name: {
		type: String,
		required: true,
		minlength: 1,
	},
});
module.exports = Category;
