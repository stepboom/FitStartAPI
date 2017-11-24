var express = require('express')
var {Service} = require('../models/service.server.model')
var {TimeSlot} = require('../models/timeSlot.server.model')
var moment = require('moment')

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
            res.json('No Users')
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
