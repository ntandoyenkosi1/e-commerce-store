const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")
const User = require("../models/user");
require("dotenv").config()
const login = (req, res) => {
	User.find({ email: req.body.email })
		.then(async(user) => {
			const valid = await bcrypt.compare(req.body.password,user[0].password)
			if (!valid) {
				res.status(500).send({ok:false,
					error:
						"Some error occurred while comparing passwords.",
				});
				return
			}
			const token = jwt.sign({
				id: user[0]._id,
				email: user[0].email,
				name:user[0].name,
				roles:user[0].roles
			}, `${process.env.JWT_SECRET_KEY}`, { expiresIn: "30m", })
			res.status(200).send({
				ok: true,
				token: token,
				data: {
					id: user[0]._id,
					email: user[0].email,
					name:user[0].name,
					roles:user[0].roles
				}
			})
		})
}
const signUp = async (req, res) => {
	const salt = await bcrypt.genSalt(15);
	const password = await bcrypt.hash(req.body.password, salt)
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: password,
		roles:["client"]
	});
	user.save()
		.then((data) => {
			res.send({ ok: true, data: data });
		})
		.catch((err) => {
			res.status(500).send({ok:false,error:err});
		});
}
const findAllUsers = (req, res) => {
	User.find()
		.then((users) => {
			res.send({ ok: true, data: users });
		})
		.catch((err) => {
			res.status(500).send({ok:false,error:err});
		});
};

const findUserById = (req, res) => {
	User.findById(req.params.userId)
		.then((user) => {
			if (!user) {
				return res.status(404).send({ ok:false,
					message: "User not found with id " + req.params.userId,
				});
			}
			res.send({ ok: true, data: user });
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({ ok:false,
					message: "User not found with id " + req.params.userId,
				});
			}
			return res.status(500).send({ ok:false,
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
			res.send({ ok: true, data: data });
		})
		.catch((err) => {
			res.status(500).send({ok:false,
				error:err,
			});
		});
};

const updateUser = (req, res) => {
	if (!req.body) {
		return res.status(400).send({ok:false,
			message: "User content can not be empty",
		});
	}
	User.findByIdAndUpdate(
		req.params.userId,
		{
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			roles:req.body.roles
		},
		{ new: true }
	)
		.then((user) => {
			if (!user) {
				return res.status(404).send({ ok:false,
					message: "User not found with id " + req.params.userId,
				});
			}
			res.send({ ok: true, data: user });
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({ ok:false,
					message: "User not found with id " + req.params.userId,
				});
			}
			return res.status(500).send({ ok:false,
				message: "Error updating user with id " + req.params.userId,
			});
		});
};

const deleteUser = (req, res) => {
	User.findByIdAndRemove(req.params.userId)
		.then((user) => {
			if (!user) {
				return res.status(404).send({ ok:false,
					message: "User not found with id " + req.params.userId,
				});
			}
			res.send({ok:true, message: "User deleted successfully!" });
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({ ok:false,
					message: "User not found with id " + req.params.userId,
				});
			}
			return res.status(500).send({ ok:false,
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
	login,
	signUp
};
