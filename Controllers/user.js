const userModel = require('../Models/user')
const jwt = require('jsonwebtoken')
const verifyToken = require('../Controllers/verifyToken')

exports.home = async (req,res) => {
    try {
        const userSearch = await userModel.findOne({username: req.userId})
        if(userSearch.role == "member"){
            const allData = await userModel.find()
            res.send({ message: "Success Get Data", role: 'member', result: allData });
        }        
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
            res.status(400).send({ message: 'Failed Login', status: 400, auth: false })
        }else {
            if( (req.body.username === '' || req.body.username === null) || (req.body.password === '' || req.body.password === null)){
                res.status(400).send({ message: 'Failed Login', status: 400, auth: false })
            }else {
                const userData = await userModel.findOne({username: req.body.username})
                if(userData === null){
                    res.status(400).send({ message: 'Failed Login', status: 400, auth: false })
                }else {
                    if(userData.password !== req.body.password){
                        res.status(400).send({ message: 'Failed Login', status: 400, auth: false })
                    }else {
                        let token = jwt.sign({ username: userData.username }, 'keyRahasia-Bangetiniloh,jangn sampai bocor aduhhhhh', { expiresIn: '1h' })
                        let passingData = (token)
                        res.status(200).send({message: 'Success Login', status: 200, result: passingData});
                    }
                }
            }
        }
        
    } catch (error) {
        res.send({message: error})
    }    
}

exports.logout = async(req,res) => {
    let tokenAuth = req.headers.authorization  
    let newTokenAuth = tokenAuth.split(' ') 

    try {
        res.status(200).send({message: "Successfuly Logout", status: 200, auth: false})
    } catch (error) {
        res.send({message: error})
    }    
}

exports.userData = async(req,res) => {
    let tokenAuth = req.headers.authorization
    // console.log(tokenAuth)
    // check token
    if ( tokenAuth === undefined || tokenAuth === null || tokenAuth === '' ){
        res.status(403).send({ message: `failed get data`, status: 403 })
    }else {        
        //split token
        let newTokenAuth = tokenAuth.split(' ')        
        //cek token is bearer
        if ( newTokenAuth[0] != 'Bearer' ){
            res.status(403).send({ message: `failed get data`, status: 403 })
        }else {
        //     //cek token
            const token = jwt.verify(newTokenAuth[1], 'keyRahasia-Bangetiniloh,jangn sampai bocor aduhhhhh', (err,result) => {
                if(err) return false
                if(result) return result
                
            })
            //aksi jika true atau false
            if(!token){
                res.status(401).send({ message: `failed get data`, status: 401 })
            }else{
                //data yg dikeluarkan bisa apa aja
                try {
                    const allData = await userModel.find()
                    res.status(200).send({result:allData})
                } catch (error) {
                    res.status(500).send({ message: `failed get data`, status: 500 })
                }
                // const allData = await userModel.find()
                // res.send({ message: "Success Get Data", result: allData });
                // userModel.find().then(response => {
                //     res.send({
                //         message: 'Success get data permissions',
                //         result: response,
                //         status: 200
                //     })
                // })
                // .catch(err => {
                //     res.status(500).send({ message: `failed get data`, status: 500 })
                // })
            }

        }
    }
}

exports.userData2 = async(req,res) => {    
                //data yg dikeluarkan bisa apa aja
                try {
                    const userSearch = await userModel.findOne({username: req.userId})
                    if(userSearch.role == "member"){
                        const allData = await userModel.find()
                        res.status(200).send({auth: "member", result:allData})
                    }else{
                        const allData = await userModel.find()
                        res.status(200).send({auth: "guest", result:allData})
                    }                    
                } catch (error) {
                    res.status(500).send({ message: `failed get data ${error.message}`, status: 500 })
                }
                // const allData = await userModel.find()
                // res.send({ message: "Success Get Data", result: allData });
                // userModel.find().then(response => {
                //     res.send({
                //         message: 'Success get data permissions',
                //         result: response,
                //         status: 200
                //     })
                // })
                // .catch(err => {
                //     res.status(500).send({ message: `failed get data`, status: 500 })
                // })
}

//FRONT END
exports.vIndex = (req,res) => {
    res.render('index')
}

exports.vLogin = (req,res) => {
    res.render('login')
}



