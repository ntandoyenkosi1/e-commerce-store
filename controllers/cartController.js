const Cart = require("../models/cart");

const getAllCarts = (req, res) => {
  Cart.find({}, (err, carts) => {
    if (err) {
      res.send({ ok: false, error: err });
    }
    res.json({ ok: true, data: carts });
  }).populate("user").populate("product").sort({ name: 1 });
}
const getCartById=(req, res)=> {
  Cart.findById(req.params.cartId, (err, cart) => {
    if (err) {
      res.send({ ok: false, error: err });
    }
    res.json({ ok: true, data: cart });
  })
}
const createCart = (req, res) => {
  const cart = new Cart({
    user: req.body.user,
    product: req.body.product,
    quantity: req.body.quantity,
    price: req.body.price,
  });
  cart.save((err, cart) => {
    if (err) {
      res.send({ ok: false, error: err });
    }
    res.json({ ok: true, data: cart });
  });
}
const updateCart = (req, res) => {
  Cart.findByIdAndUpdate(
    req.params.cartId,
    {
      user: req.body.user,
      product: req.body.product,
      quantity: req.body.quantity,
      price: req.body.price,
    },
    (err, cart) => {
      if (err) {
        res.send({ ok: false, error: err });
      }
      res.json({ ok: true, data: cart });
    }
  );
}
const deleteCart = (req, res) => {
  Cart.findByIdAndRemove(req.params.cartId, (err, cart) => {
    if (err) {
      res.send({ ok: false, error: err });
    }
    res.json({ ok: true, data: cart });
  });
}
module.exports = {
  getAllCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
};
