const mongoose = require('mongoose');
const sliderSchema = mongoose.Schema({
    image:{
        type:String,
        required:true
    },
},{
    timestamps:true
})
module.exports = mongoose.model('Slider', sliderSchema );

