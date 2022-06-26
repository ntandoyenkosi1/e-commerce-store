const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const router = require("./routes/index");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.log("Error:", err.message);
	});
app.use(router);
app.listen(3000, () => {
	console.log("Server running on port 3000");
});
