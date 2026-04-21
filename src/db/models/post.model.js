// db/models/post.model.js

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      required: true,
      maxlength: 500,
    },
    image:{
        type: String,
      required: false,
      default: null,
    },

    isAnonymous: {
      type: Boolean,
      default: false,
    },

likes: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
],

dislikes: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
],

    isDeleted: {
      type: Boolean,
      default: false,
    },

    isFlagged: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);