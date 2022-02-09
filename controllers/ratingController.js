const Rating = require("../models/Rating");
const Product = require("../models/Products");
const ObjectId = require("mongodb").ObjectID;
exports.createOne = async (req, res, next) => {
  const result = new Rating({
    rating: req.body.rating,
    product: req.body.product,
  });

  result
    .save()
    .then(async () => {
      const countRatingProduct = await Rating.aggregate([
        {
          $match: {
            product: new ObjectId(req.body.product),
          },
        },
        {
          $group: {
            _id: "$product",
            count: { $sum: 1 },
            totalSum: { $sum: "$rating" },
          },
        },
        {
          $project: {
            _id: 1,
            count: 1,
            totalSum: {
              $round: [{ $divide: ["$totalSum", "$count"] }, 1],
            },
          },
        },
      ]);
      const updateRating = await Product.findByIdAndUpdate(req.body.product);
      if (countRatingProduct == "") {
        updateRating.rating = req.body.rating;
      } else {
        updateRating.rating = countRatingProduct[0].totalSum;
      }
      updateRating.save();
      res.status(201).json({ message: "Successfully", data: result });
    })
    .catch((err) => {
      res.status(400).json({ message: "Unsuccessfully", data: err });
    });
};

exports.getOne = async (req, res) => {
  const countRatingProduct = await Rating.aggregate([
    {
      $match: {
        product: new ObjectId(req.params.id),
      },
    },
    {
      $group: {
        _id: "$product",
        count: { $sum: 1 },
        totalSum: { $sum: "$rating" },
      },
    },
    {
      $project: {
        _id: 1,
        count: 1,
        totalSum: {
          $round: [{ $divide: ["$totalSum", "$count"] }, 1],
        },
      },
    },
  ]);
  res.json(countRatingProduct);
};
