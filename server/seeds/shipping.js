const { faker } = require("@faker-js/faker");
// address, city, town
let shippings = [
  {
    method: "online",
  },
  {
    method: "online",
  },
  {
    method: "online",
  },
  {
    method: "online",
  },
  {
    method: "online",
  },
  {
    method: "online",
  },
  {
    method: "online",
  },
  {
    method: "online",
  },
  {
    method: "online",
  },
];
shippings.map((item) => {
  item.address = faker.location.streetAddress();
  item.city = faker.location.state();
  item.town = faker.location.city();
  item.code = faker.location.zipCode();
  item.country = faker.location.country();
  item.phone = faker.phone.number();
  item.complete = [true, false][Math.floor(Math.random() * 2)];
});
module.exports = shippings;
