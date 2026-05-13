import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Link,
  useMediaQuery,
} from "@mui/material";
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
import DashboardFooter from "../../../components/dashboardFooter/DashboardFooter";

function SuperAdminDashboard() {
  const { isError, error, isLoading, data } = useGetUsers(); //ممنوع نغير اسمها هاي ديستراكتينج للكويري الي بترجع من يوس كويري

  const isBelow1110px = useMediaQuery("(max-width:1110px)");
  const isBelow1010px = useMediaQuery("(max-width:1010px)");
  const isBelow770px = useMediaQuery("(max-width:770px)");

  const activeUsers = data?.filter(
    (user) => !user.isBlocked && user.roleName !== "SuperAdmin",
  ).length;
  const blockedUsers = data?.filter(
    (user) => user.isBlocked && user.roleName !== "SuperAdmin",
  ).length;
  const unverifiedUsers = data?.filter(
    (user) => !user.emailConfirmed && user.roleName !== "SuperAdmin",
  ).length;

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

  const summaryCards = [
    {
      className: "total_members",
      title: "Total Members",
      value: data?.length - 1,
      icon: FiUsers,
    },
    {
      className: "active_roles",
      title: "Active Roles",
      value: activeUsers,
      icon: FiCheckCircle,
    },
    {
      className: "blocked_users",
      title: "Blocked Roles",
      value: blockedUsers,
      icon: FiSlash,
    },
    {
      className: "unverified_members",
      title: "Unverified Members",
      value: unverifiedUsers,
      icon: FiAlertCircle,
    },
  ];

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
      icon: RiAdminFill,
    },
    {
      title: "Supervisor",
      count: supervisorsNo,
      permissions: [
        "Student Management",
        "Monitor Reports",
        "Track Progress",
        "Review Analysis Results",
        "Review and Manage Student Feedback",
      ],
      icon: FaUserDoctor,
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
      icon: PiStudentFill,
    },
  ];

  if (isLoading) {
    return (
      <>
        <DashboardNavbar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Box sx={{ marginTop: "290px" }}>
            <Loader />
          </Box>
        </Box>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <DashboardNavbar />
        <Box
          component={"section"}
          className="server_error_section flex_column"
          sx={{
            height: "100vh",
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
      </>
    );
  }

  return (
    <>
      <DashboardNavbar />
      <Box
        component={"section"}
        className="superadmin_dashboard"
        sx={{
          paddingTop: { xs: "30px", md: "0px" },
        }}
      >
        <Container maxWidth="lg">
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
              {summaryCards.map((card, index) => (
                <Grid
                  key={index}
                  item
                  size={{ xs: 6, md: isBelow1110px ? 6 : 3 }}
                >
                  <Box
                    className={card.className}
                    sx={{
                      bgcolor: "#232121b8",
                      height: "100%",
                      borderRadius: "12px",
                      display: "flex",
                      justifyContent: "space-between",
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
                          "@media (max-width:1250px)": {
                            fontSize: "13px",
                          },
                          "@media (max-width:1110px)": {
                            fontSize: "15px",
                          },
                          "@media (max-width:700px)": {
                            fontSize: "13px",
                          },
                          "@media (max-width:520px)": {
                            fontSize: "11px",
                          },
                        }}
                      >
                        {card.title}
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
                        {card.value}
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
                      <Box
                        component={card.icon}
                        sx={{
                          fontSize: "30px",
                          color: "#fff",
                          "@media (max-width:1250px)": { fontSize: "25px" },
                          "@media (max-width:1110px)": { fontSize: "30px" },
                          "@media (max-width:700px)": { fontSize: "27px" },
                          "@media (max-width:520px)": { fontSize: "25px" },
                        }}
                      />
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            className="charts"
            sx={{
              marginBottom: "40px",
              bgcolor: "#232121b8",
              borderRadius: "12px",
            }}
          >
            <Grid container columnSpacing={3} sx={{ alignItems: "flex-end" }}>
              <Grid
                item
                size={{ xs: 12, sm: 4.5 }}
                sx={{
                  marginBottom: { xs: "15px", sm: "5px" },
                  paddingLeft: "8px",
                  paddingTop: { xs: "20px", sm: "0px" },
                }}
              >
                <TitanicPie
                  students={studentsNo}
                  supervisors={supervisorsNo}
                  admins={adminNo}
                />
              </Grid>
              <Grid item size={{ xs: 12, sm: 7.5 }}>
                <ActivityStatusBarChart
                  active={activeUsers}
                  blocked={blockedUsers}
                  unverified={unverifiedUsers}
                />
              </Grid>
            </Grid>
          </Box>
          <Box className="system_roles" sx={{ color: "#fff", marginY: "30px" }}>
            <Box
              className="title"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                paddingBottom: "14px",
                "@media (max-width:400px)": {
                  flexDirection: "column",
                  alignItems: "flex-start",
                },
              }}
            >
              <Typography
                component={"h2"}
                variant="h5"
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
                }}
              >
                3 roles . {data?.length - 1} members
              </Typography>
            </Box>

            <Grid container spacing={2} sx={{ justifyContent: "center" }}>
              {rolesData.map((role, index) => (
                <Grid
                  key={index}
                  item
                  size={{
                    xs: 12,
                    sm: isBelow770px ? 6 : 4,
                    md: isBelow1010px ? 6 : 4,
                  }}
                >
                  <Box
                    className={style.card_hover_effect}
                    sx={{
                      "--shine-color":
                        role.title === "Supervisor"
                          ? "rgba(207,25,25,0.25)"
                          : "rgba(255,255,255,0.15)",

                      height: "100%",
                      padding: "20px",
                      borderRadius: "18px",

                      background:
                        role.title === "Supervisor"
                          ? "rgba(207, 25, 25, 0.18)"
                          : "rgba(255,255,255,0.08)",

                      border:
                        role.title === "Supervisor"
                          ? "1px solid rgba(207,25,25,0.4)"
                          : "1px solid rgba(255,255,255,0.15)",

                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "18px",
                      }}
                    >
                      <Box
                        component={role.icon}
                        sx={{
                          "--pulse-color":
                            role.title === "Supervisor" ? "#ff4d4d" : "#fff",
                          padding: "10px",
                          borderRadius: "12px",
                          background:
                            role.title === "Supervisor"
                              ? "var(--primary-color)"
                              : "rgba(255,255,255,0.2)",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "53px",
                          "@media (max-width:1150px)": {
                            fontSize: "45px",
                          },
                        }}
                      />

                      <Box>
                        <Typography
                          sx={{
                            fontSize: "18px",
                            fontWeight: "600",
                            "@media (max-width:1150px)": { fontSize: "17px" },
                            "@media (max-width:400px)": { fontSize: "15px" },
                          }}
                        >
                          {role.title}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: "13px",
                            color: "rgba(255,255,255,0.75)",
                            "@media (max-width:600px)": { fontSize: "11px" },
                          }}
                        >
                          {role.count} members
                        </Typography>
                      </Box>
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          marginBottom: "10px",
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        Permissions
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "7px",
                        }}
                      >
                        {role.permissions.map((perm, i) => (
                          <Box
                            key={i}
                            sx={{
                              fontSize: "12px",
                              padding: "5px 10px",
                              borderRadius: "999px",
                              background:
                                role.title === "Supervisor"
                                  ? "rgba(207, 25, 25, 0.25)"
                                  : "rgba(255,255,255,0.15)",
                              color: "#fff",
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "6px",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                bgcolor:
                                  role.title === "Supervisor"
                                    ? "rgba(255,255,255,0.15)"
                                    : "rgba(80, 79, 79, 0.25)",
                                transform: "translateY(-1px)",
                              },
                            }}
                          >
                            <Box
                              className={style.pulse_wrapper}
                              sx={{
                                "--pulse-color":
                                  role.title === "Supervisor"
                                    ? "var(--primary-color)"
                                    : "rgba(255,255,255,0.9)",
                                marginTop: "2px",
                              }}
                            >
                              <IoMdCheckmarkCircleOutline size={14} />
                            </Box>
                            {perm}
                          </Box>
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
              paddingTop: "10px",
              paddingRight: "10px",
              "@media (max-width:768px)": {
                paddingTop: "0px",
              }
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
              View All{" "}
              <HiOutlineArrowNarrowRight style={{ verticalAlign: "middle" }} />
            </Link>
          </Box>

          <BasicModal
            open={open} // حالة فتح المودال
            handleClose={handleClose} // فنكشن الاغلاق
            user={selectedUser} // بيانات المستخدم المختار
            type="editUser"
          />

        </Container>
      </Box>
 
         <DashboardFooter/>

    </>
  );
}

export default SuperAdminDashboard;