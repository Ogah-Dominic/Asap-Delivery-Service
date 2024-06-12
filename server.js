const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config()
const PointRouter =require("./ROUTER/user")
const RestuarantRouter = require("./ROUTER/Restuarant")
const CartRouter = require("./ROUTER/cart")
const Menu = require("./ROUTER/manu")
const Category = require("./ROUTER/category")
const Order = require("./ROUTER/order")

const app  = express()
app.use(express.json)

app.use("/api/",PointRouter);
app.use("/api/",RestuarantRouter);
app.use("/api/",CartRouter);
app.use("/api/",Menu);
app.use("/api/",Category);
app.use("/api/",Order)


const DB = process.env.DATABASE
mongoose.connect(DB).then(()=>{
    console.log("Successfully connected to Database")
}).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server is now connected to ${process.env.PORT}`)
    })
})
