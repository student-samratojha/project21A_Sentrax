// controllers/comment.controller.js

const commentModel = require("../db/models/comment.model");
const postModel = require("../db/models/post.model");
const auditLog = require("../helpers/audit.helpers");

// ---------------- ADD COMMENT ----------------
async function addComment(req, res) {
  try {
    const { content, isAnonymous } = req.body;
    const postId = req.params.id;

    if (!content) {
      return res.redirect("/posts/feed?error=comment required");
    }

    const post = await postModel.findById(postId);
    if (!post) {
      return res.redirect("/posts/feed?error=post not found");
    }

    await commentModel.create({
      post: postId,
      user: req.session.user.id,
      content,
      isAnonymous: isAnonymous === "on" ? true : false,
    });

    await auditLog(req, req.session.user, "CREATE", "SUCCESS");

    res.redirect("/posts/feed");
  } catch (err) {
    console.log(err);
    res.redirect("/posts/feed?error=something went wrong");
  }
}

// ---------------- GET COMMENTS ----------------
async function getCommentsByPost(req, res) {
  try {
    const postId = req.params.id;

    const comments = await commentModel
      .find({ post: postId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
}

module.exports = {
  addComment,
  getCommentsByPost,
};