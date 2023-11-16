const router = require("express").Router();
const product = require("../../controllers/productController");
const { admin, client } = require("../../middleware/roles")
const auth = require("../../middleware/auth")
// Products routes
router.get("/", product.getAllProducts);
router.get("/:productId", product.getProductById);
router.post("/",[auth,client], product.createProduct);
router.put("/:productId",[auth,client], product.updateProduct);
router.delete("/:productId",[auth,client], product.deleteProduct);

module.exports = router;