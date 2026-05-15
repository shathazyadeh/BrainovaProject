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
import Pagination from '@mui/material/Pagination';
import { useEffect } from "react";
import { BsFillExclamationOctagonFill } from "react-icons/bs";
import DashboardErrorState from '../../../components/requestStates/error/dashboardErrorState/DashboardErrorState.jsx';
import DashboardLoadingState from "../../../components/requestStates/loading/dashboardLoadingState/DashboardLoadingState.jsx";

function SupervisorStudents() {
  const { isError, error, isLoading, data } = useGetMyStudentsInfo();

  const [search, setSearch] = useState("");

  const filteredData = data?.filter(
    (student) =>
      student.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      student.userName?.toLowerCase().includes(search.toLowerCase())
  );

  const [page, setPage] = useState(1);//رقم الصفحة الحالي بالبداية خليته 1
  useEffect(() => {
    setPage(1);
  }, [search]);
  const itemsPerPage = 9;//عدد العناصر اللي بدي تنعرض بكل صفحة كم ؟ 
  const paginatedData = filteredData?.slice( // قسمت البيانات حسب الصفحة الجديدة عشان اعرف ايش رح اعرض   array.slice(start, end)
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage); // عشان احسب عدد الصفحات الجديدة مثلا 20 عنصر /6=3.33 استعملت من مكتبة ماث سيل عشان اجبر اللي بعد الفاصلة العشرية وافتحلهن صفحة 

  if (isLoading) return <DashboardLoadingState />;
  if (isError) return <DashboardErrorState error={error} />;

  return (
    <Box
      sx={{
        bgcolor: "var(--navy-color)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",

      }}
    >
      {" "}
      {/*لون الخلفية للصفحة كلهاا */}
      <DashboardNavbar />
      <Box
        component={"section"}
        sx={{
          paddingBottom: '20px',
          flexGrow: 1,
          alignItems: "flex-start",
          display: "block",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="lg"  sx={{ display: "flex", flexDirection: "column", minHeight: "1020px" }}>
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
                paddingTop: { xs: "30px", md: "0px" },
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
                {filteredData?.length}
              </Typography>{" "}
              enrolled students
            </Typography>
          </Box>
          <Box className="search" sx={{ paddingTop: "23px" }}>
            <UsersSearch search={search} setSearch={setSearch} />
          </Box>
          {filteredData?.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",


              }}
            >
              <Box
                sx={{
                  marginTop: "200px",
                  textAlign: "center",
                  bgcolor: "#5959594e",
                  paddingY: "50px",
                  paddingX: { xs: "30px", sm: "90px" },
                  borderRadius: "15px",
                  boxShadow: "0 0 15px rgba(228, 1, 1, 0.22)",
                  fontFamily: "var(--primary-font)",
                  fontWeight: '500',
                  borderBottom: "5px solid var(--primary-color)"
                }}
              >
                <Box
                  component={BsFillExclamationOctagonFill}
                  sx={{
                    color: "red",
                    fontSize: "50px",
                    "@media (max-width:600px)": {
                      fontSize: "40px",
                    },
                  }}
                />

                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: { xs: "18px", sm: "22px", md: "28" },
                    fontWeight: "700",
                    marginBottom: "10px",
                    fontFamily: "var(--primary-font)",
                  }}
                >
                  No Results Found
                </Typography>

                <Typography
                  sx={{
                    color: "#7e8a9a",
                    fontSize: { xs: "12px", sm: "14px", lg: "16" },
                    lineHeight: 1.8,
                    fontFamily: "var(--primary-font)",
                  }}
                >
                  No students matching "{search}"
                </Typography>
              </Box>
            </Box>
          ) : (
             <Box sx={{ flex: 1 }}>
            <Grid container spacing={2} >
              {paginatedData?.map((student) => (
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
                      <Typography sx={{ color: "#fff", wordBreak: "break-all", }}>
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
            </Grid></Box>
          )}

          {filteredData?.length > 0 && (
            <Box
              className="pagination"
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
                padding: "20px",

              }}
            >
              <Pagination
                count={totalPages} // عدد الصفحات وهن الارقام اللي مبينات بالباجينيشن
                page={page} // الصفحة الحالية
                onChange={(event, value) => setPage(value)} //  تغيير الصفحة لما نكبس عالباجينيشن جيب رقمها وحطها بسيت البيج عشان نرجع نعيد الموضوع من الاول للصفحة الجديدة
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#fff",
                    borderRadius: "10px",
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#ff0000 !important",
                    color: "#fff",
                  },
                }}
              />
            </Box>

          )}
        </Container>
      </Box>


      <DashboardFooter />
    </Box>
  );
}

export default SupervisorStudents;