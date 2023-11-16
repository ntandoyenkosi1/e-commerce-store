const router = require("express").Router();
const sale = require("../../controllers/saleController");

const { admin, client } = require("../../middleware/roles")
const auth = require("../../middleware/auth")
// Sales routes
router.get("/",[auth,client], sale.getAllSales);
router.get("/:userId", [auth, client], sale.getSalesByUserId);
router.get("/sale/:id", [auth,client], sale.getSalesById)
router.post("/",[auth,client], sale.createSale);
router.put("/:saleId",[auth,client], sale.updateSale);
router.delete("/:saleId",[auth,client], sale.deleteSale);

module.exports = router;