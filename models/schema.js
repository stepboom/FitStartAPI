var mongoose = require('mongoose')

var Schema = mongoose.Schema

let userSchema = new Schema({
    email : String,
})

/*
let userSchema = new Schema({
    email : {
        type : String
    },
    password : {
        type : String
    },
    firstname : {
        type : String
    },
    lastname : {
        type : String
    },
    gender : {
        type : String
    },
    address : {
        type : String
    },
    telephoneNumber : {
        type : String
    }
})
*/

let User = mongoose.model('users', userSchema)

module.exports = {User : User}