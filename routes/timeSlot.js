var express = require('express')
var {TimeSlot} = require('../models/timeSlot.server.model')

var router = express.Router()

router.post('/timeSlots', (req,res)=>{

    req.body.timeSlots.map((timeSlot)=>{
        timeSlot.serviceId = req.body.serviceId;
        return timeSlot
    })

    TimeSlot.insertMany(req.body.timeSlots, (err, results) => {
        if(err){
            res.json('Error Saving TimeSlot :' + err)
        } else {
            res.json({ success: true, timeSlots: results});
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

router.post('/timeSlots/search',(req,res)=>{
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
