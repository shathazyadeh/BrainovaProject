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
import { yupResolver } from "@hookform/resolvers/yup"; // @hookform/resolvers: بتربط yup مع react-hook-form عشان الفورم يستخدم قواعد الفاليديشين
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useForm } from "react-hook-form";

function RegisterForm({
  schema,
  useHook,
  mutationName='authMutation',
  userId,
  showPassword = true,
  showSupervisors = true,
  formMethods,
  btnLabel = "Create Account",
}) {

  const form = formMethods || useForm({ resolver: yupResolver(schema), mode: "onBlur" });
  const {
    register,
    handleSubmit,
    watch, // نستخدم watch لمراقبة قيمة الحقول داخل الفورم
    formState: { errors, isSubmitting },
  } = form;

const hookData = useHook();
const { serverErrors, supervisors, supervisorsLoading } = hookData;
const mutation = hookData[mutationName];

// نراقب قيمة supervisorUserId الموجودة داخل الفورم
const supervisorValue = watch("supervisorUserId");

  const handleUser = async (values) => {
    console.log('values:',values);
   await mutation.mutateAsync({
  userId: userId,
  userInfo: values
});
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
        onSubmit={handleSubmit(handleUser)}
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
            className="textfield_dark"
            spellCheck={false}
          />
          <TextField
            {...register("userName")}
            label="Username"
            variant="outlined"
            fullWidth
            error={errors.userName}
            helperText={errors.userName?.message}
            className="textfield_dark"
            spellCheck={false}
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
            className="textfield_dark"
            spellCheck={false}
          />
          <TextField
            {...register("phoneNumber")}
            label="Phone Number"
            variant="outlined"
            fullWidth
            error={errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            className="textfield_dark"
            spellCheck={false}
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
            className="textfield_dark"
            spellCheck={false}
          />
        )}
        {/* Dropdown للدكاترة */}
        {showSupervisors && (
          <TextField
            {...register("supervisorUserId")}
            value={supervisorValue || ""} // نجعل القيمة تأتي دائماً من الفورم (حتى تظهر بعد reset)
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
            className="textfield_dark"
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
          disabled={isSubmitting || (showSupervisors && supervisorsLoading)} // نعطل الزر لو لسا البيانات بتيجي
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
            btnLabel
          )}
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterForm;