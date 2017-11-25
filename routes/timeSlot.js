var express = require('express')
var {TimeSlot} = require('../models/timeSlot.server.model')

var router = express.Router()

router.post('/timeSlots', (req,res)=>{

    req.body.timeSlots.map((timeSlot)=>{
        timeSlot.serviceId = req.body.serviceId;
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

router.get('/timeSlots/service/:serviceId',(req,res)=>{
    TimeSlot.find({serviceId : req.params.serviceId}).sort({startTime : 1}).exec((err,results) => {
        if(results)
            res.json({success : true, timeSlots : results})
        else
            res.json('No TimeSlots')
    })
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
