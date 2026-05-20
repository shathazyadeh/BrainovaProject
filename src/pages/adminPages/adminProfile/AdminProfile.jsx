import { Box, Container, Grid, Typography, Link, Button } from "@mui/material";
import useUpdateUserInfo from "../../../hooks/userManagementHooks/useUpdateUserInfo";
import RegisterForm from "../../../components/registerForm/RegisterForm";
import { UpdateUserInfoSchema } from "../../../validations/UpdateUserInfoSchema";
import { BsArrowRightCircleFill } from "react-icons/bs";
import boyImg from "./../../../assets/images/profile/userAvatart.webp";
import DashboardNavbar from "../../../components/muiComponents/dashboardNavbar/DashboardNavbar";
import GlowCard from "../../../components/reactBitsComponents/glowCard/GlowCard";
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import { LuCrown } from "react-icons/lu";
import { useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { BsBullseye } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { TiAttachment } from "react-icons/ti";
import { MdOutlinePhone } from "react-icons/md";
import { PiUserBold } from "react-icons/pi";
import { FaLocationArrow } from "react-icons/fa6";
import DashboardFooter from "../../../components/dashboardFooter/DashboardFooter";
import { AiOutlineCheckCircle } from "react-icons/ai";

function PermissionsBox({ permissions }) {
  return (
    <Box
      className="super_permissions flex_column"
      sx={{
        height: "100%",
        width: "100%",
        paddingX: { xs: '20px', sm: '0px', md: "40px" },
        paddingBottom: "23px",
        paddingTop: "40px",
        gap: "10px",
        bgcolor: "#3e27274d",
        borderRadius: "20px",

      }}
    >
      <Typography
        component={"h1"}
        variant="h4"
        sx={{
          fontSize: { xs: "18px", sm: "25px", lg: "30px" },
          color: "#ffffff",
          fontFamily: "var(--primary-font)",
          fontWeight: "600",
          display: "flex",
          gap: "15px",
          whiteSpace: "nowrap",
          marginBottom: { xs: "15px", md: "25px" },
          paddingBottom: { xs: "10px", sm: "25px" },
          borderBottom: "1px solid #ffffff2a",
          alignItems: "center",
          "@media (max-width:1225px)": {
            fontSize: "29px",
          },
          "@media (max-width:500px)": {
            fontSize: "23px",
            paddingBottom: "15px",
          },
          "@media (max-width:423px)": {
            fontSize: "16px",
            paddingX: "5px",
          },
        }}
      >
        {" "}
        <Box
          component={LuCrown}
          sx={{
            padding: "5px",
            fontSize: { xs: "30px", sm: "37px", lg: "45px" },
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "var(--primary-color)",
            color: "#fff",
            flexShrink: 0,
            boxShadow: "0 4px 15px rgba(250, 4, 4, 0.74)",
            border: "1px solid rgb(255, 0, 0)",
            transition: "0.5s ease",
            marginLeft: { xs: "10px", sm: "40px", md: "15px" },
            "&:hover": {
              color: "var(--primary-color)",
              bgcolor: "#fffffff0",
              transform: "scale(1.05)",
              boxShadow: "0 6px 18px rgba(255, 0, 0, 0.56)",
            },
            "@media (max-width:1225px)": {
              fontSize: "35px",
            },
            "@media (max-width:423px)": {
              fontSize: "30px",
            },
          }}
        />
        Permissions :
      </Typography>

      <Grid container spacing={2}>
        {permissions.map((perm, index) => (
          <Grid item size={{ xs: 12, md: 6, lg: 12 }} key={index}>
            <Typography
              key={index}
              sx={{
                height: "100%",
                alignSelf: "stretch",
                color: "#fff",
                fontSize: { xs: "12px", sm: "15px", md: "17px" },
                fontWeight: "600",
                paddingLeft: { lg: "15px" },
                fontFamily: "var(--primary-font)",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                paddingY: { xs: "10px", md: "10px", lg: "4px" },
                paddingX: { xs: "10px", md: "10px", lg: "6px" },
                marginX: { xs: "5px", sm: "40px", md: "0px" },
                borderRadius: "10px",
                bgcolor: "#ffffff18",
                transition: "all 0.5s ease",
                "&:hover": {
                  color: "var(--primary-color)",
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 18px rgba(255, 0, 0, 0.25)",
                },
                "@media (max-width:1422px)": {
                  fontSize: "15px",
                },
                "@media (max-width:1224px)": {
                  fontSize: "13px",
                },
                "@media (max-width:600px)": {
                  fontSize: "12px",
                },
              }}
            >
              <Box
                component={AiOutlineCheckCircle}
                sx={{
                  color: "#ff0000",
                  marginRight: "8px",
                  flexShrink: "0",
                  fontSize: '22px',
                  bgcolor: '#fff',
                  borderRadius: '10px',
                  boxShadow: "0 6px 18px rgba(255, 255, 255, 0.16)",
                  "@media (max-width:600px)": {
                    fontSize: "16px",
                  },



                }}
              />{" "}
              {perm}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
function AdminProfile() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;
  const formRef = useRef(null);

  const adminPermissions = [
    {
      permissions: [
        "View Supervisors & Students",
        "Create   Supervisors &  Students .",
        "Update personal profile information .",
        "Edit users information .",
        "Block / Unblock Users",
        "Delete Users",
      ],
    },
  ];
  const superAdminPermissions = [
    {
      permissions: [
        "View all users in the system .",
        "Create  Admins & Supervisors &  Students .",
        "Update personal profile information .",
        "Edit users information .",
        "Block / Unblock Users .",
        "Delete Users .",
      ],
    },
  ];
  return (
    <>
      <DashboardNavbar />
      <Box
        component={"section"}
        className="profile"
        sx={{
          bgcolor: "var(--navy-color)",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          paddingTop: "30px",
          marginLeft: { md: "10px" },
        }}
      >
        <Container maxWidth="lg">
          <Box
            className="avatar "
            sx={{
              display: "flex",
              bgcolor: "#201f1f",
              paddingY: "30px",
              paddingLeft: { lg: "40px" },
              alignItems: "flex-start",
              borderBottom: "8px solid var(--primary-color)",
              boxShadow: "0 0 15px rgba(207, 201, 201, 0.25)",
              justifyContent: "space-between",
            }}
          >
            <Grid
              container
              columnSpacing={1}
              alignItems="flex-start"
              sx={{
                width: "100%",
                "@media (max-width:1237px)": {
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingX: "15px",
                },
              }}
            >
              <Grid item>
                <Box
                  className="user_avatar"
                  sx={{
                    width: { xs: "140px", sm: "150px", md: "170px" },
                    height: { xs: "140px", sm: "150px", md: "170px" },
                    borderRadius: "50%",
                    overflow: "hidden",

                    boxShadow: `
                 0 0 20px rgba(82, 80, 80, 0.14),
                 0 0 45px rgba(100, 98, 98, 0.19),
                 0 0 70px rgba(216, 11, 11, 0.28)
               `,
                  }}
                >
                  <Box
                    component="img"
                    src={boyImg}
                    width="100%"
                    height="100%"
                    sx={{
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </Box>
              </Grid>

              <Grid item>
                <Box
                  className="flex_column admin_info"
                  sx={{
                    alignItems: "flex-start",
                    marginLeft: { lg: "20px" },
                    marginTop: "20px",
                    "@media (max-width:1237px)": {
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                    },
                  }}
                >
                  {user?.roles[0] === "Admin" ? (
                    <Typography
                      component={"h1"}
                      sx={{
                        color: "#fff",
                        fontSize: {
                          xs: "20px",
                          sm: "32px",
                          md: "25px",
                          lg: "32px",
                        },
                        textAlign: "center",
                        fontWeight: "500",
                        fontFamily: "var(--primary-font)",
                      }}
                    >
                      Administrator
                    </Typography>
                  ) : (
                    <Typography
                      component={"h1"}
                      sx={{
                        display: "flex",
                        color: "#fff",
                        fontSize: {
                          xs: "20px",
                          sm: "32px",
                          md: "25px",
                          lg: "32px",
                        },
                        textAlign: "center",
                        fontWeight: "500",
                        fontFamily: "var(--primary-font)",
                      }}
                    >
                      Super Administrator
                    </Typography>
                  )}

                  <Typography
                    component={"p"}
                    sx={{
                      color: "var(--secondary-color)",
                      fontSize: {
                        xs: "12px",
                        sm: "15px",
                        md: "13px",
                        lg: "15px",
                      },
                      letterSpacing: "1px",
                      fontWeight: "400",
                      marginBottom: "25px",
                      marginTop: "5px",
                      fontFamily: "var(--primary-font)",
                      "@media (max-width:1237px)": {
                        textAlign: "center",
                      },
                    }}
                  >
                    Keep your profile information updated and manage
                    <br /> your account settings seamlessly .
                  </Typography>
                  <Box
                    className="user_info"
                    sx={{
                      display: "flex",
                      color: "#ffffff",
                      gap: "10px",
                      "@media (max-width:1237px)": {
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                        width: "100%",
                      },
                    }}
                  >
                    <Typography
                      component={"h1"}
                      variant="h4"
                      sx={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        paddingX: "10px",
                        paddingY: "5px",
                        borderRadius: "15px",
                        fontWeight: "500",
                        fontFamily: "var(--primary-font)",
                        fontSize: {
                          xs: "12px",
                          sm: "15px",
                          md: "13px",
                          lg: "15px",
                        },
                        color: "var(--primary-color)",
                        bgcolor: "#fffffff0",
                        boxShadow: "0 6px 18px rgba(255, 0, 0, 0.26)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      {" "}
                      <Typography
                        component={"span"}
                        sx={{
                          width: "21px",
                          height: "21px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          bgcolor: "var(--primary-color)",
                          color: "#fff",
                          boxShadow: "0 4px 15px rgba(250, 4, 4, 0.74)",
                          border: "1px solid rgb(255, 0, 0)",
                        }}
                      >
                        <TiAttachment size={20} style={{ flexShrink: 0 }} />
                      </Typography>
                      {user?.fullName}
                    </Typography>
                    <Typography
                      component={"h1"}
                      variant="h4"
                      sx={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        paddingX: "10px",
                        paddingY: "5px",
                        borderRadius: "15px",
                        fontWeight: "500",
                        fontFamily: "var(--primary-font)",
                        fontSize: {
                          xs: "12px",
                          sm: "15px",
                          md: "13px",
                          lg: "15px",
                        },
                        color: "var(--primary-color)",
                        bgcolor: "#fffffff0",
                        boxShadow: "0 6px 18px rgba(255, 0, 0, 0.26)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      {" "}
                      <Typography
                        component={"span"}
                        sx={{
                          width: "21px",
                          height: "21px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          bgcolor: "var(--primary-color)",
                          color: "#fff",
                          boxShadow: "0 4px 15px rgba(250, 4, 4, 0.74)",
                          border: "1px solid rgb(255, 0, 0)",
                        }}
                      >
                        <PiUserBold style={{ flexShrink: 0 }} />
                      </Typography>
                      {user?.userName}
                    </Typography>
                    <Typography
                      component={"h1"}
                      variant="h4"
                      sx={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        paddingX: "10px",
                        paddingY: "5px",
                        borderRadius: "15px",
                        fontWeight: "500",
                        fontFamily: "var(--primary-font)",
                        fontSize: {
                          xs: "12px",
                          sm: "15px",
                          md: "13px",
                          lg: "15px",
                        },
                        color: "var(--primary-color)",
                        bgcolor: "#fffffff0",
                        boxShadow: "0 6px 18px rgba(255, 0, 0, 0.26)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      {" "}
                      <Typography
                        component={"span"}
                        sx={{
                          width: "21px",
                          height: "21px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          bgcolor: "var(--primary-color)",
                          color: "#fff",
                          boxShadow: "0 4px 15px rgba(250, 4, 4, 0.74)",
                          border: "1px solid rgb(255, 0, 0)",
                        }}
                      >
                        <MdOutlinePhone style={{ flexShrink: 0 }} />
                      </Typography>
                      {user?.phoneNumber}
                    </Typography>
                    <Typography
                      component={"h1"}
                      variant="h4"
                      sx={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        paddingX: "10px",
                        paddingY: "5px",
                        borderRadius: "15px",
                        fontWeight: "500",
                        fontFamily: "var(--primary-font)",
                        fontSize: {
                          xs: "12px",
                          sm: "15px",
                          md: "13px",
                          lg: "15px",
                        },
                        color: "var(--primary-color)",
                        bgcolor: "#fffffff0",
                        boxShadow: "0 6px 18px rgba(255, 0, 0, 0.26)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      {" "}
                      <Typography
                        component={"span"}
                        sx={{
                          width: "21px",
                          height: "21px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          bgcolor: "var(--primary-color)",
                          color: "#fff",
                          boxShadow: "0 4px 15px rgba(250, 4, 4, 0.74)",
                          border: "1px solid rgb(255, 0, 0)",
                        }}
                      >
                        <MdOutlineMail style={{ flexShrink: 0 }} />
                      </Typography>
                      {user?.email}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item>
                <Box
                  className="update_btn "
                  sx={{
                    color: "#fff",
                    display: "flex",
                    marginX: "20px",
                    "@media (max-width:1424px) ": {
                      marginTop: "35px",
                    },
                  }}
                >
                  <Typography
                    onClick={() => {
                      formRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#fff",
                      fontWeight: "500",
                      fontSize: { xs: "12px", sm: "15px", lg: "15px" },
                      cursor: "pointer",
                      padding: "10px 20px",
                      borderRadius: "20px",
                      bgcolor: "var(--primary-color)",
                      backdropFilter: "blur(10px)",
                      transition: "0.3s ease",
                      boxShadow: "0 0 15px rgba(207, 25, 25, 0.51)",
                      "&:hover": {
                        transform: "translateY(-2px)",
                      },
                      "@media (max-width:1405px)": {
                        padding: "8px 18px",
                      },
                      "@media (max-width:1393px)": {
                        padding: "7px 16px",
                        justifyContent: "flex-end",
                        width: "100%",
                      },
                    }}
                  >
                    <FaEdit style={{ flexShrink: 0 }} />
                    Update
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box className="profile-info" sx={{ marginTop: "60px" }}>
            <GlowCard
              enableTilt={false}
              glowIntensity="soft"
            >
              <Grid container rowSpacing={2} sx={{ alignItems: "stretch", }}>
                <Grid item size={{ xs: 12, lg: 5 }} sx={{
                  display: "flex",
                }}>
                  {user?.roles[0] === "Admin" ? (
                    <PermissionsBox
                      permissions={adminPermissions[0].permissions}
                    />
                  ) : (
                    <PermissionsBox
                      permissions={superAdminPermissions[0].permissions}
                    />
                  )}
                </Grid>
                <Grid item size={{ xs: 12, lg: 7 }} sx={{
                  display: "flex",
                }}>
                  <Box
                    ref={formRef}
                    className="edit_user_info_form flex_column"
                    sx={{
                      height: "100%",
                      width: "100%",
                      bgcolor: "#3e27274d",
                      borderRadius: "20px",
                      paddingY: "20px",
                      paddingX: { xs: "40px", md: "60px", lg: "20px" },
                      paddingTop: { sm: "30px", md: "35px" },
                      marginLeft: { lg: "10px" },
                      "@media (max-width:1225px)": {
                        paddingY: "35px",
                      },
                      "@media (max-width:423px)": {
                        paddingX: "13px",
                      },
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
                      InputLabelProps={true}
                      defaultValues={{
                        fullName: user?.fullName,
                        userName: user?.userName,
                        email: user?.email,
                        phoneNumber: user?.phoneNumber,
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
                        marginTop: "30px",
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
      <DashboardFooter />
    </>
  );
}

export default AdminProfile;