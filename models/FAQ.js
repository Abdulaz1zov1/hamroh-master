const mongoose = require('mongoose');
const FAQ = mongoose.Schema({
    title:{
        ru: { type: String, required: true },
        uz: { type: String, required: true },
    },
    description: {
        ru: { type: String, required: true },
        uz: { type: String, required: true },
    }
},{
    timestamps:true
})
module.exports = mongoose.model('FAQ', FAQ );

