const jwt = require('jsonwebtoken');

exports.verifyToken = async (req,res,next) => {
    let tokenAuth = req.headers.authorization
    // console.log(tokenAuth)
    // check token
    if ( tokenAuth === undefined || tokenAuth === null || tokenAuth === '' ){
        res.status(403).send({ message: `failed get data notoken`, status: 403, auth: false })
    }else {        
        //split token
        let newTokenAuth = tokenAuth.split(' ')        
        //cek token is bearer
        if ( newTokenAuth[0] != 'Bearer' ){
            res.status(403).send({ message: `failed get data noB`, status: 403, auth: false })
        }else {
            await jwt.verify(newTokenAuth[1], 'keyRahasia-Bangetiniloh,jangn sampai bocor aduhhhhh', (err, decoded) => {
                if(err){
                    return res.status(500).send({ message: "Failed Get Data", auth: false })
                }
                req.userId = decoded.username;
                next();
            })
        }
    }
}