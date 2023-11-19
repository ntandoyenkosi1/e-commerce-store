const mongoose = require("../config");

const User = mongoose.model("User", {
	name: {
		type: String,
		required: true,

	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	roles: {
		type: Array,
		required: true,
		default: ["client"]
	}
});
module.exports = User;
