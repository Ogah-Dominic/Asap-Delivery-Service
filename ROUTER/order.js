const router = require("express").Router()
const{
    placeOrder,
    getAllOrders,
    getAllRestOrders
}=require("../ROUTER/order");

router.post("placeorder", placeOrder);
router.get("getallorder", getAllOrders);
router.get("getallrestorder", getAllRestOrders);

module.exports = router