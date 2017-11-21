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
            first_name : 'Marcus',
            last_name : 'Dorothee',
            gender : 'Male',
            address : 'Nowhere',
            telephone_number : '0811234567',
            role : 'Trainer',
            rating : 3
        },
        {
            _id : 2,
            username : 'test2',
            password : '12345678',
            email : 'dennis_burkley@gmail.com',
            first_name : 'Dennis',
            last_name : 'Burkley',
            gender : 'Female',
            address : 'Nowhere',
            telephone_number : '0898765432',
            role : 'Trainee'
        },
        {
            _id : 3,
            username : 'test3',
            password : '12345678',
            email : 'incognito_leo@gmail.com',
            first_name : 'Sophia',
            last_name : 'Prometheus',
            gender : 'Male',
            address : 'Nowhere',
            telephone_number : '0888887889',
            role : 'Trainer',
            rating : 5
        },
        {
            _id : 4,
            username : 'test4',
            password : '12345678',
            email : 'clairvoyance_demons@gmail.com',
            first_name : 'Insigne',
            last_name : 'Goretzka',
            gender : 'Male',
            address : 'Nowhere',
            telephone_number : '0987658877',
            role : 'Trainer',
            rating : 4
        }
    ] ,
    Service : [
        {
            _id : 1,
            trainer : 1,
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
            trainer : 1,
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
            trainer : 1,
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
            trainer : 1,
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
            trainer : 3,
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
            trainer : 3,
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
            trainer : 4,
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
            trainer : 4,
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
            trainer : 4,
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
            trainer : 4,
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
            day : 'Monday',
            startTime : '14.00',
            endTime : '16.00',
        },
        {
            serviceId: 1,
            day: 'Monday',
            startTime: '12.00',
            endTime: '14.00',
        },
        {
            serviceId: 1,
            day: 'Tuesday',
            startTime: '14.00',
            endTime: '16.00',
        },
        {
            serviceId: 1,
            day: 'Wednesday',
            startTime: '08.00',
            endTime: '10.00',
        },
        {
            serviceId: 2,
            day: 'Monday',
            startTime: '14.00',
            endTime: '16.00',
        },
        {
            serviceId: 2,
            day: 'Tuesday',
            startTime: '14.00',
            endTime: '16.00',
        },
        {
            serviceId: 3,
            day: 'Monday',
            startTime: '14.00',
            endTime: '16.00',
        },
        {
            serviceId: 4,
            day: 'Thursday',
            startTime: '12.00',
            endTime: '15.00',
        },
        {
            serviceId: 4,
            day: 'Friday',
            startTime: '10.00',
            endTime: '12.00',
        },
        {
            serviceId: 5,
            day: 'Monday',
            startTime: '14.00',
            endTime: '16.00',
        },
        {
            serviceId: 5,
            day: 'Tuesday',
            startTime: '12.00',
            endTime: '14.00',
        },
        {
            serviceId: 5,
            day: 'Wednesday',
            startTime: '13.00',
            endTime: '15.00',
        },
        {
            serviceId: 6,
            day: 'Wednesday',
            startTime: '13.00',
            endTime: '15.00',
        },
        {
            serviceId: 6,
            day: 'Friday',
            startTime: '13.00',
            endTime: '15.00',
        },
        {
            serviceId: 7,
            day: 'Friday',
            startTime: '16.00',
            endTime: '18.00',
        },
        {
            serviceId: 8,
            day: 'Wednesday',
            startTime: '13.00',
            endTime: '15.00',
        },
        {
            serviceId: 8,
            day: 'Thursday',
            startTime: '10.00',
            endTime: '12.00',
        },
        {
            serviceId: 9,
            day: 'Tuesday',
            startTime: '08.00',
            endTime: '10.00',
        },
        {
            serviceId: 10,
            day: 'Thursday',
            startTime: '09.00',
            endTime: '11.00',
        },
    ],

}

module.exports.DB = {
    mockAll : function(){     
        let count = 0
        let length = Object.keys(mongoose.connection.collections).length
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