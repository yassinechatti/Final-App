const express = require("express");
const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../Controllers/category");

const isAuth = require("../middleware/isAuth");

const router = express.Router();
router.get("/", getCategories);
router.post("/", isAuth, addCategory);
router.put("/:_id", isAuth, updateCategory);
router.delete("/:_id", isAuth, deleteCategory);

module.exports = router;
