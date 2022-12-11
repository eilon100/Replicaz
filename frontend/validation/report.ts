import * as yup from "yup";

export const reportValidationSchema = () => {
  const yupObject = {
    body: yup
      .string()
      .required()
      .trim()
      .max(300, "Title must be 300 characters long"),
  };

  return yup.object({
    body: yupObject.body,
  });
};
