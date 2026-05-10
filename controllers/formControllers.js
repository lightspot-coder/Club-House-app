const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const validateUser = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("first name can not be empty")
    .isAlpha()
    .withMessage("first name must only contain letters"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("last name can not be empty")
    .isAlpha()
    .withMessage("last name only contain letter"),
  body("userName")
    .notEmpty()
    .withMessage("user name can not be empty")
    .isEmail()
    .withMessage("user name not valid"),
  body("password").notEmpty().withMessage("Password can not be empty"),
  body("confirmPassword").custom((value, { req }) => {
    console.log(req.body.password);
    console.log(value);
    if (value !== req.body.password) {
      throw new Error("confirm password doesn't match");
    }
    return true;
  }),
];

const validateForm = [
  validateUser,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("sing-up", {
        title: "sign up error",
        errors: errors.array(),
      });
    }
    console.log("go to the next middleware");
    next();
  },
];

module.exports = {
  validateForm,
};
