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

router.post('/signup', (req,res)=>{
    let newUser = new User();
    newUser.username = req.body.username
    newUser.password = req.body.password
    newUser.email = req.body.email
    newUser.first_name = req.body.first_name
    newUser.last_name = req.body.last_name
    newUser.gender = req.body.gender
    newUser.address = req.body.address
    newUser.telephone_number = req.body.telephone_number
    newUser.role = req.body.role

    newUser.save((err,results)=>{
        if(results){

        newUser.password = undefined;
		    newUser.salt = undefined;

			req.login(newUser, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.json({user : newUser});
				}
			});


        } else {
            res.json('Error Saving Users ' + err)
        }
    })
})

router.post('/signin',(req,res,next)=>{{
	passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			res.status(400).send(info);
		} else {
			// Remove sensitive data before login
			user.password = undefined;
		    user.salt = undefined;

			req.login(user, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.json({user : user});
				}
			});
		}
	})(req, res, next);
}});

router.post('/resetpassword', (req, res) => {
  var passwordDetails = req.body;
  //mockup functon
	if (req.user) {
		if (passwordDetails.newPassword) {
			User.findById(req.user.id, function(err, user) {
				if (!err && user) {
					if (user.authenticate(passwordDetails.currentPassword)) {
						if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
							user.password = passwordDetails.newPassword;

							user.save(function(err) {
								if (err) {
									return res.status(400).send({
										message: errorHandler.getErrorMessage(err)
									});
								} else {
									req.login(user, function(err) {
										if (err) {
											res.status(400).send(err);
										} else {
											res.send({
												message: 'Password changed successfully'
											});
										}
									});
								}
							});
						} else {
							res.status(400).send({
								message: 'Passwords do not match'
							});
						}
					} else {
						res.status(400).send({
							message: 'Current password is incorrect'
						});
					}
				} else {
					res.status(400).send({
						message: 'User is not found'
					});
				}
			});
		} else {
			res.status(400).send({
				message: 'Please provide a new password'
			});
		}
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}

})

module.exports = router
