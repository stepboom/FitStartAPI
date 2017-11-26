var mongoose = require('mongoose')
var Schema = mongoose.Schema
var autoIncrement = require('mongoose-auto-increment')

autoIncrement.initialize(mongoose.connection);

let reviewSchema = new Schema({
    trainerId: {
        type: Number,
        required: 'Please fill trainer ID'
    },
    reservationId: {
        type: Number,
        required: 'Please fill reservation ID'
    },
    comment: {
        type: String,
        required: 'Please fill your comment'
    },
    rating : {
        type: Number,
        required: 'Please fill the rating'
    },
})

reviewSchema.plugin(autoIncrement.plugin, {
    model: 'Review',
    startAt: 100
})

let Review = mongoose.model('Review', reviewSchema)

module.exports = {Review : Review}