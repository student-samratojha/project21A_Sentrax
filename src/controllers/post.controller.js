const postModel = require("../db/models/post.model");
const auditLog = require("../helpers/audit.helpers");
async function getCreate(req,res){
  res.render("create-post");
}
// ---------------- CREATE POST ----------------
async function createPost(req, res) {
  try {
    const { content,image,title, isAnonymous } = req.body;

    if (!content) {
      return res.redirect("/secure/user?error=content required");
    }

    const newPost = await postModel.create({
      user: req.session.user.id,
      content,
      image,
      title,
      isAnonymous: isAnonymous === "on" ? true : false,
    });

    await auditLog(req, req.session.user, "CREATE", "SUCCESS");

    res.redirect("/secure/user?success=post created");
  } catch (err) {
    console.log(err);
    res.redirect("/secure/user?error=something went wrong");
  }
}

// ---------------- GET ALL POSTS (FEED) ----------------
async function getAllPosts(req, res) {
  try {
    const posts = await postModel
      .find({ isDeleted: false })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.render("feed", { posts, currentUser: req.session.user });
  } catch (err) {
    console.log(err);
    res.send("error=something went wrong");
  }
}

// ---------------- LIKE POST ----------------
async function likePost(req, res) {
  try {
    const userId = req.session.user.id;
    const postId = req.params.id;

    const post = await postModel.findById(postId);

    if (!post) {
      return res.redirect("/secure/user?error=post not found");
    }

    const alreadyLiked = post.likes.includes(userId);

   if (alreadyLiked) {
  post.likes = post.likes.filter(
    (id) => id.toString() !== userId.toString()
  );
} else {
  post.likes.push(userId);

  // remove dislike
  post.dislikes = post.dislikes.filter(
    (id) => id.toString() !== userId.toString()
  );
}

    await post.save();

    await auditLog(req, req.session.user, "UPDATE", "SUCCESS");

    res.redirect("/posts/feed");
  } catch (err) {
    console.log(err);
    res.redirect("/posts/feed?error=something went wrong");
  }
}

// ---------------- DELETE POST (ADMIN) ----------------
async function deletePost(req, res) {
  try {
    const postId = req.params.id;

    const post = await postModel.findById(postId);

    if (!post) {
      await auditLog(req, null, "DELETE", "FAILED");
      return res.redirect("/secure/admin?error=post not found");
    }

    post.isDeleted = true;
    await post.save();

    await auditLog(req, req.session.user, "DELETE", "SUCCESS");

    res.redirect("/secure/admin?success=post deleted");
  } catch (err) {
    console.log(err);
    res.redirect("/secure/admin?error=something went wrong");
  }
}

// ---------------- RESTORE POST (ADMIN) ----------------
async function restorePost(req, res) {
  try {
    const postId = req.params.id;

    const post = await postModel.findById(postId);

    if (!post) {
      await auditLog(req, null, "UPDATE", "FAILED");
      return res.redirect("/secure/admin?error=post not found");
    }

    post.isDeleted = false;
    await post.save();

    await auditLog(req, req.session.user, "UPDATE", "SUCCESS");

    res.redirect("/secure/admin?success=post restored");
  } catch (err) {
    console.log(err);
    res.redirect("/secure/admin?error=something went wrong");
  }
}
// ---------------- DISLIKE POST ----------------
async function dislikePost(req, res) {
  try {
    const userId = req.session.user.id;
    const postId = req.params.id;

    const post = await postModel.findById(postId);

    if (!post) {
      return res.redirect("/posts/feed?error=post not found");
    }

    const alreadyDisliked = post.dislikes.includes(userId);

    if (alreadyDisliked) {
      // remove dislike
      post.dislikes = post.dislikes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      // add dislike
      post.dislikes.push(userId);

      // remove like if exists
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    }

    await post.save();

    res.redirect("/posts/feed");
  } catch (err) {
    console.log(err);
    res.redirect("/posts/feed?error=something went wrong");
  }
}

module.exports = {
  createPost,
  getCreate,
  getAllPosts,
  dislikePost,
  likePost,
  deletePost,
  restorePost,
};