var mongoose = require('mongoose')
var { User } = require('./schema')
var { Service } = require('./schema')
var { Trainer } = require('./schema')

var Entities = {

    User : [
        {
            username : 'test1',
            password : '123',
            email : 'marcus_dorothee@hotmail.com',
            first_name : 'Marcus',
            last_name : 'Dorothee',
            gender : 'Male',
            address : 'Nowhere',
            telephone_number : '0811234567',
            role : 'Trainer'
        },
        {
            username : 'test2',
            password : '123',
            email : 'dennis_burkley@gmail.com',
            first_name : 'Dennis',
            last_name : 'Burkley',
            gender : 'Female',
            address : 'Nowhere',
            telephone_number : '0898765432',
            role : 'Trainee'
        }
    ]
    ,
    Service : [
        {
            type : 'type1',
            experience : '0',
            preferredLocation : 'Bangkok',
            price : '2000',
            availableTimeSlot : '14.00-16.00'
        },
        {
            type : 'type2',
            experience : '2',
            preferredLocation : 'Samutprakarn',
            price : '5000',
            availableTimeSlot : '13.00-15.00'
        }
    ],
    Trainer : [
        {
            status : 'not available',
            rating : '7.0'
        },
        {
            status : 'available',
            rating : '9.1'
        }
    ]


}

module.exports.DB = {
    mockAll : function(){     
        let count = 0
        let length = Object.keys(mongoose.connection.collections).length
        for (var i in mongoose.connection.collections){
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