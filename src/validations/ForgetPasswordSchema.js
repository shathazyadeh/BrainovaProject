import * as yup from 'yup'

export const ForgetPasswordSchema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^[a-z]\.[a-z]\.[a-z]+@students\.ptuk\.edu\.ps$/,
        "Please enter a valid PTUK student email"
      )
      .max(120, "Email must be at most 120 characters")
});