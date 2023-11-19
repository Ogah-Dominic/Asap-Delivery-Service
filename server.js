const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config()
const AsapRouter =require("./ROUTER/router")
const app  = express()
app.use(express.json)
app.use("/api/",AsapRouter)

const DB = process.env.DATABASE
mongoose.connect(DB).then(()=>{
    console.log("Successfully connected to Database")
}).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server is now connected to ${process.env.PORT}`)
    })
})
