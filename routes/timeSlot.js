var express = require('express')
var {TimeSlot} = require('../models/timeSlot.server.model')

var router = express.Router()

router.post('/timeSlot', (req,res)=>{
    let newTimeSlot = new TimeSlot();
    newTimeSlot.serviceId = req.body.serviceId
    newTimeSlot.day = req.body.day
    newTimeSlot.startTime = req.body.startTime
    newTimeSlot.endTime = req.body.endTime
   

    newTimeSlot.save((err,results)=>{
        if(results){
            res.json({ success: true, service: newTimeSlot});
        } else {
            res.json('Error Saving TimeSlot ' + err)
        }
    })
})

router.get('/timeSlot/byservice',(req,res)=>{
    TimeSlot.find({serviceId:req.serviceId}).exec((err,results) => {
        if(results)
            res.json({timeSlot : results})
        else
            res.json('No TimeSlots')
    })
})

router.post('/timeSlot/bytime',(req,res)=>{
	let keyword = req.body.keyword

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
