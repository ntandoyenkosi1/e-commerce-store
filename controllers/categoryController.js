const Category = require("../models/category");
const getAllCategories = (req, res) => {
	Category.find({}, (err, categories) => {
		if (err) {
			res.send({ ok: false, error: err });
		}
		res.json({ ok: true, data: categories });
	}).sort({ name: 1 });
};

const getCategoryById = (req, res) => {
	Category.findById(req.params.categoryId, (err, category) => {
		if (err) {
			res.send({ ok: false, error: err });
		}
		res.json({ ok: true, data:category });
	});
};

const createCategory = (req, res) => {
	const category = new Category({
		name: req.body.name,
	});
	category.save((err, category) => {
		if (err) {
			res.send({ ok: false, error: err });
		}
		res.json({ ok: true, data: category });
	});
};
const updateCategory = (req, res) => {
	Category.findByIdAndUpdate(
		req.params.categoryId,
		{
			name: req.body.name,
		},
		(err, category) => {
			if (err) {
				res.send({ ok: false, error: err });
			}
			res.json({ ok: true, data: category });
		}
	);
};
const deleteCategory = (req, res) => {
	Category.findByIdAndRemove(req.params.categoryId, (err, category) => {
		if (err) {
			res.send({ ok: false, error: err });
		}
		res.json({ ok: true, data: category });
	});
};
module.exports = {
	getAllCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
};
