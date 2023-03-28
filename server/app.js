const express = require("express");
const cors = require('cors');
const routerIndex = require('./routes/index')

// Init the server
const app = express()
app.use(express.json())
app.use(cors())



// main root
app.get('/', (req, res, next) => {
    res.status(200).json('Welcome')
})

//API's

app.use("/api", routerIndex)



app.use("*", function (req, res, next) {
    res.status(404).json("Not Found")

})

module.exports = app