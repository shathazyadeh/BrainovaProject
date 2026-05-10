import { Box, Container, Grid } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import { Button, Typography } from "@mui/material";
import { TfiEmail } from "react-icons/tfi";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import useGetMyStudentsInfo from "../../../hooks/supervisorHooks/useGetMyStudentsInfo";
import UsersSearch from "../../../components/filterSearch/usersSearch/UsersSearch";
import Loader from "../../../components/uiVerseComponents/loader/Loader";
import DashboardNavbar from "../../../components/muiComponents/dashboardNavbar/DashboardNavbar";
import DashboardFooter from "../../../components/dashboardFooter/DashboardFooter";
function SupervisorStudents() {
  const { isError, error, isLoading, data } = useGetMyStudentsInfo();
  console.log("students info:", data);
  const [search, setSearch] = useState("");

  return (
    <Box
      sx={{
        bgcolor: "var(--navy-color)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position:"relative"
      }}
    >
      {" "}
      {/*لون الخلفية للصفحة كلهاا */}
      <DashboardNavbar />
      <Box
        component={"section"}
        sx={{
          paddingBottom:'20px',
          flexGrow: 1,
          alignItems: "flex-start",
          display: "block",
          minHeight: "100vh",
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
                  marginTop:"290px",
                  color: "white",
                  fontWeight: "700",
                  textAlign: "center",
                  "@media (max-width:456px)": {
                    fontSize: "20px",
                  },
                }}
              >
                {error?.message}
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
              <Box sx={{marginTop:"290px"}}>
              <Loader />
              </Box>
            </Box>
          )}
          <Box className="section_titel">
            <Typography
              component={"h1"}
              variant="h4"
              sx={{
                color: "#fff",
                fontFamily: "var(--primary-font)",
                fontWeight: "600",
                display: "inline-block",
                marginRight: "10px",
                paddingTop:{xs:"30px",md:"0px"},
                "@media (max-width:700px)": {
                  fontSize: "22px",
                },
              }}
            >
              Students
            </Typography>
            <Typography
              component={"span"}
              sx={{
                color: "#fff",
                fontFamily: "var(--primary-font)",
                fontSize: "20px",
                "@media (max-width:700px)": {
                  fontSize: "15px",
                },
              }}
            >
              <Typography
                component={"span"}
                sx={{
                  color: "var(--primary-color)",
                  fontFamily: "var(--primary-font)",
                }}
              >
                {data?.length}
              </Typography>{" "}
              enrolled students
            </Typography>
          </Box>
          <Box className="search" sx={{ paddingTop: "23px" }}>
            <UsersSearch search={search} setSearch={setSearch} />
          </Box>
          <Grid container spacing={2}>
            {data
              ?.filter(
                (
                  student, //لفتلترة الداتا حسب السيرش
                ) =>
                  student.fullName
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                  student.userName
                    ?.toLowerCase()
                    .includes(search.toLowerCase()),
              )
              .map((student) => (
                <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={student.studentId}>
                  <Box
                    className="student_info"
                    sx={{
                      bgcolor: "#5655554c",
                      padding: "25px",
                      borderRadius: "10px",
                      height: "250px",
                      border: "1px solid #5f5c5c",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        border: "1px solid  #e204049f",
                        transform: "scale(1.03)",
                      },
                      "&:hover .MuiAvatar-root": {
                        boxShadow: "0 0 15px rgba(207, 25, 25, 0.81)",
                      },
                    }}
                  >
                    <Box
                      className="avatar"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Avatar sx={{ bgcolor: "#e20404" }}>
                        {student.userName?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography sx={{ color: "#fff" , wordBreak: "break-all",}}>
                        {student.fullName}
                      </Typography>
                    </Box>

                    <Box
                      className="email"
                      component={"span"}
                      sx={{
                        paddingY: "17px",
                        display: "flex",
                        gap: "7px",
                        borderBottom: "1px solid #5f5c5c76",
                      }}
                    >
                      <TfiEmail color="#aaa" />
                      <Typography
                        sx={{
                          color: "#aaa",
                          fontSize: "12px",
                          overflowWrap: "break-word",
                          wordBreak: "break-all",
                        }}
                      >
                        {student.email}
                      </Typography>
                    </Box>
                    <Box
                      className="flex_column"
                      sx={{ color: "#aaa", marginTop: "10px" }}
                    >
                      Reports
                      <Typography sx={{ color: "#fff", fontWeight: "600" }}>
                        {student?.reportsCount}
                      </Typography>
                    </Box>
                    <Button
                      component={RouterLink}
                    to={`/dashboard/supervisor/student-reports/${student.studentId}`}
                      sx={{
                        borderRadius: "15px",
                        bgcolor: "#6f6e6e3b",
                        color: "#ffffff",
                        paddingX: "30px",
                        textAlign: "center",
                        width: "100%",
                        marginTop: "10px",
                        fontSize: "12px",
                        textTransform: "none",
                        "&:hover": {
                          bgcolor: " #ff00009f",
                          boxShadow: "0 0 15px rgba(207, 25, 25, 0.51)",
                        },
                      }}
                    >
                      View Reports
                    </Button>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Container>
      </Box>
      
          
      <DashboardFooter/>
    </Box>
  );
}

export default SupervisorStudents;