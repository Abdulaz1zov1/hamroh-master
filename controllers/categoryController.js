const Category = require('../models/Category')
exports.addCategory = async(req, res) => {
    const category = new Category({
        name: {
            uz: req.body.nameuz,
            ru: req.body.nameru
        }
    });
    await category.save()
        .then(() => {
            res.redirect('/api/category/all')
        })
        .catch((error) => {
            res.status(400).json({ message: "Data is not created", data: error })
        })
}


exports.getCategory = async(req, res) => {
    const category = await Category.find()
    const user = req.session.admin; // admin session
    //sort({data:-1})
    res.render('admin/category/index', {
        layout: "./admin_layout",
        category: category,
        user
    })
}

exports.getByUserCategory = async(req, res) => {
    const category = await Category.find()
    res.json({
        data: category,
    })
}

exports.getById = async(req, res) => {
    const category = await Category.findById(req.params.id)
    const user = req.session.admin; // admin session
    res.render("./admin/category/update", { layout: "./admin_layout", user, category });
}


exports.updateCategory = async(req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id)
    category.name.uz = req.body.nameuz
    category.name.ru = req.body.nameru
    category.save({ validateBeforeSave: false })
        .then(() => {
            res.redirect('/api/category/all')
        })
        .catch((err) => {
            res.status(400).json({ message: "Badly", data: error })
        })
}

exports.deleteCategory = async(req, res) => {
    const category = await Category.findByIdAndDelete({ _id: req.params.id })
    res.redirect('/api/category/all')
}