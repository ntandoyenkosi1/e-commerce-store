const Payment = require("../models/payment");

const getAllPayments = async (req, res) => {
    const payments = await Payment.find();
    res.json(payments);
}

const getPaymentById = async (req, res) => {
    const payment = await Payment.findById(req.params.paymentId);
    res.json(payment);
}
const updatePaymentStatus = async (req, res) => {
    const payment = await Payment.findByIdAndUpdate(req.params.paymentId, {
        complete: true
    }, {
        new: true
    });
    res.json(payment);
}
const createPayment = async (req, res) => {
    const payment = await Payment.create(req.body);
    res.json(payment);
}
module.exports = {
    getAllPayments,
    getPaymentById,
    updatePaymentStatus,
    createPayment
}