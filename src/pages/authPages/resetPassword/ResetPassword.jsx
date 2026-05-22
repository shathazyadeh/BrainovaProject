import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ResetPasswordSchema } from "../../../validations/ResetPasswordSchema";
import resetPasswordPic from "./../../../assets/images/resetPassword/forgetPasswordImg.webp";
import useResetPassword from "../../../hooks/authHooks/useResetPassword";
import useForgetPassword from "../../../hooks/authHooks/useForgetPassword";
import { useState } from "react";
import OtpInput from "react-otp-input"; //مربعات ادخال كود تغيير كلمة السر من مكتبة react-otp-input
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import style from "./ResetPassword.module.css";

function ResetPassword() {
  const resetEmail = localStorage.getItem("resetEmail");

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

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
    await authMutation.mutateAsync({ userInfo: values });
  };
  /*ميوتيشين لاعادة ارسال الكود*/
  const { authMutation: resendMutation } = useForgetPassword(); //عملنا rename للميوتيتشين
  const handleResendCode = async () => { 
    await resendMutation.mutateAsync({userInfo: { email: resetEmail }}); // عشان اليوس اوث بستنى اوبجيكت اسمه يوزر انفو
  };

  const [otp, setOtp] = useState(""); // من مكتبة مربعات ادخال الكود

  const [showPass, setShowPass] = useState(false);

  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

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
            <Box
              component={"img"}
              src={resetPasswordPic}
              sx={{width:{xs:"100px",sm:"130px"}}}
              alt="Red padlock with check mark"
            />
          </Box>
          <Typography
            component={"h1"}
            sx={{ fontWeight: "700", textAlign: "center",fontSize: { xs: "18px", sm: "24px" }, }}
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
              fontSize: { xs: "14px", sm: "16px" },
              maxWidth: {
                xs: "240px",
                sm: "310px",
                md: "390px",
              },
              marginX: "auto",
            }}
          >
            Your New Password Must Be Different from
            Previously Used Password.
          </Typography>
          {serverErrors?.length > 0 ? (
            <Typography
              sx={{ color: "var(--primary-color)", marginBottom: "20px" ,fontSize: { xs: "14px", sm: "16px" },}}
            >
              {serverErrors}
            </Typography>
          ) : (
            ""
          )}
          <Typography
            component={"span"}
            sx={{
              color: "var(--dark-gray-color)",
              textAlign: "center",
              marginBottom: "8px",
              fontSize: { xs: "14px", sm: "16px" },
            }}
          >
            Verification code sent to your email :
          </Typography>
          <Box
            className="flex_column"
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
              renderInput={(props) => (
                <input {...props} className={style.otpinput} inputMode="numeric" pattern="[0-9]*" />
              )}
              inputStyle={{
                width: isXs ? "45px" : "60px",
                height: isXs ? "45px" : "60px",
                margin: isXs ? "0 5px" : "0 10px",
                fontSize: isXs ? "19px" : "24px",
                borderRadius: "12px",
                border: "2px solid var(--primary-color)",
                textAlign: "center",
                outline: "none",
                WebkitAppearance: "none", //  منع اختلاف الموبايل بالتصرف الافتراضي
              }}
              containerStyle={{
                justifyContent: "center",
              }}
            />
            {/* رسالة الخطأ لحقل الكود (الي هو ربطها بمكتبة يب)*/}
            {errors.code ? (
              <Typography
                sx={{ color: "var(--primary-color)", textAlign: "center", fontSize: { xs: "14px", sm: "16px" },}}
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
              type={showPass ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPass ? (
                        <VisibilityOff
                          sx={{ color: "var(--secondary-color)",fontSize: {xs: "20px",sm: "24px"} }}
                        />
                      ) : (
                        <Visibility sx={{ color: "var(--secondary-color)",fontSize: {xs: "20px",sm: "24px"} }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              className="textfield_light"
              sx={{"& .MuiInputLabel-root": {fontSize: {xs: "13px",sm: "16px",},},
                    "& .MuiInputLabel-shrink": {transform: {xs:"translate(16px, -9px) scale(0.85)",sm:"translate(13px, -9px) scale(0.75)"}},
              }}
            />
            <TextField
              {...register("email")}
              defaultValue={resetEmail}
              InputProps={{ readOnly: true }}
              label="user email"
              variant="outlined"
              fullWidth
              error={errors.email}
              helperText={errors.email?.message}
              className="textfield_light"
              sx={{"& .MuiInputLabel-root": {fontSize: {xs: "13px",sm: "16px",},},
                    "& .MuiInputLabel-shrink": {transform: {xs:"translate(16px, -9px) scale(0.85)",sm:"translate(13px, -9px) scale(0.75)"}},
              }}
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
                fontSize:{xs:"13px",sm:"14px"},
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={25}
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
              className="verify_link upper_case"
              type="Button" //ضرورية عشان لما اكبس عليها ما يعتبرها سبمت للفورم لانها موجودة داخل فورم
              component={Button}
              onClick={handleResendCode}
              sx={{
                background: "transparent",
                border: "none",
                color: "#000",
                textDecorationColor: "#000",
                cursor: "pointer",
                width: "fit-content",
                margin: "auto",
                fontSize: { xs: "14px", sm: "16px" },
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