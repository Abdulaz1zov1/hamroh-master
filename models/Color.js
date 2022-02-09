
const mongoose = require('mongoose');
const colorSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
module.exports = mongoose.model('Color', colorSchema );


