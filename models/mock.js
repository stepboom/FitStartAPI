var mongoose = require('mongoose')

var {User} = require('./user.server.model')
var {Service} = require('./service.server.model')
var {Timeslot} = require('./timeSlot.server.model')
var { Reservation } = require('./reservation.server.model')
var { Review } = require('./review.server.model')
var { Report } = require('./report.server.model')


//var { User, Service, TimeSlot , Review } = require('./schema')


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
            gender : 1,
            address : 'Nowhere',
            telephoneNumber : '081-123-4567',
            role : 'Trainer',
            rating : 3,
            status : 1,
        },
        {
            _id : 2,
            username : 'test2',
            password : '12345678',
            email : 'dennis_burkley@gmail.com',
            firstName : 'Dennis',
            lastName : 'Burkley',
            gender : 1,
            address : 'Nowhere',
            telephoneNumber : '089-876-5432',
            role : 'Trainee',
        },
        {
            _id : 3,
            username : 'test3',
            password : '12345678',
            email : 'incognito_leo@gmail.com',
            firstName : 'Sophia',
            lastName : 'Prometheus',
            gender : 1,
            address : 'Nowhere',
            telephoneNumber : '088-888-7889',
            role : 'Trainer',
            rating : 5,
            status : 1,
        },
        {
            _id : 4,
            username : 'test4',
            password : '12345678',
            email : 'clairvoyance_demons@gmail.com',
            firstName : 'Insigne',
            lastName : 'Goretzka',
            gender : 1,
            address : 'Nowhere',
            telephoneNumber : '098-765-8877',
            role : 'Trainer',
            rating : 4,
            status : 1,
        },
        {
            _id : 5,
            username : 'test5',
            password : '12345678',
            email : 'speroni_romeo@gmail.com',
            firstName : 'Speroni',
            lastName : 'Romeo',
            gender : 1,
            address : 'Timeless Place',
            telephoneNumber : '096-567-1155',
            role : 'Trainee',
        },
        {
            _id : 6,
            username : 'admin',
            password : '12345678',
            email : 'admin_fitstart@gmail.com',
            firstName : 'Admin',
            lastName : 'Nimda',
            gender : 1,
            address : 'Somewhere only we know',
            telephoneNumber : '096-567-1155',
            role : 'Admin',
        }
    ] ,
    Service : [
        {
            _id : 1,
            trainerId : 1,
            name : 'Superman Muscle',
            description : description,
            type : 'Freelance',
            experience : 'น้อยกว่า 1',
            preferredLocation : 'Siam Paragon',
            province : 'กรุงเทพมหานคร',
            price : '750 - 1000',
        },
        {
            _id : 2,
            trainerId : 1,
            name : 'Unlimited Strength',
            description : description,
            type : 'ประจำฟิตเนส',
            experience : '1 - 5',
            preferredLocation : 'Bangkapi',
            province : 'กรุงเทพมหานคร',
            price : '500 - 700',
        },
        {
            _id : 3,
            trainerId : 1,
            name : 'Superficial Strength',
            description : description,
            type : 'Freelance',
            experience : '1 - 5',
            preferredLocation : 'Pra Pradang',
            province : 'กรุงเทพมหานคร',
            price : '200 - 400',
        },
        {

            _id : 4,
            trainerId : 1,
            name : 'Captain America Strength',
            description : description,
            type : 'Freelance',
            experience : '1 - 5',
            preferredLocation : 'Timeless',
            province : 'กรุงเทพมหานคร',
            price : '500 - 700',
        },
        {
            _id : 5,
            trainerId : 3,
            name : 'Hawkeye Accuracy Muscle',
            description : description,
            type : 'ประจำฟิตเนส',
            experience : '1 - 5',
            preferredLocation : 'Samrong',
            province : 'สมุทรปราการ',
            price : '300 - 500',
        },
        {

            _id : 6,
            trainerId : 3,
            name : 'Hulk Muscle',
            description : description,
            type : 'ประจำฟิตเนส',
            experience : '1 - 5',
            preferredLocation : 'Pra Pradang',
            province : 'สมุทรปราการ',
            price : '1500 - 1700',
        },
        {

            _id : 7,
            trainerId : 4,
            name : 'Thor Chest',
            description : description,
            type : 'Freelance',
            experience : '1 - 5',
            preferredLocation : 'Central World',
            province : 'กรุงเทพมหานคร',
            price : '2200 - 2500',
        },
        {

            _id : 8,
            trainerId : 4,
            name : 'The Iron Fist',
            description : description,
            type : 'ประจำฟิตเนส',
            experience : '1 - 5',
            preferredLocation : 'Central World',
            province : 'กรุงเทพมหานคร',
            price : '3500 - 3700',
        },
        {

            _id : 9,
            trainerId : 4,
            name : 'Six Ultimate Pack',
            description : description,
            type : 'ประจำฟิตเนส',
            experience : 'มากกว่า 10',
            preferredLocation : 'Chulalongkorn University',
            province : 'กรุงเทพมหานคร',
            price : '1500 - 1700',
        },
        {

            _id : 10,
            trainerId : 4,
            name : 'Power Stone Strength',
            description : description,
            type : 'Freelance',
            experience : '5 - 10',
            preferredLocation : 'Chulalongkorn University',
            province : 'กรุงเทพมหานคร',
            price : '1200 - 1500',
        }
    ],
    TimeSlot: [
        {
            _id : 1,
            serviceId : 1,
            startTime : '2017-05-19T14:00:00+07:00',
            endTime : '2017-05-19T16:00:00+07:00',
            status : 0,
        },
        {
            _id : 2,
            serviceId: 1,
            startTime : '2017-05-19T12:00:00+07:00',
            endTime : '2017-05-19T14:00:00+07:00',
            status : 0,
        },
        {
            _id : 3,
            serviceId: 1,
            startTime : '2017-05-19T18:00:00+07:00',
            endTime : '2017-05-19T20:00:00+07:00',
            status : 0,
        },
        {
            _id : 4,
            serviceId: 1,
            startTime : '2017-05-19T08:00:00+07:00',
            endTime : '2017-05-19T10:00:00+07:00',
            status : 0,
        },
        {
            _id : 5,
            serviceId: 2,
            startTime : '2017-05-19T14:00:00+07:00',
            endTime : '2017-05-19T16:00:00+07:00',
            status : 1,
        },
        {
            _id : 6,
            serviceId: 2,
            startTime : '2017-05-19T17:00:00+07:00',
            endTime : '2017-05-19T18:00:00+07:00',
            status : 1,
        },
        {
            _id : 7,
            serviceId: 3,
            startTime : '2017-05-19T14:00:00+07:00',
            endTime : '2017-05-19T16:00:00+07:00',
            status : 1,
        },
        {
            _id : 8,
            serviceId: 4,
            startTime : '2017-05-19T12:00:00+07:00',
            endTime : '2017-05-19T15:00:00+07:00',
            status : 1,
        },
        {
            _id : 9,
            serviceId: 4,
            startTime : '2017-05-19T10:00:00+07:00',
            endTime : '2017-05-19T12:00:00+07:00',
            status : 1,
        },
        {
            _id : 10,
            serviceId: 5,
            startTime : '2017-05-19T14:00:00+07:00',
            endTime : '2017-05-19T16:00:00+07:00',
            status : 0,
        },
        {
            _id : 11,
            serviceId: 5,
            startTime : '2017-05-19T12:00:00+07:00',
            endTime : '2017-05-19T14:00:00+07:00',
            status : 0,
        },
        {
            _id : 12,
            serviceId: 5,
            startTime : '2017-05-19T15:00:00+07:00',
            endTime : '2017-05-19T17:00:00+07:00',
            status : 1,
        },
        {
            _id : 13,
            serviceId: 6,
            startTime : '2017-05-19T10:00:00+07:00',
            endTime : '2017-05-19T12:00:00+07:00',
            status : 1,
        },
        {
            _id : 14,
            serviceId: 6,
            startTime : '2017-05-19T13:00:00+07:00',
            endTime : '2017-05-19T15:00:00+07:00',
            status : 1,
        },
        {
            _id : 15,
            serviceId: 7,
            startTime : '2017-05-19T16:00:00+07:00',
            endTime : '2017-05-19T18:00:00+07:00',
            status : 1,
        },
        {
            _id : 16,
            serviceId: 8,
            startTime : '2017-05-19T13:00:00+07:00',
            endTime : '2017-05-19T15:00:00+07:00',
            status : 1,
        },
        {
            _id : 17,
            serviceId: 8,
            startTime : '2017-05-19T10:00:00+07:00',
            endTime : '2017-05-19T12:00:00+07:00',
            status : 1,
        },
        {
            _id : 18,
            serviceId: 9,
            day: 'Tuesday',
            startTime : '2017-05-19T08:00:00+07:00',
            endTime : '2017-05-19T10:00:00+07:00',
            status : 0,
        },
        {
            _id : 19,
            serviceId: 10,
            startTime : '2017-05-19T09:00:00+07:00',
            endTime : '2017-05-19T10:00:00+07:00',
            status : 0,
        },
    ],
    Reservation : [
        {
            _id: 1,
            serviceId: 1,
            traineeId: 2,
            trainerId: 1,
            timeSlot: [1, 2],
            status: 1
        },
        {
            _id: 2,
            serviceId: 1,
            traineeId: 2,
            trainerId: 1,
            timeSlot: [3, 4],
            status: 0
        },
        {
            _id: 3,
            serviceId: 2,
            traineeId: 2,
            trainerId: 1,
            timeSlot: [5],
            status: 2,
            price : 600
        },
        {
            _id: 4,
            serviceId: 2,
            traineeId: 2,
            trainerId: 1,
            timeSlot: [6],
            status: 3,
            price : 650
        },
        {
            _id: 5,
            serviceId: 3,
            traineeId: 2,
            trainerId: 1,
            timeSlot: [7],
            status: 4,
            price : 300
        },
        {
            _id: 6,
            serviceId: 4,
            traineeId: 2,
            trainerId: 1,
            timeSlot: [8, 9],
            status: 5,
            price : 1200
        },
        {
            _id: 7,
            serviceId: 5,
            traineeId: 2,
            trainerId: 2,
            timeSlot: [10, 11],
            status: 1
        },
        {
            _id: 8,
            serviceId: 5,
            traineeId: 5,
            trainerId: 2,
            timeSlot: [10, 11],
            status: 1
        },
        {
            _id: 9,
            serviceId: 5,
            traineeId: 5,
            trainerId: 5,
            timeSlot: [12],
            status: 2,
            price : 450
        },
        {
            _id: 10,
            serviceId: 6,
            traineeId: 2,
            trainerId: 3,
            timeSlot: [13],
            status: 3,
            price : 1600
        },
        {
            _id: 11,
            serviceId: 6,
            traineeId: 2,
            trainerId: 3,
            timeSlot: [14],
            status: 4,
            price : 1700
        },
        {
            _id: 12,
            serviceId: 7,
            traineeId: 2,
            trainerId: 4,
            timeSlot: [15],
            status: 5,
            price : 2400
        },
        {
            _id: 13,
            serviceId: 8,
            traineeId: 5,
            trainerId: 4,
            timeSlot: [16],
            status: 5,
            price : 3500
        },
        {
            _id: 14,
            serviceId: 8,
            traineeId: 5,
            trainerId: 4,
            timeSlot: [17],
            status: 5,
            price : 3600
        },
    ],

    Review : [
        {
            _id : 1,
            trainerId : 1,
            reservationId : 6,
            comment : 'เป็นบริการที่พอใช้ได้ครับ ขอบคุณนะครับที่เสียเวลามาสอนผมครับ',
            rating : 3,
        },
        {
            _id: 2,
            trainerId: 4,
            reservationId: 12,
            comment: 'เป็นบริการที่ดีมากครับ ขอบคุณนะครับที่เสียเวลามาสอนผม',
            rating: 4,
        },
        {
            _id: 3,
            trainerId: 4,
            reservationId: 13,
            comment: 'เป็นบริการที่แย่มาก ไม่เห็นจะดีอย่างที่ว่าเลย ควรกลับไปฝึกมาใหม่ก่อน หรือเตรียมการสอนดี ๆ แล้วค่อยกลับมาใหม่นะครับ สอนแบบนี้ผมว่าไม่น่ามีใครอยากเรียนกับคุณ แต่ยังไงก็ขอบคุณนะครับที่เสียเวลามาสอนผม',
            rating: 1,
        },
        {
            _id: 4,
            trainerId: 4,
            reservationId: 14,
            comment: 'เป็นบริการที่ดีมากครับ ขอบคุณนะครับที่เสียเวลามาสอนผม',
            rating: 5,
        },
        
    ],
    Report: [
        {
            _id: 1,
            comment: 'ตัวเทรนเนอร์เองไม่สามารถจัดการการออกกำลังกายได้ถูกต้อง',
            trainerId: 1,
            traineeId: 2,
            status: 0,
        },
        {
            _id: 2,
            comment: 'แย่มากครับไม่สามารถให้ความคิดเห็นที่ดีได้เลยครับ',
            trainerId: 3,
            traineeId: 5,
            status: 1,
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