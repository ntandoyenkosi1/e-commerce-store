const mongoose = require("mongoose")

const User = mongoose.model("User", {
    name: {
        type: String,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
        minlength: 4,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    }
})
module.exports = User