import {
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom"; //عشان نفرق بينه وبين اللينك من مكتبة mui
import { yupResolver } from "@hookform/resolvers/yup"; // @hookform/resolvers: بتربط yup مع react-hook-form عشان الفورم يستخدم قواعد الفاليديشين
import { RegisterSchema } from "../../validations/RegisterSchema.js";
import useRegister from "../../hooks/useRegister.js";
import GlowCard from "../../components/reactBitsComponents/glowCard/GlowCard.jsx"; //جلو كارد من مكتبة رياكت بتس

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    mode: "onBlur",
  });
  const { serverErrors, authMutation, supervisors, supervisorsLoading } =
    useRegister();
  const addUser = async (values) => {
    await authMutation.mutateAsync(values);
  };
  return (
    <Box
      component={"section"}
      className="register"
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
                marginBottom: "40px",
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
              Welcome to Brainova
            </Typography>
            <Typography
              component={"p"}
              sx={{
                color: "var(--secondary-color)",
                marginBottom: "20px",
              }}
            >
              Create your account to start your medical training
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
              className="register_form flex_column"
              component={"form"}
              onSubmit={handleSubmit(addUser)}
              sx={{ gap: "23px" }}
            >
              <Box sx={{ display: "flex", gap: "10px" }}>
                <TextField
                  {...register("fullName")}
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  error={errors.fullName}
                  helperText={errors.fullName?.message}
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
                  {...register("userName")}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  error={errors.userName}
                  helperText={errors.userName?.message}
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
              </Box>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <TextField
                  {...register("email")}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={errors.email}
                  helperText={errors.email?.message}
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
                  {...register("phoneNumber")}
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  error={errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
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
              </Box>
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
              {/* Dropdown للدكاترة */}
              <TextField
                {...register("supervisorUserId")}
                defaultValue=""
                label="Supervisor Name"
                fullWidth
                select
                error={errors.supervisorUserId}
                helperText={errors.supervisorUserId?.message}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        backgroundColor: "rgb(8,13,22)", // لون خلفية القائمة
                        color: "var(--secondary-color)", // لون النص
                      },
                    },
                  },
                }}
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
              >
                {/* نحوله لدروب داون*/}
                {supervisors.map(
                  (
                    sup, // نلف على الدكاترة
                  ) => (
                    <MenuItem
                      key={sup.id}
                      value={sup.id}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#3a3f47", // لون سكني عند الهوفر
                          color: "#ffffff",
                        },
                      }}
                    >
                      {sup.fullName} {/* الاسم اللي يظهر */}
                    </MenuItem>
                  ),
                )}
              </TextField>
              <Button
                type="submit"
                className="auth_btn"
                variant="contained"
                disabled={isSubmitting || supervisorsLoading} // نعطل الزر لو لسا البيانات بتيجي
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
                  "Create Account"
                )}
              </Button>
              <Typography
                sx={{ textAlign: "center", color: "var(--secondary-color)" }}
              >
                Already have an account?
                <Link
                  component={RouterLink}
                  to="/auth/login"
                  sx={{ color: "var(--primary-color)" }}
                  className="auth_link"
                >
                  {" "}
                  Login
                </Link>
              </Typography>
            </Box>
          </GlowCard>
        </Box>
      </Container>
    </Box>
  );
}

export default Register;
