import * as yup from "yup"; //yup library: بنكتب من خلالها قواعد التحقق (validation schema)

export const UpdateUserInfoSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters")
    .matches(
      /^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/,
      "Start each word with a capital letter and use letters only",
    ),

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
    .trim()
    .required("Phone Number is required")
    .matches(
      /^(059|056)\d{7}$/,
      "The PhoneNumber field is not a valid Palestinian phone number",
    ),

  password: yup
    .string()
    // نحدد أن الحقل من نوع string

    .nullable()
    // يسمح أن تكون القيمة null (يعني لا يوجد باسورد)

    .notRequired()
    // الحقل غير إجباري في الفورم (المستخدم ممكن ما يغير الباسورد)

    .test(
      "password-validation",
      // اسم الاختبار (أي اسم فقط للتعريف)

      "Password must be 8 characters with upper, lower and number",
      // رسالة الخطأ التي ستظهر إذا فشل التحقق

      (value) => {
        // value هي القيمة التي كتبها المستخدم في حقل الباسورد

        if (!value) return true;
        // إذا لم يكتب المستخدم باسورد (القيمة فارغة أو null)
        // نرجع true حتى يمر التحقق ولا يظهر خطأ
        // لأننا في صفحة Update وليس Register

        return (
          value.length >= 8 &&
          // يجب أن يكون طول الباسورد 8 أحرف على الأقل

          /[A-Z]/.test(value) &&
          // يجب أن يحتوي على حرف كبير واحد على الأقل (A-Z)

          /[a-z]/.test(value) &&
          // يجب أن يحتوي على حرف صغير واحد على الأقل (a-z)

          /[0-9]/.test(value)
          // يجب أن يحتوي على رقم واحد على الأقل (0-9)
        );
      },
    ),

  supervisorUserId: yup
    .string()
    .nullable()
    .when("roleName", {
      is: "Student",
      then: (schema) => schema.required("Supervisor is required"),
      otherwise: (schema) => schema.nullable(),
    }),
});