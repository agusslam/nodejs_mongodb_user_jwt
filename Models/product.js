const Mongoose = require('mongoose')

var Schema = new Mongoose.Schema(
    {
    uip:{ type:String },
    img: { type:String },
    nameprod: { type:String},
    stock: { type:String},
    price: { type:String},
    }
)

//nama database
const Tproduct = Mongoose.model('tproduct', Schema)

module.exports = Tproduct
