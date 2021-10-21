const express = require('express');
const routes = express.Router();
const userControl = require('../Controllers/user')

routes.get('/user-api-get', userControl.home)
routes.post('/user-api-post', userControl.new)

module.exports = routes