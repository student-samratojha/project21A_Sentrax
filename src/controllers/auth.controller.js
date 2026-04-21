const userModel = require("../db/models/user.model");
const auditModel = require("../db/models/audit.model");
const auditLog = require("../helpers/audit.helpers");
const bcrypt = require("bcrypt");

// -------------------- REGISTER PAGE --------------------
async function register(req, res) {
  res.render("register");
}

// -------------------- LOGIN PAGE --------------------
async function login(req, res) {
  res.render("login");
}

// -------------------- LOGOUT --------------------
async function logout(req, res) {
  try {
    const user = req.session.user || null;

    await auditLog(req, user, "LOGOUT", "SUCCESS");

    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.redirect("/");
      }

      res.clearCookie("connect.sid");
      res.redirect("/auth/login?success=logged out");
    });

  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
}

// -------------------- REGISTER USER --------------------
async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      await auditLog(req, null, "REGISTER", "FAILED");
      return res.redirect("/auth/register?error=user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword
    });

    // auto login after register
    req.session.user = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };

    await auditLog(req, newUser, "REGISTER", "SUCCESS");

    res.redirect(`/secure/${newUser.role}?success=registered successfully`);

  } catch (err) {
    console.log(err);
    res.redirect("/auth/register?error=something went wrong");
  }
}

// -------------------- LOGIN USER --------------------
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      await auditLog(req, null, "LOGIN", "FAILED");
      return res.redirect("/auth/login?error=user not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      await auditLog(req, null, "LOGIN", "FAILED");
      return res.redirect("/auth/login?error=invalid credentials");
    }

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    await auditLog(req, user, "LOGIN", "SUCCESS");

    res.redirect(`/secure/${user.role}?success=logged in successfully`);

  } catch (err) {
    console.log(err);
    res.redirect("/auth/login?error=something went wrong");
  }
}

module.exports = {
  register,
  login,
  logout,
  registerUser,
  loginUser
};