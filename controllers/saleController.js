const sale = require("../models/sale");

const getAllSales = (req, res) => {
	sale.find().populate("userId").populate("productId")
		.then((sales) => {
			res.send(sales);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving sales.",
			});
		});
};

const getSalesByUserId = (req, res) => {
	sale.find({ userId: req.params.userId })
		.populate("productId")
		.then((sales) => {
			if (!sales) {
				return res.status(404).send({
					message: "Sales not found for user " + req.params.userId,
				});
			}
			res.send(sales);
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "Sales not found with id " + req.params.userId,
				});
			}
			return res.status(500).send({
				message:
					"Error retrieving sales for the user " + req.params.userId,
			});
		});
};
const createSale = (req, res) => {
	const Sale = new sale({
		userId: req.body.userId,
		productId: req.body.productId,
		quantity: req.body.quantity,
		price: req.body.price,
	});
	Sale.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the Sale.",
			});
		});
};
const updateSale = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: "Sale content can not be empty",
		});
	}
	sale.findByIdAndUpdate(
		req.params.saleId,
		{
			userId: req.body.userId,
			productId: req.body.productId,
			quantity: req.body.quantity,
			price: req.body.price,
			date: req.body.date,
		},
		{ new: true }
	)
		.then((sale) => {
			if (!sale) {
				return res.status(404).send({
					message: "Sale not found with id " + req.params.saleId,
				});
			}
			res.send(sale);
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "Sale not found with id " + req.params.saleId,
				});
			}
			return res.status(500).send({
				message: "Error updating sale with id " + req.params.saleId,
			});
		});
};
const deleteSale = (req, res) => {
	sale.findByIdAndRemove(req.params.saleId)
		.then((sale) => {
			if (!sale) {
				return res.status(404).send({
					message: "Sale not found with id " + req.params.saleId,
				});
			}
			res.send({ message: "Sale deleted successfully!" });
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({
					message: "Sale not found with id " + req.params.saleId,
				});
			}
			return res.status(500).send({
				message: "Could not delete sale with id " + req.params.saleId,
			});
		});
};
module.exports = {
	getAllSales,
	getSalesByUserId,
	createSale,
	updateSale,
	deleteSale,
};
