const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/User");
const Basket = require("../Model/Basket");
exports.register = async (req, res) => {
  try {
    const newUser = req.body;
    const UserToFind = await User.findOne({ email: newUser.email });
    if (UserToFind) {
      return res.status(400).send({ msg: "email already exists" });
    }
    let userAdded = new User({ ...newUser });
    const salt = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    userAdded.password = hashedPassword;
    userAdded.role = newUser.role;

    await userAdded.save();

    const basket = new Basket({ productQuantity: [], user: userAdded._id });
    await basket.save();
    const token = jwt.sign({ id: userAdded._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).send({ msg: "User Added", user: userAdded, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "contact cannot be added", error });
  }
};
exports.login = async (req, res) => {
  try {
    const newUser = req.body;
    const userToCheck = await User.findOne({
      email: newUser.email,
    });
    if (!userToCheck) {
      return res.status(400).send({ errors: [{ msg: "Bad credentials !!!" }] });
    }
    const isMatch = await bcrypt.compare(
      newUser.password,
      userToCheck.password
    );
    if (!isMatch) {
      return res.status(400).send({ errors: [{ msg: "Bad credentials !!!" }] });
    }
    const token = jwt.sign({ id: userToCheck._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .send({ msg: "Login Sucessfully", user: userToCheck, token });
  } catch (error) {
    res.status(400).send({ msg: "User cannot login" });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const newUser = req.body;
    const userToCheck = await User.findOne({
      email: newUser.email,
      role: "admin",
    });
    if (!userToCheck) {
      return res.status(400).send({ errors: [{ msg: "Bad credentials !!!" }] });
    }
    const isMatch = await bcrypt.compare(
      newUser.password,
      userToCheck.password
    );
    if (!isMatch) {
      return res.status(400).send({ errors: [{ msg: "Bad credentials !!!" }] });
    }
    const token = jwt.sign({ id: userToCheck._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .send({ msg: "Login Sucessfully", user: userToCheck, token });
  } catch (error) {
    res.status(400).send({ msg: "User cannot login" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const usersToFind = await User.find();
    res.status(200).send({ msg: "Users Found", usersToFind });
  } catch (error) {
    res.status(400).send({ msg: "Users cannot be Found", error });
  }
};
exports.getUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const userToFind = await User.findOne({ _id });
    res.status(200).send({ msg: "User found", User: userToFind });
  } catch (error) {
    res.status(400).send({ msg: "User cannot be found", error });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const id = req.body._id;
    const userToUpdate = await User.findById(id);
    userToUpdate.firstname = req.body.firstname;
    userToUpdate.lastname = req.body.lastname;
    userToUpdate.phone = req.body.phone;
    userToUpdate.address = req.body.address;
    userToUpdate.save();
    res.status(200).send({ msg: "User updated", user: userToUpdate });
  } catch (error) {
    res.status(400).send({ msg: "User Cannot be updated" });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { _id } = req.params;
    await User.deleteOne({ _id });
    res.status(200).send({ msg: "User deleted" });
  } catch (error) {
    res.status(400).send({ msg: "User canot be deleted" });
  }
};
exports.currentUser = (req, res) => {
  res.send(req.user);
};
