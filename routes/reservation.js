var express = require('express')
var {Reservation} = require('../models/reservation.server.model')
var {TimeSlot} = require('../models/timeSlot.server.model')

var router = express.Router()

router.get('/reservations',(req,res)=>{
    Reservation.find({},(err,results)=>{
        if(results){
            res.json({Reservations : results})
        } else {
            res.json("Failure")
        }
    })
})

router.post('/reservation', (req,res)=>{
    let newReservation = new Reservation()
    newReservation.traineeId = req.body._id
    newReservation.trainerId = req.body.trainerId
    newReservation.timeSlot = req.body.timeSlot
    newReservation.status = 1
    newReservation.save((err,results)=>{
        if(results) {   
            res.json({reservations : results})   
        } else {
            res.json('Error Saving Reservation :' + err)
        }
    })
})

router.get('/reservations/trainee/:traineeId',(req,res)=>{
    Reservation.find({traineeId : req.params.traineeId}).exec((err,results)=>{
        if(results) {
            console.log(results)
            res.json({success : true, reservations : results})
        } else {
            res.json({success : false})
        }
    })
})

module.exports = router

