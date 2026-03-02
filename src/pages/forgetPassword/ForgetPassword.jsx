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
import useForgetPassword from "../../hooks/useForgetPassword";
import { ForgetPasswordSchema } from "../../validations/ForgetPasswordSchema";
import forgetPasswordPic from "./../../assets/images/forgetPassword/forgetPasswordImg.webp";
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
    await authMutation.mutateAsync(value);
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
          sx={{ paddingBottom: "60px",paddingTop:'30px' }}
        >
          <Box className="img" sx={{ textAlign: "center" }}>
            <img src={forgetPasswordPic} width="150px" alt="" />
          </Box>
          <Typography
            component={"h1"}
            variant="h5"
            sx={{ fontWeight: "700", textAlign: "center" }}
          >
            Forget Password
          </Typography>
          <Typography
            component={"p"}
            sx={{
              textAlign: "center",
              color: "var(--secondary-color)",
              marginBottom: "45px",
              marginTop: "15px",
            }}
          >
            Please Enter Your Email Address To Receive <br /> a Verification
            Code.
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
          <Box className="flex_column"
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
              sx={{
                "& .MuiInputBase-input": {
                  color: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "var(--secondary-color)",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "rgb(142, 149, 162)",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--secondary-color)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--secondary-color)",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "var(--secondary-color)",
                  },
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
