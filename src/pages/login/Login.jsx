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
import { Link as RouterLink } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../validations/LoginSchema";
import GlowCard from "../../components/reactBitsComponents/glowCard/GlowCard"; //جلو كارد من مكتبة رياكت بتس

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
    await authMutation.mutateAsync(values);
  };
  return (
    <Box
      component={"section"}
      className="login"
      sx={{ bgcolor: "var(--navy-color)", padding: "1px" }}
    >
      <Container maxWidth="sm">
        <Box className="flex_column"
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
                gap: "6px",
                marginBottom: "70px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--primary-color)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-brain w-8 h-8 text-red-500"
                data-fg-caxq9="1.21:1.9465:/src/app/components/Login.tsx:32:17:1540:42:e:Brain::::::42K"
              >
                <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
                <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
                <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
                <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
                <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
                <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
                <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
                <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
                <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
              </svg>
              <Typography
                component={"h1"}
                variant="h4"
                sx={{ color: "white", fontWeight: "700" }}
              >
                Brainova
              </Typography>
            </Box>
            <Typography
              component={"h2"}
              sx={{ fontWeight: "700", fontSize: "25px", color: "white" }}
            >
              Welcome Back
            </Typography>
            <Typography
              component={"p"}
              sx={{
                color: "var(--secondary-color)",
                marginBottom: "60px",
              }}
            >
              Sign in to continue your medical training
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgb(8,13,22)",
                  },
                  "& .MuiInputBase-input": {
                    color: "var(--secondary-color)",
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
              <TextField
                {...register("password")}
                label="Password"
                variant="outlined"
                fullWidth
                error={errors.password}
                helperText={errors.password?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgb(8,13,22)",
                  },
                  "& .MuiInputBase-input": {
                    color: "var(--secondary-color)",
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
                sx={{ bgcolor: "var(--primary-color)", fontWeight: "600" }}
              >
                {isSubmitting ? (
                  <CircularProgress
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
                sx={{ textAlign: "center", color: "var(--secondary-color)" }}
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
