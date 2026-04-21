require("dotenv").config();

const express = require("express");
const session = require("express-session");
const connectDB = require("./db/db");
const authRoutes = require("./routes/auth.routes");
const secureRoutes = require("./routes/secure.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const path = require("path");
const MongoStore = require("connect-mongo").default || require("connect-mongo");

const app = express();

// ---------------- DB ----------------
connectDB();

// ---------------- MIDDLEWARES ----------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ---------------- SESSION ----------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback_secret",
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),

    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// ---------------- VIEW ENGINE ----------------
app.set("view engine", "ejs");

// ---------------- ROUTES ----------------
app.use("/auth", authRoutes);
app.use("/secure", secureRoutes);
app.use("/comments", commentRoutes);
app.use("/posts", postRoutes);

// ---------------- HOME ----------------
app.get("/", (req, res) => {
  res.render("index");
});

module.exports = app;