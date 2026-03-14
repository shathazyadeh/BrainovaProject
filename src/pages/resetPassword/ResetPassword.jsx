import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ResetPasswordSchema } from "../../validations/ResetPasswordSchema";
import useResetPassword from "../../hooks/useResetPassword";
import resetPasswordPic from "./../../assets/images/resetPassword/forgetPasswordImg.webp";
import { useState } from "react";
import OtpInput from "react-otp-input"; //مربعات ادخال كود تغيير كلمة السر من مكتبة react-otp-input
import useForgetPassword from "../../hooks/useForgetPassword";

function ResetPassword() {
  const {
    register, // لتسجيل الحقول العادية في الفورم
    handleSubmit, // لمعالجة الفورم عند الضغط على زر الإرسال
    setValue, //  لاستخدامه لتحديث الحقل "code" تلقائيًا
    formState: { errors, isSubmitting }, // معلومات عن الأخطاء وحالة الإرسال
  } = useForm({
    resolver: yupResolver(ResetPasswordSchema), // للتحقق من صحة القيم باستخدام yup
    mode: "onBlur", // تحقق من الحقول عند الخروج منها
  });
  /*ميتويشين للريسيت باس */
  const { serverErrors, authMutation } = useResetPassword();
  const resetPassword = async (values) => {
    await authMutation.mutateAsync(values);
  };
  /*ميوتيشين لاعادة ارسال الكود*/
  const { authMutation: resendMutation } = useForgetPassword(); //عملنا rename للميوتيتشين
  const handleResendCode = async () => {
    const email = JSON.parse(localStorage.getItem("user")).email;
    await resendMutation.mutateAsync({ email });
  };

  const [otp, setOtp] = useState(""); // من مكتبة مربعات ادخال الكود

  return (
    <Box
      component={"section"}
      className="reset_password"
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Container maxWidth="sm">
        <Box
          className="Parent gray_boxShadow_onHover flex_column"
          sx={{
            paddingBottom: "60px",
            paddingTop: "30px",
          }}
        >
          <Box className="img" sx={{ textAlign: "center" }}>
            <img src={resetPasswordPic} width="150px" alt="" />
          </Box>
          <Typography
            component={"h1"}
            variant="h5"
            sx={{ fontWeight: "700", textAlign: "center" }}
          >
            Reset Password
          </Typography>
          <Typography
            component={"p"}
            sx={{
              textAlign: "center",
              color: "var(--secondary-color)",
              marginBottom: "20px",
              marginTop: "15px",
            }}
          >
            Your New Password Must Be Different from
            <br />
            Previously Used Password.
          </Typography>
          {serverErrors?.length > 0 ? (
            <Typography
              sx={{ color: "var(--primary-color)", marginBottom: "20px" }}
            >
              {serverErrors}
            </Typography>
          ) : (
            ""
          )}
          <Typography
            component={"span"}
            sx={{
              color: "var(--secondary-color)",
              textAlign: "center",
              marginBottom: "8px",
            }}
          >
            Code Recieved :{" "}
          </Typography>
          <Box className="flex_column"
            component={"form"}
            onSubmit={handleSubmit(resetPassword)}
            sx={{ gap: "23px" }}
          >
            <OtpInput
              value={otp}
              onChange={(val) => {
                setOtp(val); // تحديث state المحلي
                setValue("code", val, {
                  shouldValidate: true,
                  shouldDirty: true,
                }); // لتحديث الفورم نفسه لحقل code... والتحقق
              }}
              numInputs={4}
              renderSeparator={null} // null عشان ما يكون فيه أي خط بين المربعات
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                width: "60px", // عرض المربع
                height: "60px", // ارتفاع المربع
                margin: "0 10px", // المسافة بين المربعات
                fontSize: "24px", // حجم الرقم داخل المربع
                borderRadius: "12px", // زوايا المربع
                border: "2px solid var(--primary-color)", // لون وسمك الحد
                textAlign: "center", // الرقم في وسط المربع
              }}
              containerStyle={{
                justifyContent: "center", // ترتيب المربعات في الوسط
              }}
            />
            {/* رسالة الخطأ لحقل الكود (الي هو ربطها بمكتبة يب)*/}
            {errors.code ? (
              <Typography
                sx={{ color: "var(--primary-color)", textAlign: "center" }}
              >
                {errors.code.message}
              </Typography>
            ) : (
              ""
            )}
            <TextField
              {...register("newPassword")}
              label="user new password"
              variant="outlined"
              fullWidth
              error={errors.newPassword}
              helperText={errors.newPassword?.message}
              className="textfield_light"
            />
            <TextField
              {...register("email")}
              value={JSON.parse(localStorage.getItem("user")).email}
              InputProps={{ readOnly: true }}
              label="user email"
              variant="outlined"
              fullWidth
              error={errors.email}
              helperText={errors.email?.message}
              className="textfield_light"
            />
            <Button
              className="fx_fill"
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{
                bgcolor: "var(--primary-color)",
                fontWeight: "600",
                paddingY: "8px",
              }}
            >
              {isSubmitting ? (
                <CircularProgress
                  sx={{
                    "& .MuiCircularProgress-circle": {
                      stroke: "#fff",
                    },
                  }}
                />
              ) : (
                "Reset Password"
              )}
            </Button>
            <Link
              className="verify_link"
              type="Button" //ضرورية عشان لما اكبس عليها ما يعتبرها سبمت للفورم لانها موجودة داخل فورم
              component={"Button"}
              onClick={handleResendCode}
              sx={{
                background: "transparent",
                border: "none",
                color: "#000",
                textDecorationColor: "#000",
              }}
            >
              Resend Code
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ResetPassword;