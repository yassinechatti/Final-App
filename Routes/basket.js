const express = require("express");
const isAuth = require("../middleware/isAuth");
const {
  addToBasket,
  getBasket,
  removeFromBasket,
} = require("../Controllers/basket");
const router = express.Router();

router.put("/add", addToBasket);
router.put("/remove", removeFromBasket);
router.get("/:_id", getBasket);
module.exports = router;
