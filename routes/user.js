var express = require('express')
var {User} = require('../models/user.server.model')
var passport = require('passport')
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var config = require('../config')

var router = express.Router()

router.get('/users',(req,res)=>{
    User.find({}).exec((err,results) => {
        if(results)
            res.json({users : results})
        else
            res.json('No Users')
    })
})

router.route('/users/:id')
	.get((req,res)=>{
		console.log(req.user)
		User.findOne({_id : req.params.id}).exec((err,result)=>{
			if(result){
				result.password = undefined
				result.salt = undefined
				res.json({user : result})
			} else {
				res.json('No Users')
			}
		})
	})
	.patch((req,res,next)=>{
		var token = req.body.token || req.headers['x-access-token'] || req.query.token
		try {
			var jwtObj = jwt.verify(token,config.TOKEN_SECRET)
			if(jwtObj.id != req.params.id){
				res.status(403).json({success : false})
			} else {
				User.findById(req.params.id,(err,result)=>{
					if(result){
						for (var attrname in req.body) { 
							result[attrname] = req.body[attrname] 
						}
						result.save((err,result)=>{
							if(result){
								result.password = undefined
								result.salt = undefined
								res.json({user : result})
							} else {
								res.json('Error Saving User : ' + err)
							}
						})
					} else {
						res.json('No Users')
					}
				})
			}
		} catch (e) {
			res.status(403).json({success : false})
		}
		
	})
	.delete((req,res)=>{
		var token = req.body.token || req.headers['x-access-token'] || req.query.token
		try {
			var jwtObj = jwt.verify(token,config.TOKEN_SECRET)
			if(jwtObj.id != req.params.id){
				res.status(403).json({success : false})
			} else {
				User.findByIdAndRemove(req.params.id,(err,result)=>{
					if(result){
						res.json({success :true})
					} else {
						res.json('Error Deleting User ' + err)
					}
				})
			}
		} catch (e) {
			res.status(403).json({success : false})
		}
	})

router.get('/users/username/:username',(req,res)=>{
	User.findOne({username : req.params.username}).exec((err,result)=>{
		if(result){
			result.password = undefined
			result.salt = undefined
			res.json({user : result})
		} else {
			res.json('No Users')
		}
	})
})

router.get('/users/search/items',(req,res)=>{
	let name = req.query.name

	
	let query = {}

	query['$or'] = [
		{
			username: {
				$regex: name,
				$options: 'i'
			}
		},
		{
			firstName: {
				$regex: name,
				$options: 'i'
			}
		},
		{
			lastName: {
				$regex: name,
				$options: 'i'
			}
		}
	]

    User.find(query).exec((err,results)=>{
        if(results)
            res.json({users : results})
        else
            res.json('No Users')
    })
})

router.get('/trainers/search/items',(req,res)=>{
	let name = req.query.name

	let query = {}

	query['$or'] = [
		{
			username: {
				$regex: name,
				$options: 'i'
			}
		},
		{
			firstName: {
				$regex: name,
				$options: 'i'
			}
		},
		{
			lastName: {
				$regex: name,
				$options: 'i'
			}
		}
	]

	query['role'] = 'Trainer'

    User.find(query).exec((err,results)=>{
        if(results)
            res.json({success : true, trainers : results})
        else
            res.json({success : false})
    })
})

router.get('/users/hasEmail/:email',(req,res)=>{
	let email = req.params.email
	User.findOne({email : email},(err,results)=>{
		if(results){
			res.json({hasEmail : true})
		} else {
			res.json({hasEmail : false})
		}
	})
})

router.get('/reset/:token',(req,res)=>{
	let token = req.params.token
	User.findOne({resetPasswordToken : token},(err,results)=>{
		if(results){
			res.json({hasToken : true})
		} else {
			res.json({hasToken : false})
		}
	})
})

router.post('/forgetPassword',(req,res)=>{
	var email = req.body.email
	
	var transporter = nodemailer.createTransport(smtpTransport({
		service: 'gmail',
		auth: {
			user: 'supakritboom@gmail.com',
			pass: 'qwer][po'
		}
	}))

	crypto.randomBytes(20, (err, buf) => {
		var token = buf.toString('hex')
		User.findOne({ email: email }, (err, user)=> {
			if (!user) {
				res.send({success : false})
			}
	
			user.resetPasswordToken = token;
	
			user.save((err)=>{
				if(err){
					res.send({success : false})
				} else {
					var mailOptions = {
						from: 'supakritboom@gmail.com',
						to: email,
						subject: 'ยืนยันการเปลี่ยนรหัสผ่านจากระบบ FitStart',
						text: `กรุณาคลิกที่ลิ้งก์ http://localhost:3000/newpassword/${token} เพื่อเข้าสู่การตั้งรหัสผ่านใหม่`
					};
					  
					transporter.sendMail(mailOptions, function(error, info){
					if (error) {
						console.log(error)
						res.send({message : 'success'})
					} else {
						res.send({message : 'fail'})
						console.log('Email sent: ' + info.response);
					}
					});
				}
			})
		  })
	})

})

router.post('/resetPassword',(req,res)=>{
	var password = req.body.password
	let token = req.body.token

	User.findOne({resetPasswordToken : token},(err,user)=>{
		if(user){
			user.password = password
			user.save((err,user)=>{
				if(err){
					res.json({success : false})
				}
				else{
					res.json({success : true})
				}
			})
		} else {
			res.json({success : false})
		}
	})
	
})

router.post('/signup', (req,res)=>{
    let newUser = new User();
    newUser.username = req.body.username
    newUser.password = req.body.password
    newUser.email = req.body.email
    newUser.firstName = req.body.firstName
    newUser.lastName = req.body.lastName
    newUser.gender = req.body.gender
    newUser.address = req.body.address
    newUser.telephoneNumber = req.body.telephoneNumber
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
			var token = jwt.sign({id : user._id, role : user.role},config.TOKEN_SECRET)

			req.login(user, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.json({user : user, token : token});
				}
			});
		}
	})(req, res, next);
}});

router.post('/renewPassword', (req, res) => {
	var passwordDetails = req.body
	var token = req.body.token || req.headers['x-access-token'] || req.query.token
	try {
		var jwtObj = jwt.verify(token,config.TOKEN_SECRET)
		if (passwordDetails.newPassword) {
			User.findById(jwtObj.id, function(err, user) {
				if (!err && user) {
					if (user.authenticate(passwordDetails.currentPassword)) {
						if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
							user.password = passwordDetails.newPassword;

							user.save(function(err) {
								if (err) {
									return res.status(400).send({
										success : false,
										message: errorHandler.getErrorMessage(err)
									});
								} else {
									req.login(user, function(err) {
										if (err) {
											res.status(400).send(err);
										} else {
											res.send({
												success : true,
												message: 'Password changed successfully'
											});
										}
									});
								}
							});
						} else {
							res.status(400).send({
								success : false,
								message: 'Passwords do not match'
							});
						}
					} else {
						res.status(400).send({
							success : false,
							message: 'Current password is incorrect'
						});
					}
				} else {
					res.status(400).send({
						success : false,
						message: 'User is not found'
					});
				}
			});
		} else {
			res.status(400).send({
				success : false,
				message: 'Please provide a new password'
			});
		}
	} catch (e) {
	  res.status(403).json({success : false})
  }
		
})

module.exports = router
