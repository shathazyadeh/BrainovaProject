import * as yup from "yup"; //yup library: بنكتب من خلالها قواعد التحقق (validation schema)

export const RegisterSchema = yup.object({
  fullName: yup
    .string()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters"),

  userName: yup
      .string()
      .required("User Name is required")
      .min(3, "User Name must be at least 3 characters")
      .matches(/^\S+$/, "User Name must not contain spaces"),

  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),

  phoneNumber: yup
    .string()
    .required("Phone number is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),

    supervisorUserId: yup
    .string()
    .required("Supervisor is required")
});