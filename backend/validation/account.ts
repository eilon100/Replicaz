import { body } from "express-validator";

export const UserNewPasswordValidation = () => {
  return [
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
  ];
};
