const mongoose = require('mongoose');

const Schema =new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    name: {
        type:String,
        require:true
    },
    pass:{
        type:String,
        require:true
    },
    Date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = new mongoose.model('user',Schema);