import * as yup from "yup";

export const CreateQuestionSchema = yup.object({
  text: yup
    .string()
    .trim()
    .required("Question text is required")
    .min(5, "Question must be at least 5 characters"),

  code: yup
    .string()
    .trim()
    .required("Code is required")
    .min(1, "Code cannot be empty"),

  order: yup
    .number()
    .typeError("Order must be a number")
    .required("Order is required")
    .positive("Order must be positive")
    .integer("Order must be an integer")
    .transform((val, original) => original === "" ? undefined : Number(original)), // 

  options: yup
    .string()
    .nullable(),
});