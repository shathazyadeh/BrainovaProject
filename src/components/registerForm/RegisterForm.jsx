import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; // @hookform/resolvers: بتربط yup مع react-hook-form عشان الفورم يستخدم قواعد الفاليديشين
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

function RegisterForm({
  schema,
  useHook,
  showPassword = true,
  showSupervisors = true,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const { serverErrors, authMutation, supervisors, supervisorsLoading } =
    useHook();

  const addUser = async (values) => {
    await authMutation.mutateAsync(values);
  };

  const [showPass, setShowPass] = useState(false);

  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };
  return (
    <Box>
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
        {showPassword && (
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
                      <VisibilityOff sx={{ color: "var(--secondary-color)" }} />
                    ) : (
                      <Visibility sx={{ color: "var(--secondary-color)" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
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
          />
        )}
        {/* Dropdown للدكاترة */}
        {showSupervisors && (
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
        )}
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
      </Box>
    </Box>
  );
}

export default RegisterForm;