const productModel = require('../Models/product')
const userModel = require('../Models/user')
const jwt = require('jsonwebtoken')
const uploadImg = require('../Controllers/upload')
const fs = require('fs')
var FormData = require('form-data');


exports.getProduct = async(req,res) => {
    try {
        const userSearch = await userModel.findOne({username: req.userId})
        if(userSearch.role == "member"){
            const allData = await productModel.find({uip: req.userId})
            res.status(200).send({auth: "member", 
                                  result:{
                                    name: userSearch.nama,
                                    data: allData
                                  }
                                })
        }else{
            const allData = await productModel.find()
            res.status(200).send({auth: "guest", result:{name: userSearch.nama, data: allData}})
        }                    
    } catch (error) {
        res.status(500).send({ message: `failed get data ${error.message}`, status: 500 })
    }
}

exports.vNew = async (req,res) => {
    try {
        res.status(200).send({ message: "Success Post Data", status: 200 });
    } catch (error) {
        res.status(400).send({ message: `Failed : ${error}` });
    }
}

exports.newProduct = async (req,res) => {
    const productPost = new productModel ({
        uip: req.body.uip,
        img: req.body.img,
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

exports.addProduct = async (req,res) => {
    const productPost = new productModel ({
        uip: req.userId,
        img: req.body.img,
        nameprod: req.body.nameprod,
        stock: req.body.stock,
        price: req.body.price,
    })
    try {   
        const product = await productPost.save()
        res.status(200).send({ message: "Success Post Data", status: 200, result: product });
    } catch (error) {
        res.status(400).send({ message: `Failed : ${error}` });
    }
}

exports.uploadProduct = async (req,res) => {
    try {   
        await uploadImg(req,res)        
        res.status(200).send({ message: "Success Upload Image", status: 200 });
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
        if(req.body.img == null || req.body.img == undefined){
            data = { nameprod: req.body.nameprod, stock: req.body.stock, price: req.body.price }
        }else { 
            const imgAda = await productModel.findOne({_id: req.params.id})
            if(imgAda.img !== null || imgAda.img !== undefined){
                let path = `./public/uploads/${imgAda.img}`
                // console.log(imgAda.img)
                await fs.unlink(path, (err) => {
                    if(err){ console.log(err) }
                    // console.log('File deleted!')
                })
            }
            
            data = { nameprod: req.body.nameprod, stock: req.body.stock, price: req.body.price, img: req.body.img 
        }}

        const updId = await productModel.updateOne({ _id: req.params.id },{ $set: data }, {upsert: true})
        res.status(200).send({ message: "Success Update", status: 200 })     
    } catch (error) {
        res.status(400).send({message: `Error : ${error}`, status: 400})
    }    
}

exports.getId = async(req,res) => {
    try {
        // console.log(req.params.id)
        const data = await productModel.findOne({_id: req.body.id})
        res.status(200).send({message: "Success Get Data", status: 200, result: data })
    } catch (error) {
        res.status(400).send({message: "Failed Get ID", status: 400})
    }
}

exports.getId2 = async(req,res) => {
    try {
        // console.log(req.body.id)
        const data = await productModel.findOne({_id: req.params.id})
        // res.send({result: data})
        res.render('update', {result: data})
    } catch (error) {
        res.status(400).send({message: "Failed Get ID", status: 400})
    }
}

//FRONT END
exports.vHome = (req,res) => {
    res.render('home')
}

exports.vUpd = (req,res) => {
    const data = productModel.findOne({_id: req.params.id})       
    res.status(200).send({message: "Success Get ID", status:200, result: data})
    // console.log(data)
    // res.render('update', {result:data})
    
}

exports.updProduct2 = async(req,res) => {
    res.render('update')
}

exports.cekToken = async(req,res) => {
    res.status(200).send({ status: 200, auth: true })
}

//FRONT END NEW
exports.vHomeProduct = (req,res) => {
    res.render('product')
}

exports.vLoginProduct = (req,res) => {
    res.render('product-login', { status: 200, auth: true })
}

exports.vNewProduct = (req,res) => {
    res.render('product-add')
}

exports.vGetId = async(req,res) => {
    try {
        const data = await productModel.findOne({_id: req.params.id})
        // res.send({result: data})
        res.render('product-update', {result: data})
    } catch (error) {
        res.status(400).send({message: "Failed Get ID", status: 400})
    }
}

exports.vDetId = async(req,res) => {
    try {
        const data = await productModel.findOne({_id: req.params.id})
        // res.send({result: data})
        res.render('product-detail', {result: data})
    } catch (error) {
        res.status(400).send({message: "Failed Get ID", status: 400})
    }
}