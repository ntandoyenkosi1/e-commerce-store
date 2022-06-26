const User = require("../models/user");

const findAllUsers = (req, res) => {
	User.find()
		.then((users) => {
			res.send(users);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving users.",
			});
		});
};

const findUserById = (req, res) => {
	User.findById(req.params.userId)
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: "User not found with id " + req.params.userId,
				});
			}
			res.send(user);
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "User not found with id " + req.params.userId,
				});
			}
			return res.status(500).send({
				message: "Error retrieving user with id " + req.params.userId,
			});
		});
};

const createUser = (req, res) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});
	user.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the User.",
			});
		});
};

const updateUser = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: "User content can not be empty",
		});
	}
	User.findByIdAndUpdate(
		req.params.userId,
		{
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		},
		{ new: true }
	)
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: "User not found with id " + req.params.userId,
				});
			}
			res.send(user);
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "User not found with id " + req.params.userId,
				});
			}
			return res.status(500).send({
				message: "Error updating user with id " + req.params.userId,
			});
		});
};

const deleteUser = (req, res) => {
	User.findByIdAndRemove(req.params.userId)
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: "User not found with id " + req.params.userId,
				});
			}
			res.send({ message: "User deleted successfully!" });
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({
					message: "User not found with id " + req.params.userId,
				});
			}
			return res.status(500).send({
				message: "Could not delete user with id " + req.params.userId,
			});
		});
};
module.exports = {
	findAllUsers,
	findUserById,
	createUser,
	updateUser,
	deleteUser,
};
