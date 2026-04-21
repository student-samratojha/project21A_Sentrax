// db/models/reaction.model.js

const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  type: {
    type: String,
    enum: ["like", "dislike"],
  },
});

module.exports = mongoose.model("Reaction", reactionSchema);