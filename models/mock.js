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
        }
    ] ,
    Service : [
        {
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
            trainer : 2,
            name : 'Hawkeye Accuracy Muscle',
            description : '',
            type : 'type2',
            experience : '4',
            preferredLocation : 'Samrong',
            province : 'Samutprakarn',
            price : '300 - 500',
        },
        {
            trainer : 2,
            name : 'Hulk Muscle',
            description : '',
            type : 'type1',
            experience : '5',
            preferredLocation : 'Pra Pradang',
            province : 'Samutprakarn',
            price : '1500 - 1700',
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