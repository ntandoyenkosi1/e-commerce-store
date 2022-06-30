const Payment = require("../models/payment");

const getAllPayments = async (req, res) => {
	const payments = await Payment.find({}, (err, payments) => {
		if (err) {
			res.send({ ok: false, error: err });
		}
		res.json({ ok: true, data: payments });
	});
};

const getPaymentById = async (req, res) => {
	const payment = await Payment.findById(
		req.params.paymentId,
		(err, payment) => {
			if (err) {
				res.send({ ok: false, error: err });
			}
			res.json({ ok: true, data: payment });
		}
	);
};
const updatePaymentStatus = async (req, res) => {
	const payment = await Payment.findByIdAndUpdate(
		req.params.paymentId,
		{
			complete: true,
		},
		{
			new: true,
		},
		(err, payment) => {
			if (err) {
				res.send({ ok: false, error: err });
			}
			res.json({ ok: true, data: payment });
		}
	);
};
const createPayment = async (req, res) => {
	const payment = await Payment.create(req.body, (err, payment) => {
		if (err) {
			res.send({ ok: false, error: err });
		}
		res.json({ ok: true, data: payment });
	});
};
module.exports = {
	getAllPayments,
	getPaymentById,
	updatePaymentStatus,
	createPayment,
};
