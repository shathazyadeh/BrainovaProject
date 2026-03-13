import { useState } from "react";
import useGetUsers from "../../hooks/useGetUsers";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";

import { FaUserDoctor } from "react-icons/fa6";
import { TbUsers } from "react-icons/tb";
import { PiStudentFill } from "react-icons/pi";
import { Link as RouterLink } from "react-router-dom";
import TitanicPie from "../../components/titanicPie/TitanicPie";
import useFilteredArray from "../../hooks/useFilteredArray";
import EnhancedTable from "../../components/enhancedTabel/EnhancedTable";
import BasicModal from "../../components/basicModal/BasicModal";
import NestedModal from "../../components/nestedModal/NestedModal";

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



  if (isLoading) return <CircularProgress></CircularProgress>;
  if (isError) {
    if (error?.status === 401) {
      //unotherized error
      return (
        <Box
          component={"section"}
          className="server_error_section flex_column"
          sx={{
            height: "100vh",
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
            Your session has expired due to inactivity.
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
    } else {
      //aother errors
      return (
        <Box
          component={"section"}
          className="server_error_section flex_column"
          sx={{
            height: "100vh",
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
  }

  const { filteredArr, studentsNo, supervisorsNo } = useFilteredArray(data); //هاي عشان فلترة المستخدمين بعد الحصول عالداتا

  return (
    <Box
      component={"section"}
      className="admin_dashboard"
      sx={{
        bgcolor: "rgba(163, 155, 155, 0.2)",
        borderRadius: "25px",
        padding: "30px",
      }}
    >
      <Box
        className="system_roles"
        sx={{ color: "#fff", marginBottom: "25px" }}
      >
        <Grid container sx={{ gap: "20px" }}>
          <Grid
            item
            className="supervisor"
            sx={{
              bgcolor: "var(--navy-color)",
              padding: "30px",
              borderRadius: "25px",
            }}
          >
            <Box className="header" sx={{ display: "flex", gap: "12px" }}>
              <Typography
                component={"span"}
                className="icon"
                sx={{
                  bgcolor: "rgb(17, 104, 181)",
                  padding: "13px",
                  borderRadius: "14px",
                }}
              >
                <FaUserDoctor size={35} />
              </Typography>
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
                className="permissions_details flex_column"
                sx={{ gap: "9px" }}
              >
                <Box
                  className="permissions_details_upper"
                  sx={{ display: "flex", gap: "9px" }}
                >
                  <Typography
                    sx={{
                      bgcolor: "rgba(61, 59, 59, 0.9)",
                      border: "1px solid rgba(115, 114, 114, 0.9)",
                      borderRadius: "20px",
                      paddingX: "10px",
                      paddingY: "4px",
                      fontSize: "15px",
                    }}
                  >
                    Student Management
                  </Typography>
                  <Typography
                    sx={{
                      bgcolor: "rgba(61, 59, 59, 0.9)",
                      border: "1px solid rgba(115, 114, 114, 0.9)",
                      borderRadius: "20px",
                      paddingX: "10px",
                      paddingY: "4px",
                      fontSize: "15px",
                    }}
                  >
                    Review Analysis Results
                  </Typography>
                </Box>
                <Box
                  className="permissions_details_lower"
                  sx={{ display: "flex", gap: "9px" }}
                >
                  <Typography
                    sx={{
                      bgcolor: "rgba(61, 59, 59, 0.9)",
                      border: "1px solid rgba(115, 114, 114, 0.9)",
                      borderRadius: "20px",
                      paddingX: "10px",
                      paddingY: "4px",
                      fontSize: "15px",
                    }}
                  >
                    Monitor Reports
                  </Typography>
                  <Typography
                    sx={{
                      bgcolor: "rgba(61, 59, 59, 0.9)",
                      border: "1px solid rgba(115, 114, 114, 0.9)",
                      borderRadius: "20px",
                      paddingX: "10px",
                      paddingY: "4px",
                      fontSize: "15px",
                      width: "fit-content",
                    }}
                  >
                    manage feedback
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            className="student"
            sx={{
              bgcolor: "var(--navy-color)",
              padding: "30px",
              borderRadius: "25px",
            }}
          >
            <Box className="header" sx={{ display: "flex", gap: "12px" }}>
              <Typography
                component={"span"}
                className="icon"
                sx={{
                  bgcolor: "#d7a00a",
                  padding: "13px",
                  borderRadius: "14px",
                }}
              >
                <PiStudentFill size={35} />
              </Typography>
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
                className="permissions_details flex_column"
                sx={{ gap: "9px" }}
              >
                <Box
                  className="permissions_details_upper"
                  sx={{ display: "flex", gap: "9px" }}
                >
                  <Typography
                    sx={{
                      bgcolor: "rgba(61, 59, 59, 0.9)",
                      border: "1px solid rgba(115, 114, 114, 0.9)",
                      borderRadius: "20px",
                      paddingX: "10px",
                      paddingY: "4px",
                      fontSize: "15px",
                    }}
                  >
                    Upload Medical Images
                  </Typography>
                  <Typography
                    sx={{
                      bgcolor: "rgba(61, 59, 59, 0.9)",
                      border: "1px solid rgba(115, 114, 114, 0.9)",
                      borderRadius: "20px",
                      paddingX: "10px",
                      paddingY: "4px",
                      fontSize: "15px",
                    }}
                  >
                    View AI Analysis Results
                  </Typography>
                </Box>
                <Box
                  className="permissions_details_lower"
                  sx={{ display: "flex", gap: "9px" }}
                >
                  <Typography
                    sx={{
                      bgcolor: "rgba(61, 59, 59, 0.9)",
                      border: "1px solid rgba(115, 114, 114, 0.9)",
                      borderRadius: "20px",
                      paddingX: "10px",
                      paddingY: "4px",
                      fontSize: "15px",
                    }}
                  >
                    View Analysis History
                  </Typography>
                  <Typography
                    sx={{
                      bgcolor: "rgba(61, 59, 59, 0.9)",
                      border: "1px solid rgba(115, 114, 114, 0.9)",
                      borderRadius: "20px",
                      paddingX: "10px",
                      paddingY: "4px",
                      fontSize: "15px",
                    }}
                  >
                    Upload Medical Reports
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    bgcolor: "rgba(61, 59, 59, 0.9)",
                    border: "1px solid rgba(115, 114, 114, 0.9)",
                    borderRadius: "20px",
                    paddingX: "10px",
                    paddingY: "4px",
                    fontSize: "15px",
                    width: "fit-content",
                  }}
                >
                  Explore 3D Brain Models for Learning
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            className="pie_chart"
            sx={{
              bgcolor: "var(--navy-color)",
              padding: "",
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

      <NestedModal
      open={open} // حالة فتح المودال
        handleClose={handleClose} // فنكشن الاغلاق
      />


        <Button className="logout upper_case" sx={{bgcolor:'var(--secondary-color)',color:'#fff'}}>Logout</Button>
    </Box>
  );
}

export default AdminDashboard;