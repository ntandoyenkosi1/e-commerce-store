const mongoose = require("mongoose");
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/e-commerce-db",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  ).then(()=>{
    console.log("Connected to db")
  });

module.exports=mongoose