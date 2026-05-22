import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CircularProgress,
  collapseClasses,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ForgetPasswordSchema } from "../../../validations/ForgetPasswordSchema";
import useForgetPassword from "../../../hooks/authHooks/useForgetPassword";
import forgetPasswordPic from "./../../../assets/images/forgetPassword/forgetPasswordImg.webp";
import { Link as RouterLink } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa"; //مكتبة ايقونات

function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(ForgetPasswordSchema),
    mode: "onBlur",
  });
  const { serverErrors, authMutation } = useForgetPassword();

  const forgetPassword = async (value) => {
    //قبل ما يبعث الطلب  خزن الايميل
    localStorage.setItem("resetEmail", value.email);
    await authMutation.mutateAsync({ userInfo: value });
  };

  return (
    <Box
      component={"section"}
      className="forget_password"
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Container maxWidth="sm">
        <Box
          className="Parent gray_boxShadow_onHover flex_column"
          sx={{ paddingBottom: "60px", paddingTop: "30px" }}
        >
          <Box className="img" sx={{ textAlign: "center" }}>
            <Box
              component={"img"}
              src={forgetPasswordPic}
              sx={{width:{xs:"120px",sm:"150px"}}}
              alt="Password help lock icon"
            />
          </Box>
          <Typography
            component={"h1"}
            sx={{
              fontWeight: "700",
              textAlign: "center",
              fontSize: { xs: "18px", sm: "24px" },
            }}
          >
            Security Verification
          </Typography>
          <Typography
            component={"p"}
            sx={{
              textAlign: "center",
              color: "var(--secondary-color)",
              marginBottom: "45px",
              marginTop: "15px",
              fontSize: { xs: "14px", sm: "16px" },
              maxWidth: {
                xs: "250px",
                sm: "320px",
                md: "400px",
              },
              marginX: "auto",
            }}
          >
            Please Enter Your Email Address To Receive a Verification Code.
          </Typography>
          {serverErrors?.length > 0 ? (
            <Typography
              sx={{ color: "var(--primary-color)", marginBottom: "20px", fontSize:{xs:"13px",sm:"14px"}, }}
            >
              {serverErrors}
            </Typography>
          ) : (
            ""
          )}
          <Box
            className="flex_column"
            component={"form"}
            onSubmit={handleSubmit(forgetPassword)}
            sx={{ gap: "23px" }}
          >
            <TextField
              {...register("email")}
              label="Email"
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
                "Send Reset Link"
              )}
            </Button>
            <Typography
              sx={{
                textAlign: "center",
                color: "var(--secondary-color)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "3px",
                fontSize: { xs: "14px", sm: "16px" },
              }}
            >
              <FaLongArrowAltLeft /> {/*ايقونة السهم من مكتبة رياكت ايكونز*/}
              Back to
              <Link
                component={RouterLink}
                to="/auth/login"
                sx={{ color: "var(--primary-color)" }}
                className="verify_link"
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ForgetPassword;