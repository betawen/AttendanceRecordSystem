const express = require('express')
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
const app = express()
let router = require('./routes/index')
app.use(bodyParser.json({ limit: '1000kb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(router)


app.listen(3000, () => console.log('Example app listening http://localhost:3000!'))
