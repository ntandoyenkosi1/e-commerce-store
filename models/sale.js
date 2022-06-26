const mongoose = require("mongoose")

const Sale = mongoose.model("Sale", {
    productId: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        minlength: 1
    },
    date: {
        type: Date,
        required: true,
        minlength: 1,
        trim: true,
        default: Date.now
    },
    userId: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
}
)
module.exports = Sale
