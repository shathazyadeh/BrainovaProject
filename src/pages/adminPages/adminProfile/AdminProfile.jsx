import { Box, Container, Grid, Typography, Link } from "@mui/material";
import useUpdateUserInfo from "../../../hooks/userManagementHooks/useUpdateUserInfo";
import RegisterForm from "../../../components/registerForm/RegisterForm";
import { UpdateUserInfoSchema } from "../../../validations/UpdateUserInfoSchema";
import { BsArrowRightCircleFill } from "react-icons/bs";
import boyImg from "./../../../assets/images/profile/userAvatart.png";
import DashboardNavbar from "../../../components/muiComponents/dashboardNavbar/DashboardNavbar";
import GlowCard from "../../../components/reactBitsComponents/glowCard/GlowCard";
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";

function AdminProfile() {
  const user = useAuthStore((state) => state.user);
  const userId = user.id;
  return (
    <>
      <DashboardNavbar />
      <Box
        component={"section"}
        className="profile"
        sx={{
          bgcolor: "rgb(36, 35, 35)",
          height: { xs: "100%", md: "100vh" },
          display: "flex",
          justifyContent: "center",
          paddingTop: "30px",
          marginLeft: { md: '10px' }
        }}
      >
        <Container maxWidth="lg">
          <Box className="profile-info">
            <GlowCard enableTilt={false} glowIntensity="soft">
              <Grid container sx={{ alignItems: 'center' }}>
                <Grid item size={{ xs: 12, md: 4 }}>
                  <Box
                    className="avatar flex_column"
                    sx={{
                      borderTopLeftRadius: "40px",
                      borderBottomLeftRadius: "40px",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft: { sm: "40px", md: "40px" },
                    }}
                  >
                    <Box className="image" sx={{ width: { xs: "120px", sm: "150px", md: "150px", lg: "200px" }, }}>
                      <Box component={"img"} src={boyImg} alt="Default user profile avatar" width={'100%'} />
                    </Box>

                    {user.role === "Admin" ? (
                      <Typography
                        component={"h1"}
                        sx={{
                          color: "#fff",
                          fontSize: { xs: '20px', sm: '32px', md: "25px", lg: "32px" },
                          textAlign: "center",
                          fontWeight: '500'
                        }}
                      >
                        Administrator
                      </Typography>
                    ) : (
                      <Typography
                        component={"h1"}
                        sx={{
                          color: "#fff",
                          fontSize: { xs: '20px', sm: '32px', md: "25px", lg: "32px" },
                          textAlign: "center",
                          fontWeight: '500'
                        }}
                      >
                        Super Administrator
                      </Typography>
                    )}

                    <Typography
                      component={"p"}
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: { xs: '13px', sm: '15px', md: '13px', lg: '20px' },
                        letterSpacing: "1px",
                        textAlign: "center",
                        fontWeight: "500",
                        marginY: "20px",
                      }}
                    >
                      Manage your profile and keep your information up to date.
                    </Typography>


                    <Box component={BsArrowRightCircleFill}
                      sx={{ color: "var(--secondary-color)", marginTop: { xs: '0px', md: "20px" }, marginBottom: { xs: '16px', md: '0px' }, fontSize: { xs: '30px', sm: '33px', md: '36px', lg: '40px' } }} />
                  </Box>
                </Grid>
                <Grid item size={{ xs: 12, md: 8 }}>
                  <Box
                    className="edit_user_info_form flex_column"
                    sx={{
                      borderTopRightRadius: "40px",
                      borderBottomRightRadius: "40px",
                      padding: { sm: "40px", md: "40px" },
                      paddingY: { sm: "30px", md: "40px" },
                      paddingBottom: "0px",
                      gap: "40px",
                    }}
                  >
                    <RegisterForm
                      useHook={useUpdateUserInfo}
                      userId={userId}
                      schema={UpdateUserInfoSchema}
                      showPassword={false}
                      showSupervisors={false}
                      btnLabel="Update Profile"
                      fullWidthInput={true}
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
                      }}
                      className="auth_link"
                    >
                      Reset Password?
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </GlowCard>
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

export default AdminProfile;