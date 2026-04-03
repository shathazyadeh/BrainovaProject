import { useState } from "react";
import useGetUsers from "../../../hooks/getUsersHooks/useGetUsers";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { FaUserDoctor } from "react-icons/fa6";
import { TbUsers } from "react-icons/tb";
import { PiStudentFill } from "react-icons/pi";
import { Link as RouterLink } from "react-router-dom";
import TitanicPie from "../../../components/xChartComponents/titanicPie/TitanicPie";
import useFilteredArray from "../../../hooks/getUsersHooks/useFilteredArray";
import EnhancedTable from "../../../components/muiComponents/enhancedTabel/EnhancedTable";
import DashboardNavbar from "../../../components/muiComponents/dashboardNavbar/DashboardNavbar";
import BasicModal from "../../../components/muiComponents/basicModal/BasicModal";

function AdminDashboard() {
  const { isError, error, isLoading, data } = useGetUsers(); //ممنوع نغير اسمها هاي ديستراكتينج للكويري الي بترجع من يوس كويري

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

  //اخذ بوزيشين عشان يكون فوق كلشي حتى الدروار
  if (isLoading)
    return (
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          bgcolor: "var(--navy-color)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#fff" }}></CircularProgress>
      </Box>
    );
  if (isError) {
    //server errors
    return (
      <Box
        component={"section"}
        className="server_error_section flex_column"
        sx={{
          bgcolor: "var(--navy-color)",
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Typography
          component={"h1"}
          variant="h5"
          sx={{ color: "white", fontWeight: "700", textAlign: "center" }}
        >
          {error?.message}
        </Typography>
        <Button
          className="auth_btn"
          component={RouterLink}
          to="/auth/login"
          sx={{
            bgcolor: "var(--primary-color)",
            color: "white",
            borderRadius: "6px",
            fontWeight: "600",
            paddingX: "25px",
            paddingY: "10px",
          }}
        >
          Back to Login
        </Button>
      </Box>
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
        <Box
          className="system_roles"
          sx={{ color: "#fff", marginBottom: "25px" }}
        >
          <Grid container spacing={3}>
            <Grid
              item
              size={{ xs: 12, md: 6, lg: 4.5 }}
              className="supervisor"
              sx={{
                bgcolor: "rgba(0, 0, 0, 0.46)",
                padding: "30px",

                borderRadius: "25px",
              }}
            >
              <Box
                className="header"
                sx={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Box
                  component={"span"}
                  className="icon"
                  sx={{
                    bgcolor: "rgb(129, 15, 15)",
                    padding: "13px",
                    borderRadius: "14px",
                  }}
                >
                  <FaUserDoctor size={35} />
                </Box>
                <Box className="description">
                  <Typography component={"h3"} variant="h6">
                    Supervisor
                  </Typography>
                  <Typography
                    component={"p"}
                    sx={{ color: "var(--secondary-color)", lineHeight: "16px" }}
                  >
                    Oversee students and review their AI analysis results.
                  </Typography>
                </Box>
              </Box>
              <Box className="users_number" sx={{ marginY: "20px" }}>
                <TbUsers size={17} style={{ marginRight: "5px" }} />
                <Typography component={"span"}>{supervisorsNo}</Typography>
              </Box>
              <Box className="permissions">
                <Typography
                  component={"h4"}
                  sx={{ color: "var(--secondary-color)", marginBottom: "6px" }}
                >
                  Permissions:
                </Typography>
                <Box
                  className="permissions_details "
                  sx={{ display: "flex", gap: "9px", flexWrap: "wrap" }}
                >
                  <Typography
                    sx={{
                      bgcolor: " rgba(246, 56, 56, 0.12)",
                      border: "1px solid #ef4444",
                      borderRadius: "20px",
                      paddingX: "10px",
                      paddingY: "4px",
                      fontSize: "15px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Student Management
                  </Typography>
                  <Typography
                    sx={{
                      bgcolor: " rgba(246, 56, 56, 0.12)",
                      border: "1px solid #ef4444",
                      borderRadius: "20px",
                      paddingX: "10px",
                      paddingY: "4px",
                      fontSize: "15px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Review Analysis Results
                  </Typography>

                  <Typography
                    sx={{
                      bgcolor: " rgba(246, 56, 56, 0.12)",
                      border: "1px solid #ef4444",
                      borderRadius: "20px",
                      paddingX: "10px",
                      paddingY: "4px",
                      fontSize: "15px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Monitor Reports
                  </Typography>
                  <Typography
                    sx={{
                      bgcolor: " rgba(246, 56, 56, 0.12)",
                      border: "1px solid #ef4444",
                      borderRadius: "20px",
                      paddingX: "10px",
                      paddingY: "4px",
                      fontSize: "15px",
                      whiteSpace: { xs: "wrap", sm: "nowrap" },
                    }}
                  >
                    Review and Manage Student Feedback
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              size={{ xs: 12, md: 6, lg: 4.5 }}
              item
              className="student"
              sx={{
                bgcolor: "rgba(0, 0, 0, 0.46)",
                padding: "30px",

                borderRadius: "25px",
              }}
            >
              <Box
                className="header"
                sx={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Box
                  component={"span"}
                  className="icon"
                  sx={{
                    bgcolor: "#524e4e",
                    padding: "13px",
                    borderRadius: "14px",
                  }}
                >
                  <PiStudentFill size={35} />
                </Box>
                <Box className="description">
                  <Typography component={"h3"} variant="h6">
                    Student
                  </Typography>
                  <Typography
                    component={"p"}
                    sx={{ color: "var(--secondary-color)", lineHeight: "16px" }}
                  >
                    Upload medical images and view AI analysis results.
                  </Typography>
                </Box>
              </Box>
              <Box className="users_number" sx={{ marginY: "20px" }}>
                <TbUsers size={17} style={{ marginRight: "5px" }} />
                <Typography component={"span"}>{studentsNo}</Typography>
              </Box>
              <Box className="permissions">
                <Typography
                  component={"h4"}
                  sx={{ color: "var(--secondary-color)", marginBottom: "6px" }}
                >
                  Permissions:
                </Typography>
                <Box
                  className="permissions_details "
                  sx={{ gap: "9px", display: "flex", flexWrap: "wrap" }}
                >
                  <Typography
                    sx={{
                      bgcolor: " rgba(246, 56, 56, 0.12)",
                      border: "1px solid #ef4444",
                      borderRadius: "20px",
                      paddingX: "10px",
                      paddingY: "4px",
                      fontSize: "15px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Upload Medical Images
                  </Typography>
                  <Typography
                    sx={{
                      bgcolor: " rgba(246, 56, 56, 0.12)",
                      border: "1px solid #ef4444",
                      borderRadius: "20px",
                      paddingX: "10px",
                      paddingY: "4px",
                      fontSize: "15px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    View AI Results
                  </Typography>

                  <Typography
                    sx={{
                      bgcolor: " rgba(246, 56, 56, 0.12)",
                      border: "1px solid #ef4444",
                      borderRadius: "20px",
                      paddingX: "10px",
                      paddingY: "4px",
                      fontSize: "15px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    View History
                  </Typography>
                  <Typography
                    sx={{
                      bgcolor: " rgba(246, 56, 56, 0.12)",
                      border: "1px solid #ef4444",
                      borderRadius: "20px",
                      paddingX: "10px",
                      paddingY: "4px",
                      fontSize: "15px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Upload Reports
                  </Typography>

                  <Typography
                    sx={{
                      bgcolor: " rgba(246, 56, 56, 0.12)",
                      border: "1px solid #ef4444",
                      borderRadius: "20px",
                      paddingX: "10px",
                      paddingY: "4px",
                      fontSize: "15px",
                      whiteSpace: { xs: "wrap", sm: "nowrap" },
                    }}
                  >
                    Explore 3D Brain Models for Learning
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              size={{ xs: 12, lg: 3 }}
              className="pie_chart"
              sx={{
                bgcolor: "rgba(0, 0, 0, 0.46)",
                borderRadius: "25px",
              }}
            >
              <TitanicPie students={studentsNo} supervisors={supervisorsNo} />
            </Grid>
          </Grid>
        </Box>

        <EnhancedTable
          rows={filteredArr}
          handleOpen={handleOpen} // نرسل فنكشن فتح المودال للجدول
        />

        <BasicModal
          open={open} // حالة فتح المودال
          handleClose={handleClose} // فنكشن الاغلاق
          user={selectedUser} // بيانات المستخدم المختار
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
      </Box>
    </>
  );
}

export default AdminDashboard;