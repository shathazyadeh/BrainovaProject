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

options: yup
  .array()
  .of(
    yup.string().trim().required("Option cannot be empty")
  )
  .min(2, "Single choice question must have at least two options.")
  .required("Options are required"),
});