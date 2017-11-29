var express = require('express')
var {Report} = require('../models/report.server.model')
var jwt = require('jsonwebtoken')
var config = require('../config')

var router = express.Router()

router.post('/report', (req, res) => {
    let newReport = new Report()
    newReport.comment = req.body.comment
    newReport.trainerId = req.body.trainerId
    newReport.traineeId = req.body.traineeId

    newReport.save((err,result)=>{
        if (result) {
            res.json({ success: true, report: newReport });
        } else {
            res.json('Error Saving Report ' + err)
        }
    })
})

router.get('/reports',(req,res)=>{
    var token = req.body.token || req.headers['x-access-token'] || req.query.token
    try {
        var jwtObj = jwt.verify(token,config.TOKEN_SECRET)
        if(jwtObj.role != 'Admin'){
            res.status(403).json({success : false, message : 'Not Authorized'})
        } else {
            Report.find({}).exec((err,results) => {
                if(results)
                    res.json({reports : results})
                else
                    res.json('No Reports')
            })
        }
    } catch (e) {
        res.status(403).json({success : false, message : e})
    }
})

router.route('/reports/:id')
    .get((req, res) => {
        Report.findOne({ _id: req.params.id }).exec((err, result) => {
            if (result) {
                res.json({ report: result })
            } else {
                res.json('No Reports')
            }
        })
    })
    .patch((req, res) => {
        var token = req.body.token || req.headers['x-access-token'] || req.query.token
        try {
            var jwtObj = jwt.verify(token,config.TOKEN_SECRET)
            if(jwtOb.role != 'Admin'){
                res.status(403).json({success : false, message : 'Not Authorized'})
            } else {
                Report.findById(req.params.id, (err, result) => {
                    if (result) {
                        for (var attrname in req.body) {
                            result[attrname] = req.body[attrname]
                        }
                        result.save((err, result) => {
                            if (result) {
                                res.json({ report: result })
                            } else {
                                res.json('Error Saving Report : ' + err)
                            }
                        })
                    } else {
                        res.json('No Reports')
                    }
                })
            }
        } catch (e) {
            res.status(403).json({success : false, message : e})
        }
    })
    .delete((req, res) => {
        var token = req.body.token || req.headers['x-access-token'] || req.query.token
        try {
            var jwtObj = jwt.verify(token,config.TOKEN_SECRET)
            if(jwtOb.role != 'Admin'){
                res.status(403).json({success : false, message : 'Not Authorized'})
            } else {
                Report.findByIdAndRemove(req.params.id, (err, result) => {
                    if (result) {
                        res.json({ success: true })
                    } else {
                        res.json('Error Deleting Report ' + err)
                    }
                })
            }
        } catch (e) {
            res.status(403).json({success : false, message : e})
        }
})

router.get('/reports/search/items',(req,res)=>{
    let keyword = req.query.keyword

    let query = {}

	query['$or'] = [
		{
			comment: {
				$regex: keyword,
				$options: 'i'
			}
		},
	]

    Report.find(query).exec((err,results)=>{
        if(results)
            res.json({success : true, reports : results})
        else
            res.json({success : false})
    })
})

router.get('/reports/trainer/:trainerId',(req,res)=>{
	Report.find({trainerId : req.params.trainerId}).exec((err,results)=>{
        if(results)
            res.json({success : true, reports : results})
        else
            res.json({success : false})
    })
})

module.exports = router
