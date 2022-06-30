const sale = require("../models/sale");

const getAllSales = (req, res) => {
	sale.find()
		.populate("userId")
		.populate("productId")
		.then((sales) => {
			res.send({ ok: true, data: sales });
		})
		.catch((err) => {
			res.status(500).send({
				ok: false,
				error: err,
			});
		});
};

const getSalesByUserId = (req, res) => {
	sale.find({ userId: req.params.userId })
		.populate("productId")
		.then((sales) => {
			if (!sales) {
				return res
					.status(404)
					.send({
						ok: false,
						error: "Sales not found for user " + req.params.userId,
					});
			}
			res.send({ ok: true, data: sales });
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res
					.status(404)
					.send({
						ok: false,
						error: "Sales not found with id " + req.params.userId,
					});
			}
			return res
				.status(500)
				.send({
					ok: false,
					message:
						"Error retrieving sales for the user " +
						req.params.userId,
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
			res.send({ ok: true, data: data });
		})
		.catch((err) => {
			res.status(500).send({
				ok: false,
				error: err,
			});
		});
};
const updateSale = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			error: "Sale content can not be empty",
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
				return res
					.status(404)
					.send({
						ok: false,
						message: "Sale not found with id " + req.params.saleId,
					});
			}
			res.send({ ok: true, data: sale });
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res
					.status(404)
					.send({
						ok: false,
						error: "Sale not found with id " + req.params.saleId,
					});
			}
			return res
				.status(500)
				.send({
					ok: false,
					error: "Error updating sale with id " + req.params.saleId,
				});
		});
};
const deleteSale = (req, res) => {
	sale.findByIdAndRemove(req.params.saleId)
		.then((sale) => {
			if (!sale) {
				return res
					.status(404)
					.send({
						ok: false,
						error: "Sale not found with id " + req.params.saleId,
					});
			}
			res.send({ ok: true, data: "Sale deleted successfully!" });
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res
					.status(404)
					.send({
						ok: false,
						error: "Sale not found with id " + req.params.saleId,
					});
			}
			return res
				.status(500)
				.send({
					ok: false,
					error: "Could not delete sale with id " + req.params.saleId,
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
