const product = require("../models/product");

const getAllProducts = (req, res) => {
	product
		.find()
		.populate("category")
		.then((products) => {
			res.send({ ok: true, data: products });
		})
		.catch((err) => {
			res.status(500).send({
				ok: false,
				error: err,
			});
		});
};

const getProductById = (req, res) => {
	product
		.findById(req.params.productId)
		.populate("category")
		.then((product) => {
			if (!product) {
				return res
					.status(404)
					.send({
						ok: false,
						error:
							"Product not found with id " + req.params.productId,
					});
			}
			res.send({ ok: true, data: product });
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res
					.status(404)
					.send({
						ok: false,
						error:
							"Product not found with id " + req.params.productId,
					});
			}
			return res
				.status(500)
				.send({
					ok: false,
					error:
						"Error retrieving product with id " +
						req.params.productId,
				});
		});
};

const createProduct = (req, res) => {
	const Product = new product({
		name: req.body.name,
		price: req.body.price,
		description: req.body.description,
		image: req.body.image,
		category: req.body.category,
	});
	Product.save()
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

const updateProduct = (req, res) => {
	if (!req.body) {
		return res
			.status(400)
			.send({ ok: false, error: "Product content can not be empty" });
	}
	product
		.findByIdAndUpdate(
			req.params.productId,
			{
				name: req.body.name,
				price: req.body.price,
				description: req.body.description,
				image: req.body.image,
				category: req.body.category,
			},
			{ new: true }
		)
		.then((product) => {
			if (!product) {
				return res
					.status(404)
					.send({
						ok: false,
						error:
							"Product not found with id " + req.params.productId,
					});
			}
			res.send({ ok: true, data: product });
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res
					.status(404)
					.send({
						ok: false,
						error:
							"Product not found with id " + req.params.productId,
					});
			}
			return res
				.status(500)
				.send({
					ok: false,
					error:
						"Error updating product with id " +
						req.params.productId,
				});
		});
};

const deleteProduct = (req, res) => {
	product
		.findByIdAndRemove(req.params.productId)
		.then((product) => {
			if (!product) {
				return res
					.status(404)
					.send({
						ok: false,
						error:
							"Product not found with id " + req.params.productId,
					});
			}
			res.send({ ok: true, message: "Product deleted successfully!" });
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res
					.status(404)
					.send({
						ok: false,
						error:
							"Product not found with id " + req.params.productId,
					});
			}
			return res
				.status(500)
				.send({
					ok: false,
					error:
						"Could not delete product with id " +
						req.params.productId,
				});
		});
};
module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
