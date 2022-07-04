const mongoose = require('mongoose')

const {Schema} = mongoose

const peopleModel = new Schema(
    {
        firstName: { type: String, required : true,},
        lastName:  { type: String, required : true,} ,
        username:  { type: String, required : true, minLength: 3, maxLength: 10, unique: true},
        password:  { type: String, required : true },
        email:     { type: String, required : true, unique : true},
        address:   { type: String, required : true},
        phone:     { type: String, required : true, unique: true},
    }
)
module.exports = mongoose.model('People', peopleModel)