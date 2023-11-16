const router = require("express").Router();
const shipping = require("../../controllers/shippingController");
const { admin, client } = require("../../middleware/roles")
const auth = require("../../middleware/auth")

// Shipping information routes
router.get("/",[auth,client], shipping.getAllShipping);
router.get("/:shippingId",[auth,client], shipping.getShippingById);
router.post("/",[auth,client], shipping.createShipping);
router.put("/:shippingId",[auth,client], shipping.updateShipping);
router.delete("/:shippingId",[auth,client], shipping.deleteShipping);

module.exports = router;