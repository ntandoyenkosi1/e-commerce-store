const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const router = require("./routes/index");
const cors = require("cors")
var PORT = 3001;
process.env.NODE_ENV === "test" ? PORT = 3002 : process.env.PORT || 3001
require("dotenv").config();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
app.use(router);
// if (process.env.NODE_ENV === "test") {
// 	PORT = 3002
// }
const server=app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
module.exports = server;