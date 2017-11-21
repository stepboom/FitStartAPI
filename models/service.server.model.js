var mongoose = require('mongoose')
var Schema = mongoose.Schema
var autoIncrement = require('mongoose-auto-increment');
let serviceSchema = new Schema({
    trainer : {
        type: String,
        required : 'Please fill service trainer'
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

serviceSchema.plugin(autoIncrement.plugin, 'Service')

let Service = mongoose.model('Service', serviceSchema)

module.exports = { TimeSlot : TimeSlot }