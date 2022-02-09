
const mongoose = require('mongoose');
const replySchema = mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    userID:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
    index:true
    },
    commentID:{
        type:mongoose.Schema.ObjectId,
        ref:"Comment",
        required:true,
        index:true,
     }
},{
    timestamps:true
})
module.exports = mongoose.model('Reply', replySchema );

