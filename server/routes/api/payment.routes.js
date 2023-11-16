const router = require("express").Router();
const payment = require("../../controllers/paymentController");

const { admin, client } = require("../../middleware/roles")
const auth = require("../../middleware/auth")
// Payments routes
router.get("/", payment.getAllPayments);
router.get("/:paymentId",[auth,client], payment.getPaymentById);
router.post("/",[auth,client], payment.createPayment);
router.put("/:paymentId",[auth,client], payment.updatePaymentStatus);


module.exports = router;