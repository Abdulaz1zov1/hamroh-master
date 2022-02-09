
const mongoose = require('mongoose');
const Contact = mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    tel: {
        type:String, required: true
    }, 
    name: {
        type:String, required: true
    },
    process:{
        type: String, enum: ["seen", "unseen"], default: "unseen"
    }
},{
    timestamps:true
})
module.exports = mongoose.model('Contact', Contact );

