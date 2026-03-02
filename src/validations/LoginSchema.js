import * as yup from 'yup'

export const LoginSchema = yup.object({
    emailOrUserName: yup
      .string()
      .required("Email or Username is required"),
    
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number"),

}); 