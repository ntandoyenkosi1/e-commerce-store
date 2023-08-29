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
describe("SignUpUser", () => {
	it("should sign up a user", (done) => {
		chai.request(server)
			.post("/api/signup")
			.send({
				email: "testuser@gmail.com",
				password: "strongpassword123",
				name: "test user",
			})
			.end((req, res) => {
				res.should.have.status(200);
				done();
			});
	});
});
describe("LoginUser", () => {
	it("should login a user", (done) => {
		chai.request(server)
			.post("/api/login")
			.send({
				email: "testuser@gmail.com",
				password: "strongpassword123",
			})
			.end((err, res) => {
				process.env.USER_ID = res.body.data.id;
				res.should.have.status(200);
				done();
			});
	});
});
describe("RemoveUser", () => {
	it("should remove a user", (done) => {
		chai.request(server)
			.delete(`/api/users/${process.env.USER_ID}`)
			.set("x-auth-token", process.env.TOKEN)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
});
