//Declare Node Module Dependencies
var cors = require('cors')
var express = require('express')
var mongoose = require('mongoose')
var morgan = require('morgan')

//Declare Sub Module Dependencies
var user = require('./routes/user')
var mock = require('./routes/mock')

//Initialize MongoDB Connection
mongoose.connect('mongodb://localhost/fitstartdb', {
    useMongoClient: true,
})

mongoose.Promise = require('bluebird');

//Initialize Express Server Connection
var app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(user)
app.use(mock)

app.get('/',(req,res)=>{
    res.status(200).json('Welcome to Fit Start API')
})

app.listen(4000,()=>{
    console.log('Server is running on port 4000')
})
