const express = require('express')
const app = express()


//Routes 
var health = require('./routes/health')
var api = require('./routes/api')
// use Routes
//Equivalent to localhost:3000 or https://api.flexplatform.eu-de.containers.appdomain.cloud/api/v1/template/health via ingress

app.use("/static/", express.static("../build/static"))
app.use( "*", express.static("../build" ));
 
app.listen(3000)
