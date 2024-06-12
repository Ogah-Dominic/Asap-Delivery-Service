const express = require("express")
const router = express.Router()
const {
    addToCart,
    removeFromCart,
    deleteItemFroCart,
    getCart}=require("../CONTROLLER/cart")


    router.route("/add").post(addToCart)
    router.route("/remove").get(removeFromCart)
    router.route("/getAllCart").get(getCart)
    router.route("/delete/:id").delete(deleteItemFroCart)
 
     module.exports = router;
