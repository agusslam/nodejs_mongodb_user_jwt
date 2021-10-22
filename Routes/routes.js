const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser')
const userControl = require('../Controllers/user')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//API
// routes.get('/user-api-get', userControl.home)
routes.get('/user-api-get', userControl.userData)
routes.post('/user-api-post', userControl.new)
routes.post('/user-api-delete', userControl.del)
routes.post('/user-api-login', userControl.login)

//FRONTEND
routes.get('/user-view', userControl.vIndex)
routes.get('/user-login', userControl.vLogin)

module.exports = routes