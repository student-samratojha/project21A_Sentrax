const userModel = require("../db/models/user.model");
const auditModel = require("../db/models/audit.model");
const auditLog = require("../helpers/audit.helpers");
const postModel = require("../db/models/post.model");


async function getAdmin(req, res) {
  try {
    const users = await userModel.find();
    const admin = await userModel.findOne({ role: "admin" });

    const audits = await auditModel
      .find()
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(10);
const posts = await postModel.find().populate("user", "name");
    res.render("admin", { users, audits, admin,posts });
  } catch (err) {
    console.log(err);
    res.send("error=something went wrong");
  }
}

async function getUser(req, res) {
  try {
    const posts = await postModel
      .find({ user: req.session.user.id })
      .populate("user", "name");
    const user = await userModel.findById(req.session.user.id);
    res.render("user", { user,posts });
  } catch (err) {
    console.log(err);
    res.send("error=something went wrong");
  }
}

async function deleteUser(req, res) {
  try {
    const user = await userModel.findById(req.body.id);

    if (!user) {
      await auditLog(req, null, "DELETE", "FAILED");
      return res.send("error=user not found");
    }

    user.isDeleted = true;
    await user.save();

    await auditLog(req, user, "DELETE", "SUCCESS");

    res.redirect("/secure/admin?success=user deleted successfully");
  } catch (err) {
    console.log(err);
    res.send("error=something went wrong");
  }
}

async function restoreUser(req, res) {
  try {
    const user = await userModel.findById(req.body.id);

    if (!user) {
      await auditLog(req, null, "UPDATE", "FAILED");
      return res.send("error=user not found");
    }

    user.isDeleted = false;
    await user.save();

    await auditLog(req, user, "UPDATE", "SUCCESS");

    res.redirect("/secure/admin?success=user restored successfully");
  } catch (err) {
    console.log(err);
    res.send("error=something went wrong");
  }
}

module.exports = {
  getAdmin,
  getUser,
  deleteUser,
  restoreUser,
};
