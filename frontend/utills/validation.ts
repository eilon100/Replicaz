import * as yup from "yup";

export const ValidationSchema = (page: string) => {
  const yupObject = {
    userName: yup
      .string()
      .required("User name is required")
      .trim()
      .min(3, "User name must be 3 or more characters")
      .max(12, "User name must be 12 characters long")
      .matches(
        /^[a-z0-9A-Z]+$/,
        "User name can only contain Latin letters and number "
      )
      .matches(/[a-zA-Z]/, "Username requires a Latin letters"),
    firstName: yup
      .string()
      .trim()
      .required("First name is required")
      .min(3, "First name must be 3 or more characters")
      .max(15, "First name must be 15 characters long")
      .matches(/^[a-zA-Z]+$/, "First name can only contain Latin letters")
      .matches(/[a-zA-Z]/, "First name requires a Latin letters"),
    lastName: yup
      .string()
      .trim()
      .required("Last name is required")
      .min(3, "Last name must be 3 or more characters")
      .max(15, "Last name must be 15 characters long")
      .matches(/^[a-zA-Z]+$/, "Lsat name can only contain Latin letters")
      .matches(/[a-zA-Z]/, "Last name requires a Latin letters"),
    email: yup
      .string()
      .trim()
      .email("Enter a valid email")
      .required("Email is required"),
    pass: yup
      .string()
      .required("No password provided.")
      .min(8, "Password must be min 8 characters")
      .max(16, "Password must be 16 characters long")
      .matches(/^\S*$/, "Spaces are not allowed")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter"),
    confirm: yup
      .string()
      .required("Confirm your password")
      .matches(/^\S*$/, "Spaces are not allowed")
      .oneOf([yup.ref("pass"), null], "Password does not match"),
  };

  if (page === "register") {
    return yup.object({
      userName: yupObject.userName,
      firstName: yupObject.firstName,
      lastName: yupObject.lastName,
      email: yupObject.email,
      pass: yupObject.pass,
      confirm: yupObject.confirm,
    });
  }
  if (page === "signin") {
    return yup.object({
      email: yupObject.email,
      pass: yupObject.pass,
    });
  }
  if (page === "resetPassword") {
    return yup.object({
      email: yupObject.email,
    });
  }
  if (page === "newPassword") {
    return yup.object({
      pass: yupObject.pass,
      confirm: yupObject.confirm,
    });
  }
};
