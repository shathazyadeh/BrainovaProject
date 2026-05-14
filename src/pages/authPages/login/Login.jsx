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
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import useLogin from "../../../hooks/authHooks/useLogin";
import { LoginSchema } from "../../../validations/LoginSchema";
import GlowCard from "../../../components/reactBitsComponents/glowCard/GlowCard"; //جلو كارد من مكتبة رياكت بتس
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { LuBrain } from "react-icons/lu";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: "onBlur",
  });
  const { serverErrors, authMutation } = useLogin();

  const loginUser = async (values) => {
    await authMutation.mutateAsync({ userInfo: values });
  };

  const [showPass, setShowPass] = useState(false);

  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };
  return (
    <Box
      component={"section"}
      className="login"
      sx={{ bgcolor: "var(--navy-color)", padding: "1px" }}
    >
      <Container maxWidth="sm">
        <Box
          className="flex_column"
          sx={{
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <GlowCard>
            <Box
              className="logo"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "baseline",
                gap: "6px",
                marginBottom: "70px",
              }}
            >
              <Box
                component={LuBrain}
                sx={{
                  fontSize: { xs: "28px", sm: "34px" },
                  color: "var(--primary-color)",
                  position: "relative",
                  top: "4px",
                }}
              />
              <Typography
                component={"h1"}
                sx={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: { xs: "28px", sm: "34px" },
                }}
              >
                Brainova
              </Typography>
            </Box>
            <Typography
              component={"h2"}
              sx={{
                fontWeight: "700",
                fontSize: { xs: "20px", sm: "25px" },
                color: "white",
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              component={"p"}
              sx={{
                color: "var(--secondary-color)",
                marginBottom: "60px",
                fontSize: { xs: "14px", sm: "16px" },
              }}
            >
              Sign in to continue your medical training
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
              className="login_form flex_column"
              component={"form"}
              onSubmit={handleSubmit(loginUser)}
              sx={{ gap: "23px" }}
            >
              <TextField
                {...register("emailOrUserName")}
                label="Email or Username"
                variant="outlined"
                fullWidth
                error={errors.emailOrUserName}
                helperText={errors.emailOrUserName?.message}
                className="textfield_dark"
                spellCheck={false}
                sx={{
                  "& .MuiInputLabel-root": {
                    fontSize: {
                      xs: "13px",
                      sm: "16px",
                    },
                  },
                }}
              />
              <TextField
                {...register("password")}
                label="Password"
                variant="outlined"
                fullWidth
                error={errors.password}
                helperText={errors.password?.message}
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
                          <Visibility
                            sx={{ color: "var(--secondary-color)",fontSize: {xs: "20px",sm: "24px"} }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                className="textfield_dark"
                spellCheck={false}
                sx={{
                  "& .MuiInputLabel-root": {
                    fontSize: {
                      xs: "13px",
                      sm: "16px",
                    },
                  },
                }}
              />
              <Link
                component={RouterLink}
                to={"/auth/forget-password"}
                sx={{
                  color: "var(--primary-color)",
                  fontFamily: "sans-serif",
                  fontSize: "13px",
                  fontWeight: "600",
                  width: "fit-content",
                }}
                className="auth_link"
              >
                Forget Password?
              </Link>
              <Button
                className="auth_btn"
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{ bgcolor: "var(--primary-color)", fontWeight: "600",fontSize:{xs:"13px",sm:"14px"} }}
              >
                {isSubmitting ? (
                  <CircularProgress
                    size={25}
                    sx={{
                      "& .MuiCircularProgress-circle": {
                        stroke: "white",
                      },
                    }}
                  />
                ) : (
                  "Login"
                )}
              </Button>
              <Typography
                sx={{
                  textAlign: "center",
                  color: "var(--secondary-color)",
                  fontSize: { xs: "14px", sm: "16px" },
                }}
              >
                Don't have an account?
                <Link
                  component={RouterLink}
                  to={"/auth/register"}
                  sx={{ color: "var(--primary-color)" }}
                  className="auth_link"
                >
                  {" "}
                  Create Account
                </Link>
              </Typography>
            </Box>
          </GlowCard>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;