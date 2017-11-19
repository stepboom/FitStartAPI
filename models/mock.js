var mongoose = require('mongoose')
var { User, Service } = require('./schema')

var Entities = {

    User : [
        {
            _id : 1,
            username : 'test1',
            password : '123',
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
            password : '123',
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
            password : '123',
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
            password : '123',
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
            description : '',
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
            description : '',
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
            description : '',
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
            description : '',
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
            description : '',
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
            description : '',
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
            description : '',
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
            description : '',
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
            description : '',
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
            description : '',
            type : 'type2',
            experience : '1',
            preferredLocation : 'Chulalongkorn University',
            province : 'Bangkok',
            price : '1200 - 1500',
        }
    ],

}

module.exports.DB = {
    mockAll : function(){     
        let count = 0
        let length = Object.keys(mongoose.connection.collections).length
        for (var i in mongoose.connection.collections){
            //console.log(mongoose.connection.collections[i])
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