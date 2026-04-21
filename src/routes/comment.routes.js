// routes/comment.routes.js

const router = require("express").Router();
const {
  addComment,
  getCommentsByPost,
} = require("../controllers/comment.controller");

const { isLoggedIn } = require("../middleware/auth.middleware");

// add comment
router.post("/add/:id", isLoggedIn, addComment);

// get comments
router.get("/:id", isLoggedIn, getCommentsByPost);

module.exports = router;