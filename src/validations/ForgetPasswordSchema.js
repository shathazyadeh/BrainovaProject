import * as yup from 'yup'

export const ForgetPasswordSchema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .matches(
      /^(?:[a-z]\.[a-z]+@ptuk\.edu\.ps|[a-z]\.[a-z]\.[a-z]+@students\.ptuk\.edu\.ps)$/,
      "Please enter a valid PTUK email (e.g., a.hamad@ptuk.edu.ps or a.m.hamad@students.ptuk.edu.ps)",
    )
      .max(120, "Email must be at most 120 characters")
});