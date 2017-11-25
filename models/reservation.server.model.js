var mongoose = require('mongoose')
var Schema = mongoose.Schema
var autoIncrement = require('mongoose-auto-increment')

let reservationSchema = new Schema({
    traineeId : {
        type : Number,
        required : 'Please fill trainee id'
    },
    timeSlot : {
        type : [Number],
        required : 'Please fill timeslot id'
    }
})

reservationSchema.plugin(autoIncrement.plugin,{
    model : 'Reservation',
    startAt : 100
})

let Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = { Reservation  : Reservation }