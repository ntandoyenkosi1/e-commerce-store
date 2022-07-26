process.env.NODE_ENV = "test";
require("dotenv").config();
let chai = require("chai");
let chaiHttp = require("chai-http");
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
describe("/POST Category", () => {
	it("it should POST a category", (done) => {
		let category = {
			name: "test",
		};
		chai.request(server)
			.post("/api/categories")
			.set("x-auth-token", process.env.TOKEN)
			.send(category)
			.end((err, res) => {
				process.env.CATEGORY_ID = res.body.data._id;
				res.should.have.status(200);
				done();
			});
	});
});
describe("/GET Category", () => {
	it("it should GET all the categories", (done) => {
		chai.request(server)
			.get("/api/categories")
			.set("x-auth-token", process.env.TOKEN)
			.end((err, res) => {
				res.should.have.status(200);
				res.should.have.property("ok");
				done();
			});
	});
	it("it should GET a category by id", (done) => {
		chai.request(server)
			.get(`/api/categories/${process.env.CATEGORY_ID}`)
			.set("x-auth-token", process.env.TOKEN)
			.end((err, res) => {
				res.should.have.status(200);
				res.should.have.property("ok");
				done();
			});
	});
});
describe("/PUT Category", () => {
	it("it should PUT a category", (done) => {
		let category = {
			name: "test",
		};
		chai.request(server)
			.put(`/api/categories/${process.env.CATEGORY_ID}`)
			.set("x-auth-token", process.env.TOKEN)
			.send(category)
			.end((err, res) => {
				res.should.have.status(200);
				res.should.have.property("ok");
				done();
			});
	});
});
describe("/DELETE Category", () => {
	it("it should DELETE a category", (done) => {
		chai.request(server)
			.delete(`/api/categories/${process.env.CATEGORY_ID}`)
			.set("x-auth-token", process.env.TOKEN)
			.end((err, res) => {
				res.should.have.status(200);
				res.should.have.property("ok");
				done();
			});
	});
});