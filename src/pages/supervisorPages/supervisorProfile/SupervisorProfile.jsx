import { Box, Container, Link, Typography, useMediaQuery } from "@mui/material";
import RegisterForm from "../../../components/registerForm/RegisterForm";
import { UpdateUserInfoSchema } from "../../../validations/UpdateUserInfoSchema";
import { Link as RouterLink } from "react-router-dom";
import supervisorImg from "./../../../assets/images/profile/supervisorAvatar.webp";
import DashboardNavbar from "../../../components/muiComponents/dashboardNavbar/DashboardNavbar";
import useUpdateUserInfo from "../../../hooks/userManagementHooks/useUpdateUserInfo";
import useAuthStore from "../../../store/useAuthStore";
import DashboardFooter from "../../../components/dashboardFooter/DashboardFooter";
function SupervisorProfile() {
  const user = useAuthStore((state) => state.user);
  const userId = user.id;
  const isCustomScreen = useMediaQuery("(max-width:500px)");
  return (
    <>
      <DashboardNavbar />
      <Box
        component={"section"}
        className="profile"
        sx={{
          height: { xs: "100%", md: "90vh" },
          display: "flex",
          justifyContent: "center",
          paddingBottom: { xs: "30px", sm: "0px" },
        }}
      >
        <Container maxWidth="lg">
          <Box
            className="avatar flex_column"
            sx={{
              borderTopLeftRadius: "40px",
              borderBottomLeftRadius: "40px",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "45px",
              paddingTop: { xs: "30px", md: "0px" },
            }}
          >
            <Box
              className="image"
              sx={{ filter: "drop-shadow(0 0 15px rgba(255,0,0,0.6))" }}
            >
              <Box
                component={"img"}
                src={supervisorImg}
                alt="Doctor avatar with stethoscope"
                width={200}
                sx={{
                  "@media (max-width:700px)": { width: "160px" },
                }}
              />
            </Box>
            <Typography
              component={"h1"}
              sx={{
                color: "#fff",
                fontFamily: "var(--primary-font)",
                fontWeight: "600",
                fontSize: "34px",
                textAlign: "center",
                wordBreak: "break-word",
                "@media (max-width:700px)": { fontSize: "26px" },
              }}
            >
              Dr. {user?.fullName} -
              <Typography
                component={"span"}
                sx={{
                  color: "var(--primary-color)",
                  fontFamily: "var(--primary-font)",
                  fontWeight: "600",
                  fontSize: "34px",
                  "@media (max-width:700px)": { fontSize: "26px" },
                }}
              >
                {" "}
                {user?.role}
              </Typography>
            </Typography>
            <Typography
              component={"p"}
              sx={{
                color: "var(--secondary-color)",
                fontSize: "20px",
                letterSpacing: "1px",
                textAlign: "center",
                marginTop: "4px",
                "@media (max-width:700px)": { fontSize: "16px" },
              }}
            >
              Student Monitoring and Report Feedback
            </Typography>
          </Box>
          <Box className="profile-info">
            <Box
              className="edit_user_info_form"
              sx={{
                borderRadius: "40px",
                padding: "60px",
                paddingBottom: "40px",
                bgcolor: "#8986862b",
                position: "relative",
                "@media (max-width:700px)": { paddingX: "10px" },
              }}
            >
              <RegisterForm
                useHook={useUpdateUserInfo}
                userId={userId}
                schema={UpdateUserInfoSchema}
                showPassword={false}
                showSupervisors={false}
                fullWidthButton={false}
                fullWidthInput={isCustomScreen ? true : false}
                btnLabel="Update Profile"
                textfieldColor={"textfield_black"}
                defaultValues={{
                  fullName: user.fullName,
                  userName: user.userName,
                  email: user.email,
                  phoneNumber: user.phoneNumber,
                }}
              />
              <Link
                component={RouterLink}
                to={"/auth/forget-password"}
                sx={{
                  color: "var(--primary-color)",
                  fontFamily: "sans-serif",
                  fontSize: "15px",
                  fontWeight: "600",
                  width: "fit-content",
                  position: "absolute",
                  bottom: "40px",
                  "@media (max-width:440px)": { bottom: "-34px", left: "13px" },
                }}
                className="auth_link"
              >
                Reset Password?
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>

      <DashboardFooter />
    </>
  );
}

export default SupervisorProfile;