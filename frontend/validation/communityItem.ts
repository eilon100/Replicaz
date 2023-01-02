import * as yup from "yup";

export const itemValidationSchema = (page: string) => {
  const yupObject = {
    images: yup.array().min(1),
    name: yup
      .string()
      .required()
      .max(29, "Name must be 30 characters long")
      .trim(),
    bestBatchName: yup
      .string()
      .required()
      .max(29, "Name must be 30 characters long")
      .trim(),
    bestBatchPrice: yup.number().required(),
    bestBatchUrl: yup.string().required().trim(),
    cheapestBatchName: yup
      .string()
      .required()
      .max(29, "Name must be 30 characters long")
      .trim(),
    cheapestBatchPrice: yup.number().required(),
    cheapestBatchUrl: yup.string().required().trim(),
    description: yup
      .string()
      .max(49, "Comment must be 50 characters long")
      .trim(),
  };
  if (page === "Shoes")
    return yup.object({
  
      name: yupObject.name,
      bestBatchName: yupObject.bestBatchName,
      bestBatchPrice: yupObject.bestBatchPrice,
      bestBatchUrl: yupObject.bestBatchUrl,
      cheapestBatchName: yupObject.cheapestBatchName,
      cheapestBatchUrl: yupObject.cheapestBatchUrl,
      cheapestBatchPrice: yupObject.cheapestBatchPrice,
      description: yupObject.description,
    });
};
