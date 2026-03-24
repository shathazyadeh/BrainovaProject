import { Box, Container, Grid, Typography, Link } from "@mui/material";
import useAuthStore from "../../store/useAuthStore";
import useUpdateUserInfo from "../../hooks/useUpdateUserInfo";
import RegisterForm from "../../components/registerForm/RegisterForm";
import { UpdateUserInfoSchema } from "../../validations/UpdateUserInfoSchema";
import { BsArrowRightCircleFill } from "react-icons/bs";
import boyImg from "./../../assets/images/profile/userAvatart.png";
import SecondNavbar from "../../components/secondNavbar/SecondNavbar";
import GlowCard from "../../components/reactBitsComponents/glowCard/GlowCard";
import { Link as RouterLink } from "react-router-dom";

function Profile() {
  const user = useAuthStore((state) => state.user);
  const userId = user.id;
  return (
    <>
      <SecondNavbar />
      <Box
        component={"section"}
        className="profile"
        sx={{
          bgcolor: "rgb(36, 35, 35)",
          height: { xs: "100%", md: "100vh" },
          display: "flex",
          justifyContent: "center",
          paddingTop: "30px",
        }}
      >
        <Container maxWidth="lg">
          <Box className="profile-info">
            <GlowCard enableTilt={false} glowIntensity="soft">
              <Grid container>
                <Grid item size={{ xs: 12, md: 4 }}>
                  <Box
                    className="avatar flex_column"
                    sx={{
                      borderTopLeftRadius: "40px",
                      borderBottomLeftRadius: "40px",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px",
                    }}
                  >
                    <Box className="image">
                      <img src={boyImg} alt="" width={200} />
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
                          fontSize: "34px",
                          textAlign: "center",
                        }}
                      >
                        Super Administrator
                      </Typography>
                    )}

                    <Typography
                      component={"p"}
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: "20px",
                        letterSpacing: "1px",
                        textAlign: "center",
                        fontWeight: "500",
                        marginY: "20px",
                      }}
                    >
                      Manage your profile and keep your information up to date.
                    </Typography>
                    <BsArrowRightCircleFill
                      fill={"var(--secondary-color)"}
                      size={40}
                      style={{ marginTop: "20px" }}
                    />
                  </Box>
                </Grid>
                <Grid item size={{ xs: 12, md: 8 }}>
                  <Box
                    className="edit_user_info_form flex_column"
                    sx={{
                      borderTopRightRadius: "40px",
                      borderBottomRightRadius: "40px",
                      padding: "60px",
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

export default Profile;