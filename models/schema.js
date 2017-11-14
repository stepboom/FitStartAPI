var mongoose = require('mongoose')

var Schema = mongoose.Schema

let userSchema = new Schema({
    username : {
        type : String,
        required: 'Please fill in a username'
    },
    password : {
        type : String,
        required: 'Please fill in a password'
    },
    email : {
        type : String,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        trim: true,
        required: 'Please fill in a Email'

    },
    first_name : {
        type : String,
        required: 'Please fill in a Firstname'
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
    },
    role :{
        type : String
    }
})

userSchema.methods.authenticate = function(password){
    return this.password = password;
}

let User = mongoose.model('User', userSchema)

module.exports = {User : User}