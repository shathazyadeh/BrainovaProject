import * as yup from 'yup'

export const ForgetPasswordSchema = yup.object({
    email: yup
        .string()
        .required("Email is required")
        .email("Please enter a valid email")
}); 