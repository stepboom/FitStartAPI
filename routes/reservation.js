var express = require('express')
var {Reservation} = require('../models/reservation.server.model')
var {TimeSlot} = require('../models/timeSlot.server.model')
var jwt = require('jsonwebtoken')
var config = require('../config')

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

router.post('/reservation/:serviceId', (req,res)=>{
    let newReservation = new Reservation()
    newReservation.traineeId = req.body.traineeId
    newReservation.trainerId = req.body.trainerId
    newReservation.timeSlot = req.body.timeSlot
    newReservation.serviceId = req.params.serviceId
    newReservation.status = 1
    newReservation.save((err,result)=>{
        if(results) {   
            res.json({reservation : result})   
        } else {
            res.json('Error Saving Reservation :' + err)
        }
    })
})

router.get('/reservations/trainee/:traineeId',(req,res)=>{
    Reservation.find({traineeId : req.params.traineeId, status : req.query.status}).exec((err,results)=>{
        if(results) {
            res.json({success : true, reservations : results})
        } else {
            res.json({success : false})
        }
    })
})

router.get('/reservations/trainer/:trainerId',(req,res)=>{
    Reservation.find({trainerId : req.params.trainerId, status : req.query.status}).exec((err,results)=>{
        if(results) {
            console.log(results)
            res.json({success : true, reservations : results})
        } else {
            res.json({success : false})
        }
    })
})

router.route('/reservations/:id')
.get((req, res) => {
    Reservation.findOne({ _id: req.params.id }).exec((err, result) => {
        if (result) {
            res.json({ reservation: result })
        } else {
            res.json('No Reservation')
        }
    })
})
.patch((req, res) => {
    var token = req.body.token || req.headers['x-access-token'] || req.query.token
    try {
        var jwtObj = jwt.verify(token, config.TOKEN_SECRET)
        Reservation.findById(req.params.id, (err, result) => {
            if (result) {
                if (jwtObj.id != result.trainerId || jwtObj.id != result.traineeId ) {
                    res.status(403).json({ success: false , message : 'Not Authorized'})
                } else {
                    for (var attrname in req.body) {
                        result[attrname] = req.body[attrname]
                    }
                    result.save((err, result) => {
                        if (result) {
                            res.json({ reservation: result })
                        } else {
                            res.json('Error Saving Reservation : ' + err)
                        }
                    })
                } 
            } else {
                res.json('No Reservations')
            }
        })
    } catch (e) {
        res.status(403).json({ success: false , message : e})
    }
})
.delete((req, res) => {
    var token = req.body.token || req.headers['x-access-token'] || req.query.token
    try {
        var jwtObj = jwt.verify(token, config.TOKEN_SECRET)
        Reservation.findById(req.params.id, (err, result) => {
            if (result) {
                if (jwtObj.id != result.trainerId || jwtObj.id != result.traineeId ) {
                    res.status(403).json({ success: false , message : 'Not Authorized'})
                } else {
                    result.remove((err)=>{
                        if(err){
                            res.json('Error Removing Reservation ' + err)
                        } else {
                            res.json({ success: true })
                        }
                    })
                } 
            } else {
                res.json('No Reservations')
            }
        })
    } catch (e) {
        res.status(403).json({ success: false , message : e})
    }
})

module.exports = router

