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

//API PRODUCT
routes.get('/product-api-get', verifyToken.verifyToken, productControl.getProduct)
routes.post('/product-api-post', verifyToken.verifyToken, productControl.newProduct)
routes.post('/product-api-delete', verifyToken.verifyToken, productControl.delProduct)
routes.post('/product-api-update', verifyToken.verifyToken, productControl.updProduct)
routes.post('/product-api-getid', verifyToken.verifyToken, productControl.getId)
routes.get('/product-api-getid2', verifyToken.verifyToken, productControl.vUpd)

//FRONTEND
routes.get('/user-view', userControl.vIndex)
routes.get('/user-login', userControl.vLogin)

//FRONTEND CRUD AUTH
routes.get('/user-home', productControl.vHome)
routes.get('/user-upd/:id', productControl.getId2)

module.exports = routes