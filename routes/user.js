var express = require('express')
var {User} = require('../models/schema')

var router = express.Router()

router.get('/users',(req,res)=>{
    User.find({}).exec((err,results) => {
        if(results)
            res.json({users : results})
        else
            res.json('No Users')
    })
})

module.exports = router