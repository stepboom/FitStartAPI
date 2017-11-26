//Declare Node Module Dependencies
var bodyParser = require('body-parser');
var cors = require('cors')
var express = require('express')
var mongoose = require('mongoose')
var morgan = require('morgan')
var passport = require('passport')

//Declare Sub Module Dependencies
var user = require('./routes/user')
var service = require('./routes/service')
var mock = require('./routes/mock')
var timeSlot = require('./routes/timeSlot')
var reservation = require('./routes/reservation')
var review = require('./routes/review')
var report = require('./routes/report')


//Initialize MongoDB Connection
mongoose.connect('mongodb://localhost/fitstartdb', {
    useMongoClient: true,
})

mongoose.Promise = require('bluebird');

//Initialize Express Server Connection
var app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))

// Use Passport Session
app.use(passport.initialize());
app.use(passport.session());
require('./passport')(passport)

// Use Express Router
app.use(user)
app.use(service)
app.use(mock)
app.use(timeSlot)
app.use(reservation)
app.use(review)
app.use(report)


app.get('/',(req,res)=>{
    res.status(200).json('Welcome to Fit Start API')
})

app.listen(4000,()=>{
    console.log('Server is running on port 4000')
})
