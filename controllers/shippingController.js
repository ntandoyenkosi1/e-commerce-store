const Shipping = require("../models/shipping");

const getAllShipping = async (req, res) => {
	const shipping = await Shipping.find();
	res.json(shipping);
};
const getShippingById = async (req, res) => {
	const shipping = await Shipping.findById(req.params.shippingId);
	res.json(shipping);
};
const createShipping = (req, res) => {
	const shipping = new Shipping({
		method: req.body.method,
		address: req.body.address,
		city: req.body.city,
		town: req.body.town,
		code: req.body.code,
		country: req.body.country,
		phone: req.body.phone,
		complete: req.body.complete,
		user: req.body.user,
		sale: req.body.sale,
		date: req.body.date,
		status: req.body.status,
	});
	shipping
		.save()
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json({ message: err });
		});
};
const updateShippingStatus = async (req, res) => {
	const shipping = await Shipping.findByIdAndUpdate(
		req.params.shippingId,
		{
			complete: true,
		},
		{
			new: true,
		}
	);
	res.json(shipping);
};
const updateShipping = async (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: "Shipping content can not be empty",
		});
	}
	const shipping = await Shipping.findByIdAndUpdate(
		req.params.shippingId,
		{
			method: req.body.method,
			address: req.body.address,
			city: req.body.city,
			town: req.body.town,
			code: req.body.code,
			country: req.body.country,
			phone: req.body.phone,
			complete: req.body.complete,
			user: req.body.user,
			sale: req.body.sale,
			date: req.body.date,
			status: req.body.status,
		},
		{
			new: true,
		}
	);
	res.json(shipping);
};
const deleteShipping = async (req, res) => {
	await Shipping.findByIdAndRemove(req.params.shippingId);
	res.json({ message: "Shipping deleted" });
};
module.exports = {
	getAllShipping,
	getShippingById,
	createShipping,
	updateShippingStatus,
	deleteShipping,
	updateShipping,
};