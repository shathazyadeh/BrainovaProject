import {
  Box,
  Container,
  Typography,
  Link
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom"; //عشان نفرق بينه وبين اللينك من مكتبة mui
import GlowCard from "../../components/reactBitsComponents/glowCard/GlowCard.jsx"; //جلو كارد من مكتبة رياكت بتس
import RegisterComp from "../../components/registerComp/RegisterComp.jsx";
import { RegisterSchema } from "../../validations/RegisterSchema.js";
import useRegister from "../../hooks/useRegister.js";

function Register() {
 
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
            <RegisterComp schema={RegisterSchema} useHook={useRegister}/>
            <Typography
                sx={{ textAlign: "center", color: "var(--secondary-color)" ,marginTop:'25px'}}
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