const { faker } = require("@faker-js/faker");
const shipping = require("./shipping");
const categories = require("./category");
const payments = require("./payment");
let products = require("./product");
let sales = require("./sale");
const users = require("./user");
const {
  Shipping,
  Category,
  Payment,
  Product,
  Sale,
  User,
} = require("../models");
const mongoose = require("mongoose");

// Database connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/e-commerce-db1",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

User.insertMany(users)
  .then((users) => {
    console.log("1. Users Added");
    Category.insertMany(categories)
      .then((categories) => {
        console.log("2. Categories added");
        products = products.map((product) => {
          product.category =
            categories[Math.floor(Math.random() * categories.length)]._id;
          return product;
        });
        //console.log(products);
        Product.insertMany(products)
          .then((products) => {
            console.log("3. Products added");
            sales = sales.map((sale) => {
              sale.user = users[Math.floor(Math.random() * users.length)]._id;
              sale.product =
                products[Math.floor(Math.random() * products.length)]._id;
              return sale;
            });
            Sale.insertMany(sales)
              .then((sales) => {
                console.log("4. Sales added");
                shipping.map((ship) => {
                  ship.user =
                    users[Math.floor(Math.random() * users.length)]._id;
                  ship.sale =
                    sales[Math.floor(Math.random() * sales.length)]._id;
                  return ship;
                });
                Shipping.insertMany(shipping)
                  .then((res) => {
                    console.log("5. Shipping added");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

Payment.insertMany(payments)
  .then((res) => {
    console.log("6. Payments added");
  })
  .catch((err) => {
    console.log(err);
  });
