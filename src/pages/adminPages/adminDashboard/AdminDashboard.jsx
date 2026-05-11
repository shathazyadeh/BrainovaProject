import { useState } from "react";
import useGetUsers from "../../../hooks/getUsersHooks/useGetUsers";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  Typography,
  Link,
} from "@mui/material";
import { FaUserDoctor } from "react-icons/fa6";
import { TbUsers } from "react-icons/tb";
import { PiStudentFill } from "react-icons/pi";
import { FiUsers, FiCheckCircle, FiSlash, FiAlertCircle } from "react-icons/fi";
import { LuGraduationCap, LuShield } from "react-icons/lu";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import { FaStethoscope } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import useFilteredArray from "../../../hooks/getUsersHooks/useFilteredArray";
import EnhancedTable from "../../../components/muiComponents/enhancedTabel/EnhancedTable";
import DashboardNavbar from "../../../components/muiComponents/dashboardNavbar/DashboardNavbar";
import BasicModal from "../../../components/muiComponents/basicModal/BasicModal";
import Loader from "../../../components/uiVerseComponents/loader/Loader";
import RoleCircularChart from "../../../components/xChartComponents/circularChart/RoleCircularChart";
import ActivityStatusBarChart from "../../../components/xChartComponents/barChart/ActivityStatusBarChart";

function AdminDashboard() {
  const { isError, error, isLoading, data } = useGetUsers(); //ممنوع نغير اسمها هاي ديستراكتينج للكويري الي بترجع من يوس كويري
  const activeUsers = data?.filter(
    (user) =>
      !user.isBlocked &&
      user.roleName !== "Admin" &&
      user.roleName !== "SuperAdmin",
  ).length;
  const blockedUsers = data?.filter(
    (user) =>
      user.isBlocked &&
      user.roleName !== "Admin" &&
      user.roleName !== "SuperAdmin",
  ).length;
  const unverifiedUsers = data?.filter(
    (user) =>
      !user.emailConfirmed &&
      user.roleName !== "Admin" &&
      user.roleName !== "SuperAdmin",
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

  const { filteredArr, studentsNo, supervisorsNo } = useFilteredArray(data); //هاي عشان فلترة المستخدمين بعد الحصول عالداتا

  const totalUsers = studentsNo + supervisorsNo;
  const studentsPercent = Math.round((studentsNo / totalUsers) * 100);
  const supervisorsPercent = Math.round((supervisorsNo / totalUsers) * 100);

  const rolesData = [
    {
      title: "Supervisor",
      count: supervisorsNo,
      permissions: [
        "Student Management",
        "Monitor Reports",
        "Track Progress",
        "Review Results",
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

  if (isLoading) {
    return (
      <>
        <DashboardNavbar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height:"100vh",
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
            height:"100vh"
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
        className="admin_dashboard"
        sx={{
          paddingX: "30px",
          paddingTop: "10px",
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
          <Box className="dashboard_summary"
            sx={{ display: "flex", gap: "10px", marginBottom: "23px" }}
          >
            <Grid container spacing={1} sx={{ width: "100%" }}>
              <Grid item size={{ xs:12, sm:6 , md: 3 }}>
                <Box
                  className="total_members"
                  sx={{
                    bgcolor: "#232121b8",
                    borderRadius: "50px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "15px",
                    padding: "10px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#4e4e4e7f",
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      bgcolor: "var(--primary-color)",
                      boxShadow: "0 0 15px rgba(207, 25, 25, 0.51)",
                      borderRadius: "50%",
                      padding: "15px",
                      display: "flex",
                    }}
                  >
                    <FiUsers size={30} color="#fff" />
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      textTransform: "uppercase",
                      fontSize: "15px",
                      textAlign: "center",
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
                      fontSize: "25px",
                      fontWeight: "600",
                      fontFamily: "var(--primary-font)",
                    }}
                  >
                    {totalUsers}
                  </Typography>
                </Box>
              </Grid>
              <Grid item size={{ xs:12, sm:6 , md: 3 }}>
                <Box
                  className="active_roles"
                  sx={{
                    bgcolor: "#232121b8",
                    borderRadius: "50px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "15px",
                    padding: "10px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#4e4e4e7f",
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      bgcolor: "var(--primary-color)",
                      boxShadow: "0 0 15px rgba(207, 25, 25, 0.51)",
                      borderRadius: "50%",
                      padding: "15px",
                      display: "flex",
                    }}
                  >
                    <FiCheckCircle size={30} color="#fff" />
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      textTransform: "uppercase",
                      fontSize: "15px",
                      textAlign: "center",
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
                      fontSize: "25px",
                      fontWeight: "600",
                      fontFamily: "var(--primary-font)",
                    }}
                  >
                    {activeUsers}
                  </Typography>
                </Box>
              </Grid>
              <Grid item size={{ xs:12, sm:6 , md: 3 }}>
                <Box
                  className="blocked_users"
                  sx={{
                    bgcolor: "#232121b8",
                    borderRadius: "50px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "15px",
                    padding: "10px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#4e4e4e7f",
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      bgcolor: "var(--primary-color)",
                      boxShadow: "0 0 15px rgba(207, 25, 25, 0.51)",
                      borderRadius: "50%",
                      padding: "15px",
                      display: "flex",
                    }}
                  >
                    <FiSlash size={30} color="#fff" />
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      textTransform: "uppercase",
                      fontSize: "15px",
                      textAlign: "center",
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
                      fontSize: "25px",
                      fontWeight: "600",
                      fontFamily: "var(--primary-font)",
                    }}
                  >
                    {blockedUsers}
                  </Typography>
                </Box>
              </Grid>
              <Grid item size={{ xs:12, sm:6 , md: 3 }}>
                <Box
                  className="unverified_members"
                  sx={{
                    bgcolor: "#232121b8",
                    borderRadius: "50px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "15px",
                    padding: "10px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#4e4e4e7f",
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      bgcolor: "var(--primary-color)",
                      boxShadow: "0 0 15px rgba(207, 25, 25, 0.51)",
                      borderRadius: "50%",
                      padding: "15px",
                      display: "flex",
                    }}
                  >
                    <FiAlertCircle size={30} color="#fff" />
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      textTransform: "uppercase",
                      textAlign: "center",
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
                      fontSize: "25px",
                      fontWeight: "600",
                      fontFamily: "var(--primary-font)",
                    }}
                  >
                    {unverifiedUsers}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box className="charts"
            sx={{
              marginY: "50px",
            }}
          >
            <Grid
              container
              spacing={3}
              sx={{ alignItems: "center", height: "400px" }}
            >
              <Grid item size={{ xs: 12, sm: 5 }}>
                <Box className="role_distribution">
                  <Box
                    className="header"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{ color: "#fff", fontWeight: "600" }}
                      >
                        Role Distribution
                      </Typography>

                      <Typography
                        sx={{ color: "#9ca3af", marginBottom: "30px" }}
                      >
                        Who's on the platform
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        border: "1px solid #9ca3af",
                        borderRadius: "25px",
                        paddingY: "3px",
                        paddingX: "10px",
                        color: "#9ca3af",
                        fontSize: "12px",
                      }}
                    >
                      {studentsNo + supervisorsNo} total
                    </Typography>
                  </Box>
                  {/*الدوائر */}
                  <Grid container>
                    <Grid item size={{ xs: 12, md: 6 }}>
                      <RoleCircularChart
                        value={supervisorsPercent}
                        color="#00d034"
                        title="Supervisors"
                        number={supervisorsNo}
                        icon={<FaStethoscope size={24} color="#00d034" />}
                      />
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>
                      <RoleCircularChart
                        value={studentsPercent}
                        color="#ff3737"
                        title="Students"
                        number={studentsNo}
                        icon={<LuGraduationCap size={24} color="#ff3737" />}
                      />
                    </Grid>
                  </Grid>
                  {/*الخطوط */}
                  <Box className="percents">
                    <Box className="supervisors_percent" sx={{ marginBottom: "20px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#9CA3AF",
                            fontSize: "13px",
                          }}
                        >
                          Supervisors
                        </Typography>

                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: "700",
                          }}
                        >
                          {supervisorsPercent}%
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          width: "100%",
                          height: "8px",
                          bgcolor: "#3c3a3aa8",
                          borderRadius: "999px",
                          overflow: "visible",
                        }}
                      >
                        <Box
                          sx={{
                            width: `${supervisorsPercent}%`,
                            height: "100%",
                            borderRadius: "999px",
                            background: `linear-gradient(90deg,#00d031 0%,#00d02dcc 60%,#00d01888 100%)`,
                            boxShadow: "0 0 4px #00d018",
                          }}
                        />
                      </Box>
                    </Box>
                    <Box className="students_percent">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#9CA3AF",
                            fontSize: "13px",
                          }}
                        >
                          Students
                        </Typography>

                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: "700",
                          }}
                        >
                          {studentsPercent}%
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          width: "100%",
                          height: "8px",
                          bgcolor: "#3c3a3aa8",
                          borderRadius: "999px",
                          overflow: "visible",
                        }}
                      >
                        <Box
                          sx={{
                            width: `${studentsPercent}%`,
                            height: "100%",
                            borderRadius: "999px",
                            background: `linear-gradient(90deg,#ff3737 0%,#ff3737cc 60%,#ff373788 100%)`,
                            boxShadow: "0 0 12px #ff375f",
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                size={{ xs: 12, sm: 7 }}
                sx={{
                  bgcolor: "#232121b8",
                  borderRadius: "12px",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ActivityStatusBarChart
                  active={activeUsers}
                  blocked={blockedUsers}
                  unverified={unverifiedUsers}
                />
              </Grid>
            </Grid>
          </Box>

          <Box className="system_roles" sx={{ color: "#fff", marginY: "40px" }}>
            <Box className="title"
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
                2 roles . {totalUsers} members
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {rolesData.map((role, index) => (
                <Grid key={index} item size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      bgcolor: "#464646",
                      height: "100%",
                      borderRadius: "25px",
                      display: "flex",
                      alignItems: "center",
                      gap: "30px",
                      paddingY: "10px",
                      color: "#fff",
                      transition: "0.2s",
                      "&:hover": {
                        background: "rgba(255,255,255,0.15)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "var(--navy-color)",
                        height: "fit-content",
                        borderTopRightRadius: "14px",
                        borderBottomRightRadius: "14px",
                        padding: "13px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.55)",
                      }}
                    >
                      <Box
                        component={"span"}
                        sx={{
                          color: "#fff",
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
                            color: "#fff",
                          }}
                        >
                          {role.title}
                        </Typography>
                        <Box
                          className="role_counts"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Box
                            component={TbUsers}
                            sx={{
                              fontSize:
                                role.title === "Supervisor" ? "16px" : "15px",
                              marginRight: "4px",
                              color: "#fff",
                            }}
                          />
                          <Typography
                            component={"span"}
                            sx={{
                              fontWeight:
                                role.title === "Supervisor" ? "800" : "500",
                              color: "#fff",
                            }}
                          >
                            {role.count}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      className="permissions"
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      <Typography
                        sx={{
                          marginRight: "4px",
                          opacity: 0.7,
                          fontWeight: "500",
                        }}
                      >
                        Can:
                      </Typography>

                      {role.permissions.map((perm, i) => (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              paddingX: "10px",
                              paddingY: "4px",
                              borderRadius: "8px",
                              background: "rgba(255,255,255,0.08)",
                              fontSize: "12px",
                              fontWeight: "500",
                              transition: "0.2s",
                              "&:hover": {
                                background: "rgba(255,255,255,0.15)",
                                transform: "translateY(-1px)",
                              },
                            }}
                          >
                            {perm}
                          </Typography>

                          {i !== role.permissions.length - 1 && (
                            <Typography
                              sx={{
                                marginX: "6px",
                                opacity: 0.3,
                              }}
                            >
                              •
                            </Typography>
                          )}
                        </Box>
                      ))}
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
              to={"/dashboard/admin/user-management"}
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

export default AdminDashboard;