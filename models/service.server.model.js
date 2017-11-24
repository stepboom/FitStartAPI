var mongoose = require('mongoose')
var Schema = mongoose.Schema
var autoIncrement = require('mongoose-auto-increment')
var TimeSlot = require('./timeSlot.server.model')

let serviceSchema = new Schema({
    trainerId : {
        type: String,
        required : 'Please fill service trainer id'
    },
    name : {
        type : String,
        required : 'Please fill service name'
    },
    description : {
        type : String,
    },
    type: {
        type: String,
        required: 'Please fill service type'
    },
    experience: {
        type: String       
    },
    preferredLocation : {
        type: String,
        required: 'Please fill location'
    },
    province : {
        type: String,
        required: 'Please fill province'
    },
    price: {
        type: String,
        required: 'Please fill the price'
    }
    
})

serviceSchema.plugin(autoIncrement.plugin,{
    model : 'Service',
    startAt : 100
})

let Service = mongoose.model('Service', serviceSchema)

module.exports = { Service  : Service  }