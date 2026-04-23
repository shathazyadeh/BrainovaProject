import * as yup from "yup";

export const CreateQuestionSchema = yup.object({
  text: yup
  .string()
  .trim()
  .required("Question text is required")
  .min(5, "Question must be at least 5 characters")
  .matches(/.\p{L}./u, "Question must contain letters"),

  code: yup
    .string()
    .trim()
    .required("Code is required")
    .max(100, "Code must not exceed 100 characters"),

  order: yup
    .number()
    .typeError("Order must be a number")
    .required("Order is required")
    .positive("Order must be positive")
    .integer("Order must be an integer")
    .transform((val, original) => original === "" ? undefined : Number(original)), // 
});