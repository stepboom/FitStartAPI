var mongoose = require('mongoose')
var Schema = mongoose.Schema
var autoIncrement = require('mongoose-auto-increment')

autoIncrement.initialize(mongoose.connection);

let reportSchema = new Schema({
    comment: {
        type: String,
        required: 'Please fill your comment'
    },
    trainerId: {
        type: Number,
        required: 'Please fill trainer ID'
    },
    traineeId: {
        type: Number,
        required: 'Please fill trainee ID'
    },
    status : {
        type: Number,
    }
})

reportSchema.plugin(autoIncrement.plugin, {
    model: 'Report',
    startAt: 100
})

let Report = mongoose.model('Report', reportSchema)

module.exports = {Report : Report}