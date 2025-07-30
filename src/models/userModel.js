const mongoose = require('mongoose')

let myUser = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        // required: true
    },
    mobileNum: {
        type: Number,
        // required: true
    },
    file:{
        type: String,
        
    },
    password:{
        type: String,
        // required: true
    },
    is_verified:{
        type: Boolean,
        // required: true
    }
},{
    timestamps: true 
})

module.exports = mongoose.model("myUser", myUser)