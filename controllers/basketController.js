const Basket = require('../models/Basket');
const Category = require('../models/Category')
exports.createOne = async (req, res, next) => {
    const userIDs = req.session.user;
    const result = new Basket({
        productID: req.body.productID,
        userID: req.body.userID,
    })
    result.save()
        .then(() => {
            res.status(201).json({ message: "Data is  created", data: result })
        })
        .catch((error) => {
            res.status(400).json({ message: "Data is not created", data: error })
        })

}


exports.deleteOne = async (req, res, next) => {
    await Basket.findByIdAndDelete({ _id: req.params.id });
    res.redirect('/api/basket/all')
}


exports.basket_of_users = async (req, res, next) => {
    const result = await Basket.find({ userID: req.params.id }).populate(["productID"])
    res.json(result)
}

exports.getItems = async (req, res, next) => {
    const category = await Category.find()
    const user = req.session.user
    const result = await Basket.find({ userID: user?._id }).populate(["productID"])
    // const user = req.session.user 
    res.render("./client/basket", { title: "Hamroh", layout: "./client", result, user, category, lang: req.session.ulang });
}