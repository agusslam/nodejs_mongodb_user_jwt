const Mongoose = require('mongoose')

var Schema = new Mongoose.Schema(
    {
    username:{ type:String },
    password: { type:String },
    email: { type:String},
    age: { type:String},
    address: { type:String},
    role: { type:String},
    }
)

//nama database
const Tuser = Mongoose.model('tuser', Schema)

module.exports = Tuser
