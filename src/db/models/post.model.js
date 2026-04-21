// db/models/post.model.js

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: "Untitled Post",
      trim: true,
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for comments
postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});

module.exports = mongoose.model("Post", postSchema);