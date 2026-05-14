import {
  Box,
  Container,
  Typography,
  Link,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom"; //عشان نفرق بينه وبين اللينك من مكتبة mui
import GlowCard from "../../../components/reactBitsComponents/glowCard/GlowCard.jsx"; //جلو كارد من مكتبة رياكت بتس
import RegisterForm from "../../../components/registerForm/RegisterForm.jsx";
import { RegisterSchema } from "../../../validations/RegisterSchema.js";
import useRegister from "../../../hooks/authHooks/useRegister.js";
import { LuBrain } from "react-icons/lu";

function Register() {

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
 
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
              sx={{ fontWeight: "700",fontSize: { xs: "20px", sm: "25px" }, color: "white" }}
            >
              Welcome to Brainova
            </Typography>
            <Typography
              component={"p"}
              sx={{
                color: "var(--secondary-color)",
                marginBottom: "20px",
                fontSize: { xs: "14px", sm: "16px" },
              }}
            >
              Create your account to start your medical training
            </Typography>
            <RegisterForm schema={RegisterSchema} useHook={useRegister} fullWidthInput = {isXs}/>
            <Typography
                sx={{ textAlign: "center", color: "var(--secondary-color)" ,marginTop:'25px',fontSize: { xs: "14px", sm: "16px" },}}
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
          </GlowCard>
        </Box>
      </Container>
    </Box>
  );
}

export default Register;