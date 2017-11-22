var mongoose = require('mongoose')
var Schema = mongoose.Schema
var autoIncrement = require('mongoose-auto-increment')
let timeSlotSchema = new Schema({
    serviceId: {
        type: String,
        required: 'Please fill service ID'
    },
    startTime: {
        type: String,
        required: 'Please fill service start time'
    },
    endTime: {
        type: String,
        required: 'Please fill service end time'
    },
})

let TimeSlot = mongoose.model('TimeSlot', timeSlotSchema)

module.exports = {TimeSlot : TimeSlot}