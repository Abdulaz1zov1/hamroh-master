const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    rating : {
        type: Number,
        enum: [1,2,3,4,5],
        default: 0,
        required : true
    },
    product : {
        type : mongoose.Schema.ObjectId,
        ref: 'Product',
        required : true,
        index:true,
    },
},{
    timestamps:true
});
module.exports = mongoose.model("Rating", ratingSchema);