var mongoose = require('mongoose')
var Schema = mongoose.Schema
var autoIncrement = require('mongoose-auto-increment')

autoIncrement.initialize(mongoose.connection);

let reviewSchema = new Schema({
    reviewId: {
        type: String,
        required: 'Please fill review ID'
    },
    trainerid: {
        type: String,
        required: 'Please fill trainer ID'
    },
    comment: {
        type: String,
        required: 'Please fill your comment'
    },
    rating : {
        type: String,
        required: 'Please fill the rating'
    },
})

let Review = mongoose.model('Review', reviewSchema)

module.exports = {Review : Review}