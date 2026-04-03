import { Box, Container, Link, Typography } from "@mui/material";
import RegisterForm from "../../../components/registerForm/RegisterForm";
import { UpdateUserInfoSchema } from "../../../validations/UpdateUserInfoSchema";
import { Link as RouterLink } from "react-router-dom";
import supervisorImg from "./../../../assets/images/profile/supervisorAvatar.webp";
import DashboardNavbar from "../../../components/muiComponents/dashboardNavbar/DashboardNavbar";
import useUpdateUserInfo from "../../../hooks/userManagementHooks/useUpdateUserInfo";
import useAuthStore from "../../../store/useAuthStore";

function SupervisorProfile() {
  const user = useAuthStore((state) => state.user);
  const userId = user.id;
  return (
    <>
      <DashboardNavbar />
      <Box
        component={"section"}
        className="profile"
        sx={{
          bgcolor: "var(--navy-color)",
          height: { xs: "100%", md: "100vh" },
          display: "flex",
          justifyContent: "center",
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
            }}
          >
            <Box
              className="image"
              sx={{ filter: "drop-shadow(0 0 15px rgba(255,0,0,0.6))" }}
            >
              <Box component={"img"} src={supervisorImg} alt="" width={200} />
            </Box>
            {user.role === "Admin" ? (
              <Typography
                component={"h1"}
                sx={{
                  color: "#fff",
                  fontSize: "38px",
                  textAlign: "center",
                }}
              >
                Administrator
              </Typography>
            ) : (
              <Typography
                component={"h1"}
                sx={{
                  color: "#fff",
                  fontFamily: "var(--primary-font)",
                  fontWeight: "600",
                  fontSize: "34px",
                  textAlign: "center",
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
                  }}
                >
                  {" "}
                  {user?.role}
                </Typography>
              </Typography>
            )}

            <Typography
              component={"p"}
              sx={{
                color: "var(--secondary-color)",
                fontSize: "20px",
                letterSpacing: "1px",
                textAlign: "center",
                marginTop: "4px",
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
                to={"/auth/security-verification"}
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
      <Box
        className="lower_footer"
        sx={{
          borderTop: "1px solid rgba(53, 53, 53, 0.93)",
          width: "fit-content",
          margin: "auto",
          paddingX: { xs: "0px", md: "200px" },
          textAlign: "center",
          marginTop: { xs: "60px", md: "0px" },
        }}
      >
        <Typography
          component={"p"}
          sx={{ color: "var(--mid-gray-color)", paddingY: "30px" }}
        >
          © 2026{" "}
          <Typography
            component={"span"}
            sx={{ color: "var(--dark-red-color)" }}
          >
            Brainova
          </Typography>
          . All rights reserved. | Built for medical education and research
          purposes.
        </Typography>
      </Box>
    </>
  );
}

export default SupervisorProfile;