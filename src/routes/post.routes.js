const router = require("express").Router();
const {
  createPost,
  getAllPosts,
  likePost,
  getCreate,
  deletePost,
  dislikePost,
  restorePost,
} = require("../controllers/post.controller");

const {
  isLoggedIn,
  isAdmin,
} = require("../middleware/auth.middleware");

// create
router.get("/create", isLoggedIn, getCreate);
router.post("/create", isLoggedIn, createPost);

// feed
router.get("/feed", isLoggedIn, getAllPosts);

// like
router.get("/like/:id", isLoggedIn, likePost);
router.get("/dislike/:id", isLoggedIn, dislikePost);
// admin actions
router.get("/delete/:id", isLoggedIn, isAdmin, deletePost);
router.get("/restore/:id", isLoggedIn, isAdmin, restorePost);

module.exports = router;