var express = require('express')
<<<<<<< HEAD
var {Service} = require('../models/schema')
var {TimeSlot} = require('../models/schema')
=======
var {Service} = require('../models/service.server.model')
>>>>>>> 6e52a83775c7b3072cafe2599292448c26b1f4f5

var router = express.Router()

router.post('/service', (req,res)=>{
	let newService = new Service()
	newService.trainer = req.body.trainer
    newService.name = req.body.name
    newService.description = req.body.description
    newService.type = req.body.type
    newService.experience = req.body.experience
    newService.preferredLocation = req.body.preferredLocation
    newService.province = req.body.province
    newService.price = req.body.price

    newService.save((err,results)=>{
        if(results){
            //res.json({success : true, service : newService})
            //create timeslot
            let newTimeSlot = new TimeSlot()
            newTimeSlot.serviceId = results._id
            newTimeSlot.day = req.body.day
            newTimeSlot.startTime = req.body.startTime
            newTimeSlot.endTime = req.body.endTime

            newTimeSlot.save((err,results)=>{
                if(results){
                    res.json({ success: true, service: newTimeSlot})
                } else {
                    res.json('Error Saving TimeSlot ' + err)
                }
            })
        } else {
            res.json('Error Saving Users ' + err)
        }
    })
})

router.get('/services',(req,res)=>{
    Service.find({}).exec((err,results) => {
        if(results)
            res.json({services : results})
        else
            res.json('No Users')
    })
})

router.post('/services/search',(req,res)=>{
	let keyword = req.body.keyword

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

router.get('/services/trainer/:trainer',(req,res)=>{
	Service.find({trainer : req.params.trainer}).exec((err,results)=>{
        if(results)
            res.json({success : true, services : results})
        else
            res.json({success : false})
    })
})

router.get('/services/:id',(req,res)=>{
	Service.findOne({_id : req.params.id}).exec((err,result)=>{
        if(result)
            res.json({success : true, service : result})
        else
            res.json({success : false})
    })
})

module.exports = router
