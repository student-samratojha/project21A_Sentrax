const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  registerUser,
  loginUser,
  googleAuthCallback,
} = require("../controllers/auth.controller");

const { isLoggedIn } = require("../middleware/auth.middleware");

// ---------------- REGISTER ----------------
router.get("/register", register);
router.post("/register", registerUser);

// ---------------- LOGIN ----------------
router.get("/login", login);
router.post("/login", loginUser);

// ---------------- LOGOUT ----------------
router.get("/logout", isLoggedIn, logout);
module.exports = router;
