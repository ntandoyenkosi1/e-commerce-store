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
describe("/POST products", () => {
	it("it should POST a product", (done) => {
		let product = {
			name: "test",
			price: 10,
			description: "test",
			image: "test",
			category: "62b8af4d01d814bf69f65b36",
			quantity: "10",
		};
		chai.request(server)
			.post("/api/products")
			.set("x-auth-token", process.env.TOKEN)
			.send(product)
			.end((err, res) => {
				process.env.PRODUCT_ID = res.body.data._id;
				res.should.have.status(200);
				done();
			});
	});
});
describe("/GET products", () => {
	it("it should GET all the products", (done) => {
		chai.request(server)
			.get("/api/products")
			.end((err, res) => {
				process.env.PRODUCTS = JSON.stringify(res.body);
				res.should.have.status(200);
				res.should.have.property("ok");
				done();
			});
	});
	it("it should GET a product by id", (done) => {
		chai.request(server)
			.get(`/api/products/${process.env.PRODUCT_ID}`)
			.end((err, res) => {
				res.should.have.status(200);
				res.should.have.property("ok");
				done();
			});
	});
});

describe("/PUT products", () => {
	it("should update(PUT) a product", (done) => {
		const product = {
			name: "test",
			name: "test update",
			price: 100,
			description: "test update",
			category: "62b8af4d01d814bf69f65b36",
			image: "test",
		};
		chai.request(server)
			.put(`/api/products/${process.env.PRODUCT_ID}`)
			.set("x-auth-token", process.env.TOKEN)
			.send(product)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	}).timeout(10000);
});
describe("/DELETE products", () => {
	it("should DELETE a product", (done) => {
		chai.request(server)
			.delete(`/api/products/${process.env.PRODUCT_ID}`)
			.set("x-auth-token", process.env.TOKEN)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	}).timeout(10000);
});
after((done) => {
  process.env.TOKEN = "";
  process.env.PRODUCT_ID = "";
  done()
})