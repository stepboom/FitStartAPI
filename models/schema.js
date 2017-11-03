var mongoose = require('mongoose')

var Schema = mongoose.Schema

let userSchema = new Schema({
    username : {
        type : String
    },
    password : {
        type : String
    },
    email : {
        type : String
    },
    first_name : {
        type : String
    },
    last_name : {
        type : String
    },
    gender : {
        type : String
    },
    address : {
        type : String
    },
    telephone_number : {
        type : String
    }
})

let User = mongoose.model('User', userSchema)

module.exports = {User : User}