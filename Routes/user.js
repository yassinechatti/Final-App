const express = require("express");
const {
  register,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
  currentUser,
  adminLogin,
} = require("../Controllers/user");
const isAuth = require("../middleware/isAuth");
const {
  registerValidator,
  validations,
  loginValidator,
} = require("../middleware/userValidator");
const router = express.Router();
router.get("/allUsers", getUsers);
router.get("/currentUser", isAuth, currentUser);
router.get("/:_id", getUser);
router.post("/register", registerValidator(), validations, register);
router.post("/login", loginValidator(), validations, login);
router.post("/adminLogin", loginValidator(), validations, adminLogin);
router.put("/update", updateUser);
router.delete("/:_id", deleteUser);
module.exports = router;
