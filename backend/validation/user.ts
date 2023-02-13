import { body } from "express-validator";

export function UserPatchValidation() {
  return [
    body("firstName")
      .matches(/^[a-zA-Z]+$/)
      .toLowerCase()
      .withMessage("First name can only contain Latin letters")
      .isLength({ min: 3 })
      .withMessage("First name must be 3 or more characters")
      .isLength({ max: 15 })
      .withMessage("First name must be 12 characters long"),
    body("phone")
      .matches(/^[0-9]+$/)
      .withMessage("Phone can only contain numbers")
      .isLength({ max: 10, min: 10 })
      .withMessage("Phone must be 10 characters long"),
    body("lastName")
      .matches(/^[a-zA-Z]+$/)
      .toLowerCase()
      .withMessage("Last name can only contain Latin letters")
      .isLength({ min: 3 })
      .withMessage("Last name must be 3 or more characters")
      .isLength({ max: 15 })
      .withMessage("Last name must be 12 characters long"),
  ];
}
