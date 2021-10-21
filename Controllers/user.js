const userModel = require('../Models/user')

exports.home = async (req,res) => {
    try {
        const allData = await userModel.find()
        res.send({ message: "Success Get Data", result: allData });
    } catch (error) {
        res.send({ message: `Failed : ${error}` });
    }
}

exports.new = async (req,res) => {
    const userPost = new userModel ({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        address: req.body.address
    })
    try {
        const user = await userPost.save()
        res.send({ message: "Success Post Data", result: user });
    } catch (error) {
        res.send({ message: `Failed : ${error}` });
    }
}