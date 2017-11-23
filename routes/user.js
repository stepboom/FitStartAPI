var express = require('express')
var {User} = require('../models/user.server.model')
var passport = require('passport')
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var crypto = require('crypto')

var router = express.Router()

router.get('/users',(req,res)=>{
    User.find({}).exec((err,results) => {
        if(results)
            res.json({users : results})
        else
            res.json('No Users')
    })
})

router.get('/users/:id',(req,res)=>{
	User.findOne({_id : req.params.id}).exec((err,result)=>{
		if(result){
			res.json({user : result})
		} else {
			res.json('No Users')
		}
	})
})

router.get('/users/username/:username',(req,res)=>{
	User.findOne({username : req.params.username}).exec((err,result)=>{
		if(result){
			res.json({user : result})
		} else {
			res.json('No Users')
		}
	})
})

router.post('/users/search',(req,res)=>{
    let name = req.body.name
	
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
        if(result)
            res.json({users : results})
        else
            res.json('No Users')
    })
})

router.post('/trainers/search',(req,res)=>{
	let name = req.body.name

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

router.post('/renewPassword', (req, res) => {
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
