const router = require("express").Router();
const user = require("../../controllers/userController");
const { admin, client } = require("../../middleware/roles")
const auth = require("../../middleware/auth")
router.post("/signup", user.signUp)
router.post("/login", user.login)
// // Users routes
router.get("", [auth, client], user.findAllUsers);
router.get("/:userId", [auth, client], user.findUserById);
router.post("/", [auth, client], user.createUser);
router.put("/:userId", [auth, client], user.updateUser);
router.delete("/:userId", [auth, client], user.deleteUser);

module.exports = router;