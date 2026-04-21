const userModel = require("../db/models/user.model");

// -------------------- LOGIN CHECK --------------------
function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/auth/login?error=login required");
  }
  next();
}

// -------------------- ADMIN CHECK --------------------
function isAdmin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }

  if (req.session.user.role !== "admin") {
    return res.send("Unauthorized access");
  }

  next();
}

// -------------------- NOT DELETED CHECK --------------------
async function isNotDeleted(req, res, next) {
  try {
    if (!req.session.user) {
      return res.redirect("/auth/login");
    }

    const user = await userModel.findById(req.session.user.id);

    if (!user || user.isDeleted) {
      req.session.destroy(() => {
        return res.redirect("/auth/login?error=account deleted");
      });
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    res.redirect("/auth/login");
  }
}

module.exports = {
  isLoggedIn,
  isAdmin,
  isNotDeleted,
};
