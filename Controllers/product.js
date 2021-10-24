const productModel = require('../Models/product')
const userModel = require('../Models/user')
const jwt = require('jsonwebtoken')

exports.getProduct = async(req,res) => {    
    //data yg dikeluarkan bisa apa aja
    try {
        const userSearch = await userModel.findOne({username: req.userId})
        if(userSearch.role == "member"){
            const allData = await productModel.find({uip: req.userId})
            res.status(200).send({auth: "member", result:allData})
        }else{
            const allData = await userModel.find()
            res.status(200).send({auth: "guest", result:allData})
        }                    
    } catch (error) {
        res.status(500).send({ message: `failed get data ${error.message}`, status: 500 })
    }
}

exports.newProduct = async (req,res) => {
    const productPost = new productModel ({
        uip: req.body.uip,
        image: req.body.image,
        nameprod: req.body.nameprod,
        stock: req.body.stock,
        price: req.body.price
    })
    try {
        const product = await productPost.save()
        res.status(200).send({ message: "Success Post Data", status: 200, result: product });
    } catch (error) {
        res.status(400).send({ message: `Failed : ${error}` });
    }
}

exports.delProduct = async(req,res) => {
    try {
        const productDel = await productModel.deleteOne({ _id: req.body.id })
        res.send({message: "Success Delete Data", type: 200, result: productDel });
    } catch (error) {
        res.send({ message: `Failed : ${error}` });
    }
}

exports.updProduct = async(req,res) => {
    try {
        await productModel.updateOne({ _id: req.body.id },{
            $set: { img: req.body.img, nameprod: req.body.nameprod, stock: req.body.stock, price: req.body.price }
        }, {upsert: true})
        res.status(200).send({ message: "Success Update", status: 200 })
    } catch (error) {
        res.status(400).send({message: "Failed Update", status: 400})
    }    
}