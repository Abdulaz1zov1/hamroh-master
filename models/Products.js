const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      ru: { type: String, required: true },
      uz: { type: String, required: true },
    },
    bestSeller_count: {
      type: Number,
      default: 0,
    },
    size: {
      type: String,
      default:0
    },
    description: {
      ru: { type: String, required: true },
      uz: { type: String, required: true },
    },
    poster: {
      type: String,
      required: true,
    },
    categoryID: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
      index:true,
    },
    colorID: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Color",
        default:"",
        index:true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0
    },
    chegirma: {
      type: Number,
      default: 0,
    },
    tag: {
      type: String,
    },
    prev_payment: {
      type: Number,
      default: 0,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
