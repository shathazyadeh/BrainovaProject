import * as Yup from "yup";

export const SubmitFeedbackSchema = Yup.object().shape({
  comment: Yup.string()
    .required("Feedback is required")
    .min(3, "Feedback must be at least 3 characters"),
});