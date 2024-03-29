var express = require('express')
var { Review } = require('../models/review.server.model')
var { User } = require('../models/user.server.model')

var router = express.Router()

router.post('/review', (req, res) => {
	let newReview = new Review()
    newReview.trainerId = req.body.trainerId
    newReview.reservationId = req.body.reservationId
    newReview.comment = req.body.comment
    newReview.rating = req.body.rating

    newReview.save((err,result)=>{
        if (result) {
           Review.aggregate([{ $match: { trainerId: parseInt(req.body.trainerId)}},{ $group: { _id: null, avg: { $avg: "$rating" } } }], (err, orders)=> {
               if (orders) {
                   User.findByIdAndUpdate(parseInt(req.body.trainerId), { rating: Math.round(orders[0].avg) }, (err, updated) => {
                       if (updated) {
                           res.json({ success: true, review: result })
                       } else {
                           res.json('Error Updating Trainer Rating ' + err)
                       }
                   })
               } else {
                   res.json('Error Calculating Trainer Rating ' + err)
               }
            })
        } else {
            res.json('Error Saving Review ' + err)
        }
    })
})

router.get('/reviews',(req,res)=>{
    Review.find({}).exec((err,results) => {
        if(results)
            res.json({reviews : results})
        else
            res.json('No Reviews')
    })
})

router.route('/reviews/:id')
    .get((req, res) => {
        Review.findOne({ _id: req.params.id }).exec((err, result) => {
            if (result) {
                res.json({ review: result })
            } else {
                res.json('No Reviews')
            }
        })
    })
    .patch((req, res) => {
        Review.findById(req.params.id, (err, result) => {
            if (result) {
                for (var attrname in req.body) {
                    result[attrname] = req.body[attrname]
                }
                result.save((err, result) => {
                    if (result) {
                        res.json({ review: result })
                    } else {
                        res.json('Error Saving Review : ' + err)
                    }
                })
            } else {
                res.json('No Reviews')
            }
        })
    })
    .delete((req, res) => {
        Review.findByIdAndRemove(req.params.id, (err, result) => {
            if (result) {
                res.json({ success: true })
            } else {
                res.json('Error Deleting Review ' + err)
            }
        })
})

router.get('/reviews/search/items',(req,res)=>{
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

    Review.find(query).exec((err,results)=>{
        if(results)
            res.json({success : true, reviews : results})
        else
            res.json({success : false})
    })
})

router.get('/reviews/trainer/:trainerId',(req,res)=>{
	Review.find({trainerId : req.params.trainerId}).exec((err,results)=>{
        if(results)
            res.json({success : true, reviews : results})
        else
            res.json({success : false})
    })
})

router.get('/reviews/reservation/:reservationId', (req, res) => {
    Review.find({ reservationId: req.params.reservationId }).exec((err, results) => {
        if (results)
            res.json({ success: true, reviews: results })
        else
            res.json({ success: false })
    })
})


module.exports = router
