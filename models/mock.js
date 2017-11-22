var mongoose = require('mongoose')
//var { User, Service, TimeSlot } = require('./schema')

var description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac odio in mauris blandit pretium sit amet eu justo. Curabitur vestibulum, tellus a interdum vehicula, nunc magna vestibulum massa, viverra condimentum nisi elit id nunc. Fusce ultrices dictum accumsan.'

var Entities = {

    User : [
        {
            _id : 1,
            username : 'test1',
            password : '12345678',
            email : 'marcus_dorothee@hotmail.com',
            firstName : 'Marcus',
            lastName : 'Dorothee',
            gender : 'Male',
            address : 'Nowhere',
            telephoneNumber : '0811234567',
            role : 'Trainer',
            rating : 3
        },
        {
            _id : 2,
            username : 'test2',
            password : '12345678',
            email : 'dennis_burkley@gmail.com',
            firstName : 'Dennis',
            lastName : 'Burkley',
            gender : 'Female',
            address : 'Nowhere',
            telephoneNumber : '0898765432',
            role : 'Trainee'
        },
        {
            _id : 3,
            username : 'test3',
            password : '12345678',
            email : 'incognito_leo@gmail.com',
            firstName : 'Sophia',
            lastName : 'Prometheus',
            gender : 'Male',
            address : 'Nowhere',
            telephoneNumber : '0888887889',
            role : 'Trainer',
            rating : 5
        },
        {
            _id : 4,
            username : 'test4',
            password : '12345678',
            email : 'clairvoyance_demons@gmail.com',
            firstName : 'Insigne',
            lastName : 'Goretzka',
            gender : 'Male',
            address : 'Nowhere',
            telephoneNumber : '0987658877',
            role : 'Trainer',
            rating : 4
        }
    ] ,
    Service : [
        {
            _id : 1,
            trainerId : 1,
            name : 'Superman Muscle',
            description : description,
            type : 'type1',
            experience : '0',
            preferredLocation : 'Siam Paragon',
            province : 'Bangkok',
            price : '750 - 1000',
        },
        {
            _id : 2,
            trainerId : 1,
            name : 'Unlimited Strength',
            description : description,
            type : 'type2',
            experience : '2',
            preferredLocation : 'Bangkapi',
            province : 'Bangkok',
            price : '500 - 700',
        },
        {
            _id : 3,
            trainerId : 1,
            name : 'Superficial Strength',
            description : description,
            type : 'type3',
            experience : '1',
            preferredLocation : 'Pra Pradang',
            province : 'Bangkok',
            price : '200 - 400',
        },
        {

            _id : 4,
            trainerId : 1,
            name : 'Captain America Strength',
            description : description,
            type : 'type1',
            experience : '1',
            preferredLocation : 'Timeless',
            province : 'Bangkok',
            price : '500 - 700',
        },
        {
            _id : 5,
            trainerId : 3,
            name : 'Hawkeye Accuracy Muscle',
            description : description,
            type : 'type2',
            experience : '4',
            preferredLocation : 'Samrong',
            province : 'Samutprakarn',
            price : '300 - 500',
        },
        {

            _id : 6,
            trainerId : 3,
            name : 'Hulk Muscle',
            description : description,
            type : 'type1',
            experience : '5',
            preferredLocation : 'Pra Pradang',
            province : 'Samutprakarn',
            price : '1500 - 1700',
        },
        {

            _id : 7,
            trainerId : 4,
            name : 'Thor Chest',
            description : description,
            type : 'type2',
            experience : '1',
            preferredLocation : 'Central World',
            province : 'Bangkok',
            price : '2200 - 2500',
        },
        {

            _id : 8,
            trainerId : 4,
            name : 'The Iron Fist',
            description : description,
            type : 'type3',
            experience : '2',
            preferredLocation : 'Central World',
            province : 'Bangkok',
            price : '3500 - 3700',
        },
        {

            _id : 9,
            trainerId : 4,
            name : 'Six Ultimate Pack',
            description : description,
            type : 'type1',
            experience : '1',
            preferredLocation : 'Chulalongkorn University',
            province : 'Bangkok',
            price : '1500 - 1700',
        },
        {

            _id : 10,
            trainerId : 4,
            name : 'Power Stone Strength',
            description : description,
            type : 'type2',
            experience : '1',
            preferredLocation : 'Chulalongkorn University',
            province : 'Bangkok',
            price : '1200 - 1500',
        }
    ],
    TimeSlot: [
        {
            serviceId : 1,
            startTime : '2017-05-19T14:00:00+07:00',
            endTime : '2017-05-19T16:00:00+07:00',
        },
        {
            serviceId: 1,
            startTime : '2017-05-19T12:00:00+07:00',
            endTime : '2017-05-19T14:00:00+07:00',
        },
        {
            serviceId: 1,
            startTime : '2017-05-19T18:00:00+07:00',
            endTime : '2017-05-19T20:00:00+07:00',
        },
        {
            serviceId: 1,
            startTime : '2017-05-19T08:00:00+07:00',
            endTime : '2017-05-19T10:00:00+07:00',
        },
        {
            serviceId: 2,
            startTime : '2017-05-19T14:00:00+07:00',
            endTime : '2017-05-19T16:00:00+07:00',
        },
        {
            serviceId: 2,
            startTime : '2017-05-19T17:00:00+07:00',
            endTime : '2017-05-19T18:00:00+07:00',
        },
        {
            serviceId: 3,
            startTime : '2017-05-19T14:00:00+07:00',
            endTime : '2017-05-19T16:00:00+07:00',
        },
        {
            serviceId: 4,
            startTime : '2017-05-19T12:00:00+07:00',
            endTime : '2017-05-19T15:00:00+07:00',
        },
        {
            serviceId: 4,
            startTime : '2017-05-19T10:00:00+07:00',
            endTime : '2017-05-19T12:00:00+07:00',
        },
        {
            serviceId: 5,
            startTime : '2017-05-19T14:00:00+07:00',
            endTime : '2017-05-19T16:00:00+07:00',
        },
        {
            serviceId: 5,
            startTime : '2017-05-19T12:00:00+07:00',
            endTime : '2017-05-19T14:00:00+07:00',
        },
        {
            serviceId: 5,
            startTime : '2017-05-19T15:00:00+07:00',
            endTime : '2017-05-19T17:00:00+07:00',
        },
        {
            serviceId: 6,
            startTime : '2017-05-19T10:00:00+07:00',
            endTime : '2017-05-19T12:00:00+07:00',
        },
        {
            serviceId: 6,
            startTime : '2017-05-19T13:00:00+07:00',
            endTime : '2017-05-19T15:00:00+07:00',
        },
        {
            serviceId: 7,
            startTime : '2017-05-19T16:00:00+07:00',
            endTime : '2017-05-19T18:00:00+07:00',
        },
        {
            serviceId: 8,
            startTime : '2017-05-19T13:00:00+07:00',
            endTime : '2017-05-19T15:00:00+07:00',
        },
        {
            serviceId: 8,
            startTime : '2017-05-19T10:00:00+07:00',
            endTime : '2017-05-19T12:00:00+07:00',
        },
        {
            serviceId: 9,
            day: 'Tuesday',
            startTime : '2017-05-19T08:00:00+07:00',
            endTime : '2017-05-19T10:00:00+07:00',
        },
        {
            serviceId: 10,
            startTime : '2017-05-19T09:00:00+07:00',
            endTime : '2017-05-19T10:00:00+07:00',
        },
    ],

}

module.exports.DB = {
    mockAll : function(){     
        let count = 0
        let length = Object.keys(mongoose.connection.collections).length - 1
        for (var i in mongoose.connection.collections){
            if(mongoose.connection.collections[i].name != "identitycounters")
                mongoose.connection.collections[i].remove((err)=>{
                    ++count
                    if(count === length) {
                        let promises = []
                        for(let model in Entities){
                            promises.push(mongoose.model(model).create(Entities[model]))
                        }
                        Promise.all(promises)
                    }
                })
        }
    }
}