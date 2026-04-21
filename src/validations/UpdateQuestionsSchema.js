import * as yup from "yup";

export const UpdateQuestionSchema = yup.object({
  text: yup
    .string()
    .trim()
    .required("Question text is required")
    .min(5, "Question must be at least 5 characters"),

  code: yup
    .string()
    .trim()
    .required("Code is required"),

  order: yup
    .number()
    .required("Order is required"),

  options: yup
    .string()
    .nullable(),
});