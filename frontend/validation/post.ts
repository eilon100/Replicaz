import * as yup from "yup";

export const postValidationSchema = (page: string) => {
  const yupObject = {
    title: yup.string().trim().max(49, "Title must be 50 characters long"),
    editTitle: yup
      .string()
      .trim()
      .required()
      .max(49, "Title must be 50 characters long"),
    body: yup.string().max(300, "Title must be 300 characters long").trim(),
    comment: yup
      .string()
      .required()
      .max(300, "Comment must be 300 characters long")
      .trim(),
  };
  if (page === "postBox")
    return yup.object({
      title: yupObject.title,
      body: yupObject.body,
    });
  if (page === "edit")
    return yup.object({
      title: yupObject.title,
      body: yupObject.body,
    });
  if (page === "comment")
    return yup.object({
      body: yupObject.comment,
    });
};
