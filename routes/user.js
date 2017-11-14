var express = require('express')
var {User} = require('../models/schema')
var passport = require('passport')

var router = express.Router()

router.get('/users',(req,res)=>{
    User.find({}).exec((err,results) => {
        if(results)
            res.json({users : results})
        else
            res.json('No Users')
    })
})

router.get('/search',(req,res)=>{
    let username = req.query.username
    User.find({username : username}).exec((err,results)=>{
        if(results)
            res.json({users : results})
        else
            res.json('No Users')
    })
})


router.post('/signin',(req,res)=>{{
	passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			res.status(400).send(info);
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			//user.salt = undefined;

			req.login(user, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.json(user);
				}
			});
		}
	})(req, res, next);
}});


module.exports = router