import * as yup from "yup";

export const postValidationSchema = (page: string) => {
  const yupObject = {
    title: yup
      .string()
      .required("Title is required")
      .min(3, "Title must be 3 or more characters")
      .max(15, "Title must be 15 characters long"),
    body: yup.string().max(300, "Title must be 300 characters long"),
  };

  return yup.object({
    title: yupObject.title,
    body: yupObject.body,
  });
};
