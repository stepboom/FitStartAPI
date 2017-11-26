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

/*router.get('/timeSlots/service/:serviceId',(req,res)=>{
    TimeSlot.find({serviceId : req.params.serviceId}).sort({startTime : 1}).exec((err,results) => {
        if(results)
            res.json({success : true, timeSlots : results})
        else
            res.json('No TimeSlots')
    })*/
router.route('/timeSlots/service/:serviceId')
    .get((req, res) => {
        TimeSlot.findOne({ serviceId: req.params.serviceId }).exec((err, results) => {
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
                TimeSlot.findById(req.params.serviceId, (err, result) => {
                    if (result) {
                        if (jwtObj.id != result.serviceId) {
                            res.status(403).json({ success: false })
                        } else {
                            for (var attrname in req.body) {
                                result[attrname] = req.body[attrname]
                            }
                            result.save((err, result) => {
                                if (result) {
                                    res.json({ timeSlot: result })
                                } else {
                                    res.json('Error Saving timeSlot : ' + err)
                                }
                            })
                        }
                    } else {
                        res.json('No TimeSlots')
                    }
                })
            } catch (e) {
                res.status(403).json({ success: false })
            }

        })
        .delete((req, res) => {
            var token = req.body.token || req.headers['x-access-token'] || req.query.token
            try {
                var jwtObj = jwt.verify(token, config.TOKEN_SECRET)
                TimeSlot.findById(req.params.serviceId, (err, result) => {
                    if (result) {
                        if (result.serviceId != jwtObj.id) {
                            res.status(403).json({ success: false })
                        } else {
                            result.remove((err) => {
                                if (err) {
                                    res.json('Error Removing TimeSlot ' + err)
                                } else {
                                    res.json({ success: true })
                                }
                            })
                        }
                    } else {
                        res.json('Error Finding TimeSlot ' + err)
                    }
                })
            } catch (e) {
                res.status(403).json({ success: false })
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
