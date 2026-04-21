const router = require("express").Router();
const secueController = require("../controllers/secure.controller");
const {
  isLoggedIn,
  isAdmin,
  isNotDeleted,
} = require("../middleware/auth.middleware");

router.get("/admin", isLoggedIn, isAdmin, secueController.getAdmin);
router.get("/user", isLoggedIn, isNotDeleted, secueController.getUser);
router.post("/delete", isLoggedIn, isAdmin, secueController.deleteUser);
router.post("/restore", isLoggedIn, isAdmin, secueController.restoreUser);

module.exports = router;
