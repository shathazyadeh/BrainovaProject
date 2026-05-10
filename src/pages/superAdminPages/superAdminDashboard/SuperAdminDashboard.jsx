import { useState } from "react";
import { Box, Button, CircularProgress, Container, Grid, Typography, Link } from "@mui/material";
import useGetUsers from "../../../hooks/getUsersHooks/useGetUsers";
import { FaUserDoctor } from "react-icons/fa6";
import { TbUsers } from "react-icons/tb";
import { FiUsers, FiCheckCircle, FiSlash, FiAlertCircle } from "react-icons/fi";
import { PiStudentFill } from "react-icons/pi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link as RouterLink } from "react-router-dom";
import TitanicPie from "../../../components/xChartComponents/titanicPie/TitanicPie";
import useFilteredArray from "../../../hooks/getUsersHooks/useFilteredArray";
import EnhancedTable from "../../../components/muiComponents/enhancedTabel/EnhancedTable";
import DashboardNavbar from "../../../components/muiComponents/dashboardNavbar/DashboardNavbar";
import BasicModal from "../../../components/muiComponents/basicModal/BasicModal";
import style from "./SuperAdminDashboard.module.css";
import ActivityStatusBarChart from "../../../components/xChartComponents/barChart/ActivityStatusBarChart";
import Loader from "../../../components/uiVerseComponents/loader/Loader";

function SuperAdminDashboard() {
  const { isError, error, isLoading, data } = useGetUsers(); //ممنوع نغير اسمها هاي ديستراكتينج للكويري الي بترجع من يوس كويري
  const activeUsers = data?.filter(user => !user.isBlocked).length;
  const blockedUsers = data?.filter(user => user.isBlocked).length;
  const unverifiedUsers = data?.filter(user => !user.emailConfirmed).length;

  // state للتحكم بفتح واغلاق المودال
  const [open, setOpen] = useState(false);
  // فنكشن فتح المودال
  // نخزن المستخدم الذي ضغطنا عليه
  const [selectedUser, setSelectedUser] = useState(null);
  const handleOpen = (user) => {
    setSelectedUser(user); // حفظ بيانات المستخدم
    setOpen(true); // فتح المودال
  };

  // فنكشن اغلاق المودال
  const handleClose = () => {
    setOpen(false); // اغلاق المودال
  };

  const { filteredArr, studentsNo, supervisorsNo, adminNo } =
    useFilteredArray(data); //هاي عشان فلترة المستخدمين بعد الحصول عالداتا

  const rolesData = [
  {
    title: "Admin",
    count: adminNo,
    permissions: [
      "View Supervisors & Students",
      "Create Users - Supervisors & Students",
      "Update User Information",
      "Block / Unblock Users",
      "Delete Users",
    ],
    icon: <RiAdminFill size={35} />,
  },
  {
    title: "Supervisor",
    count: supervisorsNo,
    permissions: [
      "Student Management",
      "Review Analysis Results",
      "Monitor Reports",
      "Review and Manage Student Feedback",
    ],
    icon: <FaUserDoctor size={35} />,
  },
  {
    title: "Student",
    count: studentsNo,
    permissions: [
      "Upload Medical Images",
      "View AI Results",
      "View History",
      "Upload Reports",
      "Explore 3D Brain Models for Learning",
    ],
    icon: <PiStudentFill size={35} />,
  },
];

  return (
    <>
      <DashboardNavbar />
      <Box
        component={"section"}
        className="superadmin_dashboard"
        sx={{
          paddingBottom: "50px",
        }}
      >
        <Container maxWidth="lg">
          {/* server errors */}
          {isError && (
            <Box
              component={"section"}
              className="server_error_section flex_column"
              sx={{
                bgcolor: "var(--navy-color)",
                position: "absolute",
                inset: 0,
                top: "90px",
                zIndex: 1,
              }}
            >
              <Typography
                component={"h1"}
                variant="h5"
                sx={{
                  marginTop: "290px",
                  color: "white",
                  fontWeight: "700",
                  textAlign: "center",
                  "@media (max-width:456px)": {
                    fontSize: "20px",
                  },
                }}
              >
                {error?.message || "Something went wrong"}
              </Typography>
            </Box>
          )}
          {isLoading && (
            <Box
              sx={{
                bgcolor: "var(--navy-color)",
                position: "absolute",
                inset: 0,
                top: "90px",
                display: "flex",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              <Box sx={{ marginTop: "290px" }}>
                <Loader />
              </Box>
            </Box>
          )}
          <Box className="section_titel" sx={{ marginBottom: "23px" }}>
            <Typography
              component={"h1"}
              variant="h4"
              sx={{
                color: "#fff",
                fontFamily: "var(--primary-font)",
                fontWeight: "600",
                display: "inline",
                marginRight: "10px",
                "@media (max-width:700px)": {
                  fontSize: "22px",
                },
              }}
            >
              Roles & Permissions
            </Typography>
            <Typography sx={{ color: "var(--secondary-color)" }}>
              Define what each member can see and do. Keep sensitive actions
              behind clear, auditable scopes.
            </Typography>
          </Box>
          <Box
            className="dashboard_summary"
            sx={{ display: "flex", gap: "10px", marginBottom: "23px" }}
          >
            <Grid container spacing={1} sx={{ width: "100%" }}>
              <Grid item size={{ xs: 6, sm: 3 }}>
                <Box
                  className="total_members"
                  sx={{
                    bgcolor: "#232121b8",
                    height: "100%",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    gap: "15px",
                    paddingX: "15px",
                    paddingTop: "18px",
                    paddingBottom: "27px",
                    transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: "#4e4e4e7f",
                          transform: "translateY(-3px)",
                    },
                  }}
                >
                  <Box className="details flex_column" sx={{ gap: "10px" }}>
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        textTransform: "uppercase",
                        fontSize: "15px",
                        fontFamily: "var(--primary-font)",
                        "@media (max-width:700px)": {
                          fontSize: "11px",
                        },
                      }}
                    >
                      Total Members
                    </Typography>
                    <Typography
                      sx={{
                        color: "#fff",
                        textTransform: "uppercase",
                        fontSize: "20px",
                        fontWeight: "600",
                        fontFamily: "var(--primary-font)",
                      }}
                    >
                      {data?.length - 1} {/* طرحنا السوبر ادمن نفسه */}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      bgcolor: "var(--primary-color)",
                      boxShadow: "0 0 15px rgba(207, 25, 25, 0.51)",
                      borderRadius: "12px",
                      padding: "8px",
                      display: "flex",
                    }}
                  >
                    <FiUsers size={30} color="#fff" />
                  </Typography>
                </Box>
              </Grid>
              <Grid item size={{ xs: 6, sm: 3 }}>
                <Box
                  className="active_roles"
                  sx={{
                    bgcolor: "#232121b8",
                    height: "100%",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    gap: "15px",
                    paddingX: "15px",
                    paddingTop: "18px",
                    paddingBottom: "27px",
                    transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: "#4e4e4e7f",
                          transform: "translateY(-3px)",
                    },
                  }}
                >
                  <Box
                    className="details flex_column"
                    sx={{ gap: "10px", position: "relative" }}
                  >
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        textTransform: "uppercase",
                        fontSize: "15px",
                        fontFamily: "var(--primary-font)",
                        "@media (max-width:700px)": {
                          fontSize: "11px",
                        },
                      }}
                    >
                      Active Roles
                    </Typography>
                    <Typography
                      sx={{
                        color: "#fff",
                        textTransform: "uppercase",
                        fontSize: "20px",
                        fontWeight: "600",
                        fontFamily: "var(--primary-font)",
                      }}
                    >
                      {activeUsers}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      bgcolor: "var(--primary-color)",
                      boxShadow: "0 0 15px rgba(207, 25, 25, 0.51)",
                      borderRadius: "12px",
                      padding: "8px",
                      display: "flex",
                    }}
                  >
                    <FiCheckCircle size={30} color="#fff" />
                  </Typography>
                </Box>
              </Grid>
              <Grid item size={{ xs: 6, sm: 3 }}>
                <Box
                  className="blocked_users"
                  sx={{
                    bgcolor: "#232121b8",
                    height: "100%",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    gap: "15px",
                    paddingX: "15px",
                    paddingTop: "18px",
                    paddingBottom: "27px",
                    transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: "#4e4e4e7f",
                          transform: "translateY(-3px)",
                    },
                  }}
                >
                  <Box className="details flex_column" sx={{ gap: "10px" }}>
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        textTransform: "uppercase",
                        fontSize: "15px",
                        fontFamily: "var(--primary-font)",
                        "@media (max-width:700px)": {
                          fontSize: "11px",
                        },
                      }}
                    >
                      Blocked Roles
                    </Typography>
                    <Typography
                      sx={{
                        color: "#fff",
                        textTransform: "uppercase",
                        fontSize: "20px",
                        fontWeight: "600",
                        fontFamily: "var(--primary-font)",
                      }}
                    >
                      {blockedUsers}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      bgcolor: "var(--primary-color)",
                      boxShadow: "0 0 15px rgba(207, 25, 25, 0.51)",
                      borderRadius: "12px",
                      padding: "8px",
                      display: "flex",
                    }}
                  >
                    <FiSlash size={30} color="#fff" />
                  </Typography>
                </Box>
              </Grid>
              <Grid item size={{ xs: 6, sm: 3 }}>
                <Box
                  className="unverified_members"
                  sx={{
                    bgcolor: "#232121b8",
                    height: "100%",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    gap: "15px",
                    paddingX: "15px",
                    paddingTop: "18px",
                    paddingBottom: "27px",
                    transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: "#4e4e4e7f",
                          transform: "translateY(-3px)",
                    },
                  }}
                >
                  <Box className="details flex_column" sx={{ gap: "10px" }}>
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        textTransform: "uppercase",
                        fontSize: "15px",
                        fontFamily: "var(--primary-font)",
                        "@media (max-width:700px)": {
                          fontSize: "11px",
                        },
                      }}
                    >
                      Unverified Members
                    </Typography>
                    <Typography
                      sx={{
                        color: "#fff",
                        textTransform: "uppercase",
                        fontSize: "20px",
                        fontWeight: "600",
                        fontFamily: "var(--primary-font)",
                      }}
                    >
                      {data?.length}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      bgcolor: "var(--primary-color)",
                      boxShadow: "0 0 15px rgba(207, 25, 25, 0.51)",
                      borderRadius: "12px",
                      padding: "8px",
                      display: "flex",
                    }}
                  >
                    <FiAlertCircle size={30} color="#fff" />
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box className="charts" sx={{marginBottom:"40px"}}>
                <Grid container spacing={3} sx={{alignItems:"flex-end"}}>
                  <Grid item size={{xs:12,sm:4.5}}>
                    <TitanicPie
                  students={studentsNo}
                  supervisors={supervisorsNo}
                  admins={adminNo}
                />
                  </Grid>
                  <Grid item size={{xs:12,sm:7.5}}>
                    <ActivityStatusBarChart
  active={activeUsers}
  blocked={blockedUsers}
  unverified={unverifiedUsers}
/>
                  </Grid>
                </Grid>
          </Box>
          <Box className="system_roles" sx={{ color: "#fff", marginY: "40px" }}>
            <Box
              className="title"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                paddingBottom: "14px",
              }}
            >
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "23px",
                  fontFamily: "var(--primary-font)",
                  fontWeight: "600",
                  display: "inline",
                  marginRight: "10px",
                  "@media (max-width:700px)": {
                    fontSize: "22px",
                  },
                }}
              >
                All roles
              </Typography>
              <Typography
                sx={{
                  color: "var(--secondary-color)",
                  fontSize: "13px",
                  fontFamily: "var(--primary-font)",
                  fontWeight: "600",
                  display: "inline",
                  marginRight: "10px",
                  "@media (max-width:700px)": {
                    fontSize: "22px",
                  },
                }}
              >
                3 roles . {data?.length - 1} members
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {rolesData.map((role, index) => (
                <Grid
                  key={index}
                  item
                  size={{ xs: 12, md: 4 }}
                >
                  <Box className={style.card_hover_effect}
      sx={{
        "--shine-color": //للهوفر
      role.title === "Supervisor"
        ? "rgba(18, 18, 18, 0.14)"
        : "rgba(255, 255, 255, 0.12)",
                    ...((role.title === "Admin" ||
                      role.title === "Student") && {
                      bgcolor: "rgba(255, 255, 255, 0.22)",
                      border: "1px solid #d0cccc36",
                      boxShadow: "0 0 15px rgba(255, 255, 255, 0.15)",
                    }),
                    ...(role.title === "Supervisor" && {
                      bgcolor: "var(--primary-color)",
                      boxShadow: "0 0 15px rgba(207, 25, 25, 0.51)",
                    }),
                    height:"100%",
                    padding: "30px",
                    borderRadius: "25px",
                    color:
                      role.title === "Supervisor" ? "var(--navy-color)" : "#fff",
                  }}
    >
                  {/* Header */}
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "12px",marginBottom:"30px" }}
                  >
                    <Box
                      component={"span"}
                      sx={{
                        bgcolor:
                          role.title === "Admin" || role.title === "Student"
                            ? "#524e4e"
                            : "var(--navy-color)",
                        padding: "13px",
                        borderRadius: "14px",
                        boxShadow: "0 0 15px rgb(15, 14, 14)",
                        color: "#fff"
                      }}
                    >
                      {role.icon}
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          fontSize: "23px",
                          fontWeight:
                            role.title === "Supervisor" ? "800" : "500",
                        }}
                      >
                        {role.title}
                      </Typography>
                    <Box className="role_counts" sx={{display:"flex",alignItems:"center"}}>
                      <Box
                            component={TbUsers}
                            sx={{ 
                              fontSize:
                              role.title === "Supervisor" ? "16px" : "15px",
                              marginRight: "4px" 
                            }}
                          />
                    <Typography component={"span"}
                                sx={{
                            fontWeight:
                              role.title === "Supervisor" ? "800" : "500",
                                }}
                    >{role.count}</Typography>
                    </Box>
                  </Box>
                  </Box>


                  {/* Permissions */}
                  <Box>
                    <Typography sx={{ 
                            fontSize:
                              role.title === "Supervisor" ? "16px" : "15px",
                            fontWeight:
                              role.title === "Supervisor" ? "800" : "500",
                            marginBottom: "6px"
                       }}>
                      Permissions:
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "9px",
                        flexDirection: "column",
                      }}
                    >
                      {role.permissions.map((perm, i) => (
                        <Typography
                          className={style.pulse_wrapper}
                          key={i}
                          sx={{
                            "--pulse-color":
                              role.title === "Supervisor"
                                ? "var(--navy-color)"
                                : "#fff",
                            borderRadius: "20px",
                            paddingX: "10px",
                            paddingY: "4px",
                            fontSize:
                              role.title === "Supervisor" ? "16px" : "15px",
                            fontWeight:
                              role.title === "Supervisor" ? "800" : "500",
                            whiteSpace: "nowrap",
                            display:"flex",
                            alignItems:"center"
                          }}
                        >
                          <Box
                            component={IoMdCheckmarkCircleOutline}
                            sx={{ 
                              fontSize:
                              role.title === "Supervisor" ? "16px" : "15px",
                              marginRight: "8px" 
                            }}
                          />
                          {perm}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <EnhancedTable
            rows={filteredArr}
            handleOpen={handleOpen} // نرسل فنكشن فتح المودال للجدول
            showActions={false}
            hidePagination={true}
            hideCheckbox={true}
          />

          <Box
                className="link"
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: "10px",
                  "@media (max-width:768px)": {
                    paddingTop: "0px",
                  },
                }}
              >
                <Link
                  component={RouterLink}
                  to={"/dashboard/super-admin/user-management"}
                  sx={{
                    color: "var(--primary-color)",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                  className="auth_link"
                >
                  View All <HiOutlineArrowNarrowRight />
                </Link>
              </Box>

          <BasicModal
            open={open} // حالة فتح المودال
            handleClose={handleClose} // فنكشن الاغلاق
            user={selectedUser} // بيانات المستخدم المختار
            type="editUser"
          />

          <Box
            className="lower_footer"
            sx={{
              borderTop: "1px solid rgba(53, 53, 53, 0.93)",
              width: "fit-content",
              margin: "auto",
              paddingX: { xs: "0px", md: "200px" },
              textAlign: "center",
              marginTop: "60px",
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
        </Container>
      </Box>
    </>
  );
}

export default SuperAdminDashboard;