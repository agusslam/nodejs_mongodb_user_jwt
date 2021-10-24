const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser')
const userControl = require('../Controllers/user')
const verifyToken = require('../Controllers/verifyToken')
const verifyRoles = require('../Controllers/verifyRole')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//API
// routes.get('/user-api-get', userControl.home)
routes.get('/user-api-get', verifyToken.verifyToken, userControl.userData2)
routes.post('/user-api-post', userControl.new)
routes.post('/user-api-delete', userControl.del)
routes.post('/user-api-login', userControl.login)
routes.post('/user-api-logout', verifyToken.verifyToken, userControl.logout)

//FRONTEND
routes.get('/user-view', userControl.vIndex)
routes.get('/user-login', userControl.vLogin)

//FRONTEND CRUD AUTH
routes.get('/user-home', userControl.vHome)

module.exports = routes