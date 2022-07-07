const express = require("express");
const { addOrder, getUserOrders, deleteO } = require("../Controllers/order");
const router = express.Router();

router.post("/create", addOrder);
router.get("/:_id", getUserOrders);
//router.delete("/delete", deleteO);

module.exports = router;
