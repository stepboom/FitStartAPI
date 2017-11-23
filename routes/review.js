var express = require('express')
var {Review} = require('../models/review.server.model')

var router = express.Router()

router.post('/review', (req,res)=>{
	let newReview = new Review()
    newReview.reviewId = req.body.reviewId
    newReview.trainerId = req.body.trainerId
    newReview.comment = req.body.comment
    newReview.rating = req.body.rating
    

    newReview.save((err,results)=>{
        if (results) {
            req.body.reviewId.map((reviewId) => {
                review.reviewd = review._id;
                return review
            })
        
            review.insertMany(req.body.reviewId, (err, reviewId) => {
                if(err){
                    res.json('Error Saving review :' + err)
                } else {
                    res.json({ success: true, review: newReview});
                }
              })
        } else {
            res.json('Error Saving Review :' + err)
        }
    })
})

router.get('/reviews',(req,res)=>{
    Review.find({}).exec((err,results) => {
        if(results)
            res.json({reviews : results})
        else
            res.json('No Users')
    })
})

router.get('/reviews/:id',(req,res)=>{
	review.findOne({_id : req.params.id}).exec((err,result)=>{
        if(result)
            res.json({success : true, service : result})
        else
            res.json({success : false})
    })
})

router.post('/reviews/search',(req,res)=>{
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
