const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const port = 8004
const routes = require('./Routes/routes')
var multer = require('multer');
// var forms = multer();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use(forms.fields()); 

app.use(routes)
app.set('view engine', 'ejs');
app.use('/', express.static('public'));

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

//models
const ConnectionMongoDB = require('./Models/connection')
ConnectionMongoDB()