const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const router = require("./routes/index");
const cors = require("cors");
const path = require("path");
var PORT = process.env.PORT || 3001;
//process.env.NODE_ENV === "test" ? (PORT = 3002) : process.env.PORT || 3001;
require("dotenv").config();
console.log(process.env.MONGODB_URI);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/e-commerce-db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use(router);
// if (process.env.NODE_ENV === "test") {
// 	PORT = 3002
// }
//if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "../client/build")));
//app.use(express.static(path.join(__dirname, "client/build")));
//}
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = server;
