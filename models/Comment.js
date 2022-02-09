const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      index:true
    },
    productID: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
      index:true
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Comment", commentSchema);
