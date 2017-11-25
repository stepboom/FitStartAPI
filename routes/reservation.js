var express = require('express')
var {Reservation} = require('../models/reservation.server.model')

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
    newReservation.timeSlot = req.body.timeSlot
    newReservation.save((err,results)=>{
        if(results) {   
            res.json({reservations : results})   
        } else {
            res.json('Error Saving Reservation :' + err)
        }
    })
})

module.exports = router

