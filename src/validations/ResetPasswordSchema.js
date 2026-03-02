import * as yup from 'yup'

export const ResetPasswordSchema = yup.object({
    code: yup
        .string()
        .length(4, "Code must be 4 digits")
        .required("Code is required"),

    newPassword: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number"),

        email: yup
        .string()
        .required("Email is required")
        .email("Please enter a valid email")
}); 