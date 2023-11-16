const router = require("express").Router();

const category = require("../../controllers/categoryController");
const { admin, client } = require("../../middleware/roles")
const auth = require("../../middleware/auth")
// Category routes
router.get("/",[auth,client], category.getAllCategories);
router.get("/:categoryId",[auth,client], category.getCategoryById);
router.post("/",[auth,client], category.createCategory);
router.put("/:categoryId",[auth,client], category.updateCategory);
router.delete("/:categoryId",[auth,client], category.deleteCategory);

module.exports = router;