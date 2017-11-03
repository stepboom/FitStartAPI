var  express = require('express')
var router = express.Router()
var {DB} = require('../models/mock')

router.get('/mock', (req,res)=>{
    DB.mockAll()
    res.send('Mocked Successful')
})

module.exports = router