import { body } from "express-validator";
import User from "../modal/user";

export function UserSignUpValidation() {
  return [
    body("email")
      .isEmail()
      .trim()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("firstName")
      .trim()
      .matches(/^[a-zA-Z]+$/)
      .withMessage("First name can only contain Latin letters")
      .isLength({ min: 3 })
      .withMessage("First name must be 3 or more characters")
      .isLength({ max: 15 })
      .withMessage("First name must be 12 characters long"),
    body("phone")
      .matches(/^[0-9]+$/)
      .withMessage("Phone can only contain numbers")
      .isLength({ max: 10 })
      .withMessage("Phone must be 10 characters long"),
    body("lastName")
      .trim()
      .matches(/^[a-zA-Z]+$/)
      .withMessage("Last name can only contain Latin letters")
      .isLength({ min: 3 })
      .withMessage("Last name must be 3 or more characters")
      .isLength({ max: 15 })
      .withMessage("Last name must be 12 characters long"),
    body("password")
      .trim()
      .not()
      .isEmpty()
      .matches(/[0-9]/)
      .withMessage("Password requires a number")
      .matches(/[a-z]/)
      .withMessage("Password requires a lowercase letter")
      .matches(/[A-Z]/)
      .withMessage("Password requires an uppercase letter"),
    body("userName")
      .trim()
      .isLength({ min: 3 })
      .withMessage("User name must be 3 or more characters")
      .isLength({ max: 12 })
      .withMessage("User name must be 12 characters long")
      .matches(/^[a-z0-9A-Z]+$/)
      .withMessage("User name can only contain Latin letters and number")
      .custom((value, { req }) => {
        return User.findOne({ userName: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("User name already taken");
          }
        });
      }),
  ];
}
