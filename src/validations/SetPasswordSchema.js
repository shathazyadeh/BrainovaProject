import * as yup from "yup"; 

export const SetPasswordSchema = yup.object({
  newPassword: yup
     .string()
     .required("Password is required")
     .min(8, "Password must be at least 8 characters")
     .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
     .matches(/[a-z]/, "Password must contain at least one lowercase letter")
     .matches(/[0-9]/, "Password must contain at least one number"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),   
 
});