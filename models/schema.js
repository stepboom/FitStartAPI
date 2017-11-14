var mongoose = require('mongoose')
var crypto = require('crypto')

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
    },
    salt: {
		type: String
	}
})

userSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

userSchema.methods.hashPassword = function(password){
    if (this.salt && password){
        return crypto.pbkdf2Sync(password,this.salt,10000,64).toString('base64')
    } else {
        return password
    }
}

userSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

let User = mongoose.model('User', userSchema)

module.exports = {User : User}