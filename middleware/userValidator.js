const { body, validationResult } = require("express-validator");

exports.registerValidator = () => [
  body("lastname", "Last name is required !").notEmpty(),
  body("firstname", "First name is required !").notEmpty(),
  body("email", "Please enter a valid email").isEmail(),
  body("password", "Password must contain at least 6 characters").isLength({
    min: 6,
  }),
];
exports.loginValidator = () => [
  body("email", "Please enter a valid email").isEmail(),
  body("password", "Password must contain at least 6 characters").isLength({
    min: 6,
  }),
];
exports.validations = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
