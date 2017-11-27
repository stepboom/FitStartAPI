var express = require('express')
var {Service} = require('../models/service.server.model')
var {TimeSlot} = require('../models/timeSlot.server.model')
var {Reservation} = require('../models/reservation.server.model')
var moment = require('moment')
var jwt = require('jsonwebtoken')
var config = require('../config')

var router = express.Router()

router.post('/service', (req,res)=>{
	let newService = new Service()
	newService.trainerId = req.body.trainerId
    newService.name = req.body.name
    newService.description = req.body.description
    newService.type = req.body.type
    newService.experience = req.body.experience
    newService.preferredLocation = req.body.preferredLocation
    newService.province = req.body.province
    newService.price = req.body.price

    newService.save((err,results)=>{
        if(results){
            req.body.timeSlots.map((timeSlot)=>{
                timeSlot.serviceId = results._id;
                return timeSlot
            })
        
            TimeSlot.create(req.body.timeSlots, (err, timeSlots) => {
                if(err){
                    res.json('Error Saving TimeSlot :' + err)
                } else {
                    res.json({ success: true, service: newService});
                }
              })
        } else {
            res.json('Error Saving Service :' + err)
        }
    })
})

router.get('/services',(req,res)=>{
    Service.find({}).exec((err,results) => {
        if(results)
            res.json({services : results})
        else
            res.json('No Services')
    })
})

router.route('/services/:id')
    .get((req, res) => {
        Service.findOne({ _id: req.params.id }).exec((err, result) => {
            if (result) {
                res.json({ service: result })
            } else {
                res.json('No Services')
            }
        })
    })
    .patch((req, res) => {
        var token = req.body.token || req.headers['x-access-token'] || req.query.token
		try {
            var jwtObj = jwt.verify(token,config.TOKEN_SECRET)
            Service.findById(req.params.id, (err, result) => {
                if (result) {
                    if(jwtObj.id != result.trainerId){
                        res.status(403).json({success : false})
                    } else {
                        for (var attrname in req.body) {
                            result[attrname] = req.body[attrname]
                        }
                        result.save((err, result) => {
                            if (result) {
                                res.json({ service: result })
                            } else {
                                res.json('Error Saving Service : ' + err)
                            }
                        })
                    }
                } else {
                    res.json('No Services')
                }
            })
		} catch (e) {
            res.status(403).json({success : false})
        }
        
    })
    .delete((req, res) => {
        var token = req.body.token || req.headers['x-access-token'] || req.query.token
		try {
            var jwtObj = jwt.verify(token,config.TOKEN_SECRET)
            Service.findById(req.params.id, (err, result) => {
                if (result) {
                    if(result.trainerId != jwtObj.id){
                        res.status(403).json({success : false})
                    } else {
                        Reservation.find({serviceId : result._id}).exec((err,results)=>{
                            if (results) {
                                results.forEach(function(reservation) {
                                    reservation.remove((err)=>{
                                        if (err) {
                                            res.json('Error Removing Reservation' + err)
                                        }
                                    })
                                })
                            } else {
                                res.json('Cannot find reservation' + err)
                            }
                        })

                        TimeSlot.find({serviceId : result._id}).exec((err,results)=>{
                            if (results) {
                                results.forEach(function(timeslot) {
                                    timeslot.remove((err)=>{
                                        if (err) {
                                            res.json('Error Removing Timeslot' + err)
                                        }
                                    })
                                })
                            } else {
                                res.json('Cannot find timeslot' + err)
                            }
                        })

                        result.remove((err)=>{
                            if(err){
                                res.json('Error Removing Service ' + err)
                            } else {
                                res.json({ success: true })
                            }
                        })
                    }
                } else {
                    res.json('Error Finding Service ' + err)
                }
            })
        } catch (e) {
            res.status(403).json({success : false})
        }
})

router.get('/services/search/items',(req,res)=>{
    let keyword = req.query.keyword

	let query = {}

	query['$or'] = [
		{
			name: {
				$regex: keyword,
				$options: 'i'
			}
		},
		{
			description: {
				$regex: keyword,
				$options: 'i'
			}
		}
	]

    Service.find(query).exec((err,results)=>{
        if(results)
            res.json({success : true, services : results})
        else
            res.json({success : false})
    })
})

router.get('/services/trainer/:trainerId',(req,res)=>{
	Service.find({trainerId : req.params.trainerId}).exec((err,results)=>{
        if(results)
            res.json({success : true, services : results})
        else
            res.json({success : false})
    })
})

module.exports = router
