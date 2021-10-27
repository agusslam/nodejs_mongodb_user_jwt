const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser')
const userControl = require('../Controllers/user')
const productControl = require('../Controllers/product')
const verifyToken = require('../Controllers/verifyToken')
const verifyRoles = require('../Controllers/verifyRole')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//API USER
// routes.get('/user-api-get', userControl.home)
routes.get('/user-api-get', verifyToken.verifyToken, userControl.userData2)
routes.post('/user-api-post', userControl.new)
routes.post('/user-api-delete', userControl.del)
routes.post('/user-api-login', userControl.login)
routes.post('/user-api-logout', verifyToken.verifyToken, userControl.logout)
routes.get('/user-api-cek', verifyToken.verifyToken, userControl.cekToken)

//API PRODUCT
routes.get('/product-api-get', verifyToken.verifyToken, productControl.getProduct)
routes.post('/product-api-post', verifyToken.verifyToken, productControl.newProduct)
routes.post('/product-api-delete', verifyToken.verifyToken, productControl.delProduct)
routes.post('/product-api-update/:id', verifyToken.verifyToken, productControl.updProduct)
routes.post('/product-api-getid', verifyToken.verifyToken, productControl.getId)
routes.get('/product-api-getid2', verifyToken.verifyToken, productControl.vUpd)
routes.get('/product-api-new', verifyToken.verifyToken, productControl.vNew)
routes.post('/product-api-add', verifyToken.verifyToken, productControl.addProduct)
routes.post('/product-api-upload', verifyToken.verifyToken, productControl.uploadProduct)
routes.post('/product-api-search', verifyToken.verifyToken, productControl.productSearch)

//FRONTEND
routes.get('/user-view', userControl.vIndex)
routes.get('/user-login', userControl.vLogin)

//FRONTEND CRUD AUTH
routes.get('/user-home', productControl.vHome)
routes.get('/user-upd/:id', productControl.getId2)

//FRONTEND NEW
routes.get('/product-home', productControl.vHomeProduct)
routes.get('/product-login', productControl.vLoginProduct)
routes.get('/product-add', productControl.vNewProduct)
routes.get('/product-upd/:id', productControl.vGetId)
routes.get('/product-detail/:id', productControl.vDetId)

module.exports = routes