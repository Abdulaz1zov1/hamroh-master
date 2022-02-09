const Color = require('../models/Color');


exports.createOne = async (req, res, next) => {
    const result = new Color({
        name: req.body.name,
        code: req.body.code
    })
    result.save() 
    .then(() => {
        res.redirect('/api/color/all')
    })
    .catch((error) => {
        res.status(400).json({message: "Data is not created", data: error})
    })
}

exports.updateOne = async (req, res, next) => {
    const result = await Color.findByIdAndUpdate(req.params.id)
    result.name = req.body.name
    result.code = req.body.code
    result.save()
    .then(() => {
        res.redirect('/api/color/all')
    })
    .catch((error) => {
        res.status(400).json({message: "Badly", data: error})
    })
}
exports.deleteOne = async (req, res, next) => {
    await Color.findByIdAndDelete({ _id: req.params.id });
    res.redirect('/api/color/all')
}

exports.getItem = async (req, res,next ) => {
    const result = await Color.findById(req.params.id)
    const user = req.session.admin; // admin session
    res.render("./admin/color/update", { layout: "./admin_layout", user, result});
}
exports.getItems = async (req, res,next ) => {
    const result = await Color.find()
    
    const user = req.session.admin; // admin session
res.render("./admin/color/index", { layout: "./admin_layout", user, result}); 
}