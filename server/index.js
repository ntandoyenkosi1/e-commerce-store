const express = require("express");

const app = express();
const router = require("./routes/index");
const path = require("path");
var PORT = process.env.PORT || 3001;
//process.env.NODE_ENV === "test" ? (PORT = 3002) : process.env.PORT || 3001;
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
