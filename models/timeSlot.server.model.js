var mongoose = require('mongoose')
var Schema = mongoose.Schema
var autoIncrement = require('mongoose-auto-increment');
let timeSlotSchema = new Schema({
    serviceId: {
        type: String,
        required: 'Please fill service ID'
    },
    day: {
        type: String,
        required: 'Please fill service day'
    },
    startTime: {
        type: Date,
        required: 'Please fill service start time'
    },
    endTime: {
        type: Date,
        required: 'Please fill service end time'
    },
})

let TimeSlot = mongoose.model('TimeSlot', timeSlotSchema)

module.exports = {TimeSlot : TimeSlot }