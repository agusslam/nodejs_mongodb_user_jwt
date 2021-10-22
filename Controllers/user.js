const userModel = require('../Models/user')
const jwt = require('jsonwebtoken')

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

exports.del = async(req,res) => {
    try {
        const userDel = await userModel.deleteOne({ _id: req.body.id })
        res.send({message: "Success Delete Data", type: 200, result: userDel });
    } catch (error) {
        res.send({ message: `Failed : ${error}` });
    }
}

exports.login = async(req,res) => {
    try {
        if(!req.body){
            res.send({ message: 'Failed Login', status: 400 })
        }else {
            if( (req.body.username === '' || req.body.username === null) || (req.body.password === '' || req.body.password === null)){
                res.send({ message: 'Failed Login', status: 400 })
            }else {
                const userData = await userModel.findOne({username: req.body.username})
                if(userData === null){
                    res.send({ message: 'Failed Login', status: 400 })
                }else {
                    if(userData.password !== req.body.password){
                        res.send({ message: 'Failed Login', status: 400 })
                    }else {
                        let token = jwt.sign({
                            uid: userData._id, username: userData.username, email: userData.email
                        }, 'keyRahasia')
                        let passingData = {
                            id: userData._id, 
                            username: userData.username, 
                            email: userData.email, 
                            age: userData.age,
                            address: userData.address,
                            token: token,
                            type_token: 'Bearer'
                        }
                        res.send({message: 'Success Login', status: 200, result: passingData});
                    }
                }
            }
        }
        
    } catch (error) {
        res.send({message: error})
    }    
}



//FRONT END
exports.vIndex = (req,res) => {
    res.render('index')
}

exports.vLogin = (req,res) => {
    res.render('login')
}