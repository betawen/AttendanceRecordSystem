const express = require('express')
const app = express()
let router = require('./routes/index')
app.use(router)


app.listen(3000, () => console.log('Example app listening http://localhost:3000!'))
