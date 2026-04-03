import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { SetPasswordSchema } from "../../../validations/SetPasswordSchema";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import setPasswordImg from "./../../../assets/images/setPassword/setPasswordImg.webp";
import useSetPassword from "../../../hooks/authHooks/useSetPassword";


function SetPassword() {

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };
  const handleClickConfirmPass = () => {
    setShowConfirmPass(!showConfirmPass);
  };
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("userId");
  const token = params.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(SetPasswordSchema),
    mode: "onBlur",
  });
  const { serverErrors, authMutation } = useSetPassword();
  const setPassword = async (value) => {
    const { confirmPassword, ...rest } = value;// اخدنا الباسوورد وحطيناها داخل اوبجيكت ريسيت "فصلنا""
    const payload = {
      ...rest, // ارسلنا الباسوورد بدون الكونفيرم 
      userId,
      token
    };
    await authMutation.mutateAsync({ userInfo: payload });
  };

  return (
    <Box
      component={"section"}
      className="set_password"
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Container maxWidth="sm">
        <Box
          className="Parent gray_boxShadow_onHover flex_column"
          sx={{ paddingBottom: "60px", paddingTop: "30px" }}
        >
          <Box className="img" sx={{ textAlign: "center" }}>
            <img src={setPasswordImg} width="80px" alt="" />
          </Box>
          <Typography
            component={"h1"}
            variant="h5"
            sx={{ fontWeight: "700", textAlign: "center" }}
          >
            Set your password
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
            Please enter your new password below to secure your account.
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
            className="flex_column"
            component={"form"}
            onSubmit={handleSubmit(setPassword)}
            sx={{ gap: "23px" }}
          >


            <TextField
              {...register("newPassword")}
              label="New password"
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
                        <VisibilityOff sx={{ color: "var(--secondary-color)" }} />
                      ) : (
                        <Visibility sx={{ color: "var(--secondary-color)" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}

              className="textfield_light "
              spellCheck={false}
            />
            <TextField
              {...register("confirmPassword")}
              label="Confirm password"
              variant="outlined"
              fullWidth
              error={errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              type={showConfirmPass ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickConfirmPass} edge="end">
                      {showConfirmPass ? (
                        <VisibilityOff sx={{ color: "var(--secondary-color)" }} />
                      ) : (
                        <Visibility sx={{ color: "var(--secondary-color)" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}

              className="textfield_light "
              spellCheck={false}
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
                "Set Password"
              )}
            </Button>

          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default SetPassword;