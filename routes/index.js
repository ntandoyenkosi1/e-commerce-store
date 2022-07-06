const app = require("express");
const user = require("../controllers/userController");
const category = require("../controllers/categoryController");
const product = require("../controllers/productController");
const sale = require("../controllers/saleController");
const payment = require("../controllers/paymentController");
const shipping = require("../controllers/shippingController");
const cart = require("../controllers/cartController");
const { admin, client } = require("../middleware/roles")
const auth = require("../middleware/auth")
const router=app()
// Users routes
router.get("/api/users",[auth,client], user.findAllUsers);
router.get("/api/users/:userId",[auth,client], user.findUserById);
router.post("/api/users",[auth,client], user.createUser);
router.put("/api/users/:userId",[auth,client], user.updateUser);
router.delete("/api/users/:userId",[auth,client], user.deleteUser);
// Category routes
router.get("/api/categories",[auth,client], category.getAllCategories);
router.get("/api/categories/:categoryId",[auth,client], category.getCategoryById);
router.post("/api/categories",[auth,client], category.createCategory);
router.put("/api/categories/:categoryId",[auth,client], category.updateCategory);
router.delete("/api/categories/:categoryId",[auth,client], category.deleteCategory);
// Products routes
router.get("/api/products", product.getAllProducts);
router.get("/api/products/:productId", product.getProductById);
router.post("/api/products",[auth,client], product.createProduct);
router.put("/api/products/:productId",[auth,client], product.updateProduct);
router.delete("/api/products/:productId",[auth,client], product.deleteProduct);
// Sales routes
router.get("/api/sales",[auth,client], sale.getAllSales);
router.get("/api/sales/:saleId",[auth,client], sale.getSalesByUserId);
router.post("/api/sales",[auth,client], sale.createSale);
router.put("/api/sales/:saleId",[auth,client], sale.updateSale);
router.delete("/api/sales/:saleId",[auth,client], sale.deleteSale);
// Payments routes
router.get("/api/payments", payment.getAllPayments);
router.get("/api/payments/:paymentId",[auth,client], payment.getPaymentById);
router.post("/api/payments",[auth,client], payment.createPayment);
router.put("/api/payments/:paymentId",[auth,client], payment.updatePaymentStatus);
// Shipping information routes
router.get("/api/shipping",[auth,client], shipping.getAllShipping);
router.get("/api/shipping/:shippingId",[auth,client], shipping.getShippingById);
router.post("/api/shipping",[auth,client], shipping.createShipping);
router.put("/api/shipping/:shippingId",[auth,client], shipping.updateShipping);
router.delete("/api/shipping/:shippingId",[auth,client], shipping.deleteShipping);
// auth
router.post("/api/login", user.login)
router.post("/api/signup", user.signUp)
// cart
router.get("/api/carts", cart.getAllCarts);
router.get("/api/carts/:cartId", [auth, client], cart.getCartById);
router.post("/api/carts", cart.createCart);
router.put("/api/carts/:cartId", cart.updateCart);
router.delete("/api/carts/:cartId", cart.deleteCart);
module.exports = router;