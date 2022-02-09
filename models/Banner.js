
const mongoose = require('mongoose');
const result = mongoose.Schema({
    image:{
        type:String,
        required:true,
        index:true
    }
},{
    timestamps:true
})
module.exports = mongoose.model('Banner', result );

