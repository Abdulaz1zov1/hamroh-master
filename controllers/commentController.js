const Comment = require ('../models/Comment')
exports.addComment = async (req,res) => {
    const comment = new Comment({
        message: req.body.message,
        userID : req.body.userID,
        productID : req.body.productID
    }) ;
    await comment.save()
    .then(()=> {
        res.status(200).json({
            success : true,
            comment :comment
        })
    })
    .catch((error) => {
        res.send(error)
    })
}

exports.getComment = async (req,res) => {
    const comment = await Comment.find()
    .sort({data : -1})
    res.send(comment)
}

exports.getById = async (req,res) => {
    const comment = await Comment.findById(req.params.id)
    res.status(200).json({
        success : true,
        comment : comment
    }) 
}
 
exports.updateComment = async (req,res) => {
    const comment = await Comment.findByIdAndUpdate(req.params.id)
    comment.message = req.body.message 
    comment.userID = req.body.userID
    comment.productID = req.body.productID
    comment.save({validateBeforeSave:false})
    .then(() => {
        res.status(200).json({
            success:true ,
            data: comment
        })
    }) 
    .catch((err) => {
        res.status(500).json({
            success:false,
            err
        })
    })
}

exports.getByUserID = async(req,res) => {
    const result = await Comment.find({userID:req.params.userID})
    .sort({data:-1})
    res.status(200).json({
        success : true,
        data : result
    })
}


exports.getByProductID = async(req,res) => {
    const result = await Comment.find({productID:req.params.productID})
    .sort({data:-1})
    res.status(200).json({
        success : true,
        data : result
    })
}


exports.deleteComment = async(req,res) => {
    const comment =await Comment.findByIdAndDelete({_id: req.params.id})
    res.status (200).json({
        success : true ,
        comment: comment
    })
}