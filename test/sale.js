process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
require("dotenv").config();
let server = require("../index");
let should = chai.should();
chai.use(chaiHttp);
before((done) => {
	chai.request(server)
		.post("/api/login")
		.send({
			email: process.env.EMAIL,
			password: process.env.PASSWORD,
		})
		.end((err, res) => {
			process.env.TOKEN = res.body.token;
			done();
		});
});
describe("/POST sale", () => {
	it("it should POST a sale", (done) => {
		chai.request(server)
			.post("/api/sales")
			.set("x-auth-token", process.env.TOKEN)
			.send({
				name: "test sale",
				price: 100,
				description: "test sale description",
				image: "test sale image",
				category: "62b8af4d01d814bf69f65b36",
				product: "62c34bb53aa80f83ea55cf0c",
				quantity: 1,
				user: process.env.USER_ID,
			})
			.end((err, res) => {
				process.env.ORDER_ID = res.body.data._id;
				res.should.have.status(200);
				res.body.should.be.a("object");
				done();
			});
	}).timeout(10000);
});
describe("/GET sale", () => {
	it("it should GET all the sales", (done) => {
		chai.request(server)
			.get("/api/sales")
			.set("x-auth-token", process.env.TOKEN)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a("object");
				done();
			});
	}).timeout(10000);
});
describe("/GET sale/:id", () => {
	it("it should GET a sale by the given id", (done) => {
		chai.request(server)
			.get(`/api/sales/${process.env.ORDER_ID}`)
			.set("x-auth-token", process.env.TOKEN)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a("object");
				done();
			});
	}).timeout(10000);
});
describe("/PUT sale/:id", () => {
	it("it should UPDATE a sale by the given id", (done) => {
		chai.request(server)
			.put(`/api/sales/${process.env.ORDER_ID}`)
			.set("x-auth-token", process.env.TOKEN)
			.send({
				name: "test sale",
				price: 100,
				description: "test sale description",
				image: "test sale image",
				category: "62b8af4d01d814bf69f65b36",
				product: "62c34bb53aa80f83ea55cf0c",
				quantity: 12,
				user: process.env.USER_ID,
			})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a("object");
				done();
			});
	}).timeout(10000);
});
describe("/DELETE sale/:id", () => {
	it("it should DELETE a sale by the given id", (done) => {
		chai.request(server)
			.delete(`/api/sales/${process.env.ORDER_ID}`)
			.set("x-auth-token", process.env.TOKEN)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a("object");
				done();
			});
	}).timeout(10000);
});
