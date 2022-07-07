const express = require("express");
const {
  getProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../Controllers/product");

const isAuth = require("../middleware/isAuth");

const router = express.Router();
router.get("/products", getProducts);
router.get("/:_id", getProduct);
router.post("/", addProduct);
router.put("/:_id", isAuth, updateProduct);
router.delete("/:_id", isAuth, deleteProduct);

module.exports = router;
