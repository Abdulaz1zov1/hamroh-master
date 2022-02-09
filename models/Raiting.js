
const mongoose = require('mongoose');
const ratingSchema = mongoose.Schema({
    raiting : {
        type: Number,
        enum: [1,2,3,4,5],
        required: [true , 'Please add a rating between 1 and 5']
    },
    productID : {
        type : mongoose.Schema.ObjectId,
        ref: 'Product',
        required : true,
        index:true,
    },
    userID : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref:'User',
        index:true,
    }
},{
    timestamps:true
})
module.exports = mongoose.model('Rating', ratingSchema );

