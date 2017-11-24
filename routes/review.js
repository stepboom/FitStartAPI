var express = require('express')
var {Review} = require('../models/review.server.model')

var router = express.Router()

router.post('/review', (req, res) => {
	let newReview = new Review()
    newReview.trainerId = req.body.trainerId
    newReview.comment = req.body.comment
    newReview.rating = req.body.rating
    

    newReview.save((err,result)=>{
        if (result) {
            res.json({ success: true, review: newReview });
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

router.get('/reviews/:id',(req,res)=>{
	Review.findOne({_id : req.params.id}).exec((err,result)=>{
        if(result)
            res.json({success : true, review : result})
        else
            res.json({success : false})
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
            res.json({success : true, services : results})
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

module.exports = router
