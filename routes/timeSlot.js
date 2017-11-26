var express = require('express')
var {TimeSlot} = require('../models/timeSlot.server.model')
var {Service} = require('../models/service.server.model')
var jwt = require('jsonwebtoken')
var config = require('../config')

var router = express.Router()

router.post('/timeSlots/:serviceId', (req,res)=>{

    req.body.timeSlots.map((timeSlot)=>{
        timeSlot.serviceId = req.params.serviceId;
        return timeSlot
    })

    TimeSlot.create(req.body.timeSlots, (err, results) => {
        if(err){
            res.json('Error Saving TimeSlot :' + err)
        } else {
            res.json({ success: true, timeSlots: results});
        }
      })
   
})

router.get('/timeSlots',(req,res)=>{
    TimeSlot.find({}).exec((err,results)=>{
        if(results){
            res.send({success :true, timeSlots : results})
        } else {
            res.send({success : false})
        }
    })
})

router.route('/timeSlots/service/:serviceId')
    .get((req, res) => {
        TimeSlot.find({ serviceId: req.params.serviceId }).exec((err, results) => {
            if (results) {
                res.json({ timeSlots: results })
            } else {
                res.json('No TimeSlots')
            }
        })
    })
    .patch((req, res) => {
        var token = req.body.token || req.headers['x-access-token'] || req.query.token
        try {
            var jwtObj = jwt.verify(token, config.TOKEN_SECRET)
            Service.findById(req.params.serviceId, (err, service)=>{
                if(service){
                    if (jwtObj.id != service.trainerId) {
                        res.status(403).json({ success: false , message : 'Not Authorized'})
                    } else {
                        console.log(req.body.timeSlots)
                        TimeSlot.update({_id : {$in : req.body.timeSlots}},{$set : {status : req.body.status}},{multi : true},(err, result) => {
                            if (result) {
                                res.json({ success : result.ok==1})
                            } else {
                                res.json('Error Updating timeSlot : ' + err)
                            }
                        })
                    }
                } else {
                    res.json('Error Service Not Found')
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
            Service.findById(req.params.serviceId, (err, service)=>{
                if(service){
                    if (jwtObj.id != service.trainerId) {
                        res.status(403).json({ success: false , message : 'Not Authorized'})
                    } else {
                        TimeSlot.remove({_id : {$in : req.body.timeSlots}},(err) => {
                            if (err) {
                                res.json('Error Removing TimeSlot ' + err)
                            } else {
                                res.json({ success: true })
                            }
                        })
                    }
                } else {
                    res.json('Error Service Not Found')
                }
            })
        } catch (e) {
            res.status(403).json({ success: false , message : e})
        }
})

router.get('/timeSlots/search/items',(req,res)=>{
	let keyword = req.query.keyword

	let query = {}

	query['$or'] = [
		{
			serviceId: {
				$regex: keyword,
				$options: 'i'
			}
		},
		{
			day: {
				$regex: keyword,
				$options: 'i'
			}
        },
        {
            startTime: {
                $regex: keyword,
                $options: 'i'
            }
        },
        {
            endTime: {
                $regex: keyword,
                $options: 'i'
            }
        },
	]

    TimeSlot.find(query).exec((err,results)=>{
        if(results)
            res.json({success : true, services : results})
        else
            res.json({success : false})
    })
})

module.exports = router
