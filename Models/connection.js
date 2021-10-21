const Mongoose = require('mongoose')

const ConnectDB = async () => {
    try {
        //mongodb connection
        const Conn = await Mongoose.connect(
            'mongodb+srv://admin:admin123@learn.sq6ud.mongodb.net/learn?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        console.log(`MongoDB connected : ${Conn.connection.host}`)
    } catch (error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = ConnectDB