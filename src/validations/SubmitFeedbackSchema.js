import * as yup from "yup";

export const SubmitFeedbackSchema = yup.object().shape({
  comment: yup.string()
    .required("Feedback is required")
    .min(3, "Feedback must be at least 3 characters")
    .max(3000, "Comment must be at most 3000 characters"),
});