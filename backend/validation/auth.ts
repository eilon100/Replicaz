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
    body("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("User name must be 3 or more characters")
      .isLength({ max: 12 })
      .withMessage("User name must be 12 characters long")
      .matches(/^[a-z0-9A-Z]+$/)
      .withMessage("User name can only contain Latin letters and number")
      .custom((value, { req }) => {
        return User.findOne({ name: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Username already taken");
          }
        });
      }),
  ];
}
