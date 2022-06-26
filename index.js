const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const router=require("./routes/index");
require("dotenv").config()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.log("Error:", err.message);
});

// use router
//const router = require('./routes');
app.use(router);

app.listen(3000, () => {
    console.log('Server running on port 3000');
})
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
}
);
mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
})