import { Box, Container, Grid, Typography, Link } from '@mui/material'
import DashboardNavbar from '../../../components/muiComponents/dashboardNavbar/DashboardNavbar'
import SupervisorTable from "../../../components/muiComponents/supervisorTable/SupervisorTable";
import useGetAllOfMyStudnetsCases from '../../../hooks/supervisorHooks/useGetAllOfMyStudnetsCases';
import useGetNewReports from '../../../hooks/supervisorHooks/useGetNewReports';
import useGetDashboardSummary from '../../../hooks/supervisorHooks/useGetDashboardSummary';
import Loader from '../../../components/uiVerseComponents/loader/Loader';
import { FiFileText, FiFilePlus, FiMessageSquare, FiUsers } from "react-icons/fi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { LineChart } from "@mui/x-charts/LineChart";
import { Link as RouterLink } from "react-router-dom";
import { useMediaQuery } from "@mui/material";



function SupervisorDashboard() {
  const { isError, error, isLoading, data } = useGetAllOfMyStudnetsCases();
  const { isError: isNewReportsError, error: newReportsError, isLoading: isNewReportsLoading, data: newReportsData } = useGetNewReports();
  const { isError: isDashboardSummaryError, error: newDashboardSummaryError, isLoading: isDashboardSummaryLoading, data: dashboardSummaryData } = useGetDashboardSummary();

console.log("newReportsData ", newReportsData);
console.log("data ", data);
console.log("dashboardSummaryData ", dashboardSummaryData);

  const isCustomScreen = useMediaQuery("(max-width:1281px)");
  const isPageLoading = isLoading || isNewReportsLoading || isDashboardSummaryLoading;
  const pageError = error || newReportsError || newDashboardSummaryError;

  function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);

  if (diffInSeconds < 60) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
}

const recentFeedbacks = data?.items?.filter(item => item.feedbackId) // صار عنا بس اللي فيها فيدباك
  .filter(item => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // تاريخ قبل أسبوع
    return new Date(item.feedbackSubmittedAt) >= oneWeekAgo;
  }).sort((a, b) => 
    new Date(b.feedbackSubmittedAt) - new Date(a.feedbackSubmittedAt));

  const thisWeekCount = newReportsData?.items?.filter(report => {
  const now = new Date();
  const reportDate = new Date(report.submittedAt);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);

  return reportDate >= oneWeekAgo;
}).length;

// للبار تشارت
const reportsPerDay = data?.items?.reduce((acc, report) => {
  const date = new Date(report.reportSubmittedAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  acc[date] = (acc[date] || 0) + 1;
  return acc;
}, {}) || {};
const chartData = Object.entries(reportsPerDay).map(([date, count]) => ({
  date,
  count,
}));

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
      <DashboardNavbar />

      <Box
        component={"section"}
        sx={{
          paddingBottom: "50px",
          flexGrow: 1,
          alignItems: "flex-start",
          display: "block",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="lg">
          {/* server errors */}
          {pageError && (
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
                {pageError?.message || "Something went wrong"}
              </Typography>
            </Box>
          )}
          {isPageLoading && (
            <Box
              sx={{
                bgcolor: "var(--navy-color)",
                position: "absolute",
                inset: 0,
                bottom:"0px",
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

          <Grid container columnSpacing={3}>
            <Grid item size={isCustomScreen ? 12 : {  md: 8 }} sx={{paddingTop:{xs:"30px",md:"0px"}}}>
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
                  Dashboard Overview
                </Typography>
                <Typography sx={{ color: "var(--secondary-color)" }}>
                  Here's your activity summary.
                </Typography>
              </Box>
              <Box className="dashboard_summary"
                sx={{ display: "flex", gap: "10px", marginBottom: "23px" }}
              >
                <Grid container spacing={1} sx={{width:"100%"}}>
                  <Grid item size={{xs:6,sm:3}}>
                    <Box
                  className="total_students"
                  sx={{
                    bgcolor: "#232121b8",
                    height:"100%",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent:"space-around",
                    alignItems: "center",
                    gap: "15px",
                    paddingX: "15px",
                    paddingTop: "18px",
                    paddingBottom: "27px",
                  }}
                >
                  <Box className="details flex_column" sx={{ gap: "10px" }}>
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        textTransform: "uppercase",
                        fontSize: "13px",
                        fontFamily: "var(--primary-font)",
                        "@media (max-width:700px)": {
                         fontSize: "11px",
                        },
                      }}
                    >
                      Total Students
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
                      {dashboardSummaryData?.totalStudents}
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
                    <FiUsers size={20} color="#fff" />
                  </Typography>
                </Box>
                  </Grid>
                  <Grid item size={{xs:6,sm:3}}>
                    <Box
                  className="total_reports"
                  sx={{
                    bgcolor: "#232121b8",
                    height:"100%",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent:"space-around",
                    alignItems: "center",
                    gap: "15px",
                    paddingX: "15px",
                    paddingTop: "18px",
                    paddingBottom: "27px",
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
                        fontSize: "13px",
                        fontFamily: "var(--primary-font)",
                        "@media (max-width:700px)": {
                         fontSize: "11px",
                        },
                      }}
                    >
                      Total Reports
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
                      {dashboardSummaryData?.totalReports}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#00ff88",
                        fontSize: "10px",
                        position: "absolute",
                        bottom: "-20px",
                        whiteSpace: "nowrap"
                      }}
                    >
                      +{thisWeekCount} this week
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
                    <FiFileText size={20} color="#fff" />
                  </Typography>
                </Box>
                  </Grid>
                  <Grid item size={{xs:6,sm:3}}>
                    <Box
                  className="new_reports"
                  sx={{
                    bgcolor: "#232121b8",
                    height:"100%",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent:"space-around",
                    alignItems: "center",
                    gap: "15px",
                    paddingX: "15px",
                    paddingTop: "18px",
                    paddingBottom: "27px",
                  }}
                >
                  <Box className="details flex_column" sx={{ gap: "10px" }}>
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        textTransform: "uppercase",
                        fontSize: "13px",
                        fontFamily: "var(--primary-font)",
                        "@media (max-width:700px)": {
                         fontSize: "11px",
                        },
                      }}
                    >
                      New Reports
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
                      {dashboardSummaryData?.newReports}
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
                    <FiFilePlus size={20} color="#fff" />
                  </Typography>
                </Box>
                  </Grid>
                  <Grid item size={{xs:6,sm:3}}>
                    <Box
                  className="feedback_given"
                  sx={{
                    bgcolor: "#232121b8",
                    height:"100%",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent:"space-around",
                    alignItems: "center",
                    gap: "15px",
                    paddingX: "15px",
                    paddingTop: "18px",
                    paddingBottom: "27px",
                  }}
                >
                  <Box className="details flex_column" sx={{ gap: "10px" }}>
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        textTransform: "uppercase",
                        fontSize: "13px",
                        fontFamily: "var(--primary-font)",
                        "@media (max-width:700px)": {
                         fontSize: "11px",
                        },
                      }}
                    >
                      Feedback Given
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
                      {dashboardSummaryData?.feedbackGiven}
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
                    <FiMessageSquare size={20} color="#fff" />
                  </Typography>
                </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box className="line_chart"
                sx={{
                  bgcolor: "#232121b8",
                  borderRadius: "12px",
                  marginY: "23px",
                  paddingRight: "15px",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: {xs:"15px",sm:"17px"},
                    fontFamily: "var(--primary-font)",
                    paddingLeft: "30px",
                    paddingTop: "10px",
                  }}
                >
                  Reports per Day
                </Typography>

                <LineChart
                  dataset={chartData}
                  xAxis={[{ scaleType: "point", dataKey: "date" }]}
                  series={[
                    {
                      dataKey: "count",
                      label: "Reports",
                      color: "var(--primary-color)",
                      curve: "monotoneX",
                    },
                  ]}
                  height={154}
                  margin={{ left: 0 }}
                  sx={{
                    "& .MuiChartsAxis-tickLabel tspan": {
                      fill: "#fff !important",
                      stroke: "none !important",
                    },
                    "& .MuiChartsAxis-line": { stroke: "#fff !important" },
                    "& .MuiChartsAxis-tick": { stroke: "#fff !important" },
                    "& .MuiChartsLegend-label": {
                      color: "#fff !important",
                      fontFamily: "var(--primary-font) !important",
                      fontWeight: "600 !important",
                    },
                    "& .MuiChartsAxisHighlight-root line": {
                      stroke: "#ff0000 !important",
                    },
                    "& .MuiChartsAxisHighlight-root": {
                      stroke: "#fff !important",
                    },
                  }}
                  slotProps={{
                    legend: {
                      position: {
                        vertical: "top",
                        horizontal: "end",
                      },
                    },
                  }}
                />
              </Box>
              <SupervisorTable
                rows={data?.items?.slice(0, 5)} //  أول 5 صفوف
                count={5} // عدد الصفوف
                showActions={false}
                hidePagination={true}
              />
              <Box className="link" sx={{display:"flex", justifyContent:"flex-end",paddingY:"10px",paddingRight:"10px","@media (max-width:768px)": {
              paddingTop: "0px",
            }}}>
              <Link
                component={RouterLink}
                to={"/dashboard/supervisor/students-reports"}
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
            </Grid>
            <Grid item size={isCustomScreen ? 12 : { md: 4 }}>
              <Box
                className="recently_submitted"
                sx={{
                  bgcolor: "#232121b8",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  paddingX: "14px",
                  paddingTop: "20px",
                  position: "relative",
                  marginBottom: "23px",
                  marginTop: isCustomScreen ? "0px" :"90px",
                  height: "364px",
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    bgcolor: "var(--primary-color)",
                    cursor: "grab",
                  },
                  "&::-webkit-scrollbar-track": {
                    bgcolor: "#2a2a3d",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "var(--primary-font)",
                    fontWeight: "600",
                    color: "#fff",
                    fontSize: {xs:"15px",sm:"17px"},
                    marginBottom: "10px",
                  }}
                >
                  Recently Submitted
                </Typography>                
                <Typography
                  className="no_of_notifications"
                  sx={{
                    color: "var(--secondary-color)",
                    fontWeight: "500",
                    fontSize: "10px",
                    position: "absolute",
                    top: "25px",
                    right: "14px",
                  }}
                >
                  {newReportsData?.totalCount} new notifications
                </Typography>
                {newReportsData?.items?.length === 0 ? (
  <Typography
    sx={{
      fontSize: "13px",
      color:"var(--primary-color)",
      textAlign: "center",
      margin:"auto",
      marginTop: "140px",
      bgcolor: "#291A1F",
      width : "fit-content",
      padding:"10px",
      borderRadius:"16px"
    }}
  >
    No recent submissions
  </Typography>
) : (
  newReportsData?.items?.map((report) => (
    <Box component={RouterLink} to={`/dashboard/supervisor/report-details/${report.reportId}`}
                    key={report.reportId}
                    sx={{
                      marginBottom: "10px",
                      padding: "5px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Typography
                      sx={{
                        bgcolor: "#291A1F",
                        borderRadius: "12px",
                        padding: "8px",
                        display: "flex",
                      }}
                    >
                      <FiFileText color="var(--primary-color)" />
                    </Typography>

                    <Box>
                      <Typography
                        sx={{
                          color: "#fff",
                          fontFamily: "var(--primary-font)",
                          fontWeight: "600",
                          fontSize: "13px",
                          wordBreak: "break-all",
                        }}
                      >
                        {report.studentName}{" "}
                        <Typography
                          component={"span"}
                          sx={{
                            color: "var(--secondary-color)",
                            fontWeight: "400",
                            fontSize: "13px",
                          }}
                        >
                          submitted a new report
                        </Typography>
                      </Typography>

                      <Typography
                        sx={{
                          color: "var(--secondary-color)",
                          fontSize: "12px",
                        }}
                      >
                        {timeAgo(report.submittedAt)}
                      </Typography>
                    </Box>
                  </Box>
  ))
)}
              </Box>
              <Box
                className="recently_reviewed"
                sx={{
                  bgcolor: "#232121b8",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  paddingX: "14px",
                  paddingTop: "20px",
                  position: "relative",
                  height: "368px",
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    bgcolor: "#1E86EE",
                    cursor: "grab",
                  },
                  "&::-webkit-scrollbar-track": {
                    bgcolor: "#2a2a3d",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "var(--primary-font)",
                    fontWeight: "600",
                    color: "#fff",
                    fontSize: {xs:"15px",sm:"17px"},
                    marginBottom: "10px",
                  }}
                >
                  Recently Reviewed
                </Typography>
                <Typography
                  className="no_of_notifications"
                  sx={{
                    color: "var(--secondary-color)",
                    fontWeight: "500",
                    fontSize: "10px",
                    position: "absolute",
                    top: "25px",
                    right: "14px",
                  }}
                >
                  {recentFeedbacks?.length} new notifications
                </Typography>
                {recentFeedbacks?.length === 0 ? (
  <Typography
    sx={{
      fontSize: "13px",
      color:"#1E86EE",
      textAlign: "center",
      margin:"auto",
      marginTop: "140px",
      bgcolor: "#162435",
      width : "fit-content",
      padding:"10px",
      borderRadius:"16px"
    }}
  >
    No recent feedback
  </Typography>
) : (
  recentFeedbacks?.map((report) => (
    <Box component={RouterLink} to={`/dashboard/supervisor/report-details/${report.reportId}`}
                    key={report.reportId}
                    sx={{
                      marginBottom: "10px",
                      padding: "5px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Typography
                      sx={{
                        bgcolor: "#162435",
                        borderRadius: "12px",
                        padding: "8px",
                        display: "flex",
                        width: "fit-content",
                      }}
                    >
                      <FiMessageSquare color="#1E86EE" />
                    </Typography>

                    <Box>
                      <Typography
                        component={"span"}
                        sx={{
                          color: "var(--secondary-color)",
                          fontWeight: "400",
                          fontSize: "13px",
                          wordBreak: "break-word",
                        }}
                      >
                        <Typography
                          component={"span"}
                          sx={{
                            color: "#fff",
                            fontFamily: "var(--primary-font)",
                            fontWeight: "600",
                            fontSize: "13px",
                          }}
                        >
                          {`REP-${report?.reportId.slice(0, 6)}`}{" "}
                        </Typography>
                        feedback was added to {report.studentName}
                      </Typography>
                      <Typography
                        component={"span"}
                        sx={{
                          color: "var(--secondary-color)",
                          fontSize: "12px",
                        }}
                      >
                        {" "}
                        {timeAgo(report.feedbackSubmittedAt)}{" "}
                      </Typography>
                    </Box>
                  </Box>
  ))
)}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/*footer */}
      <Box
        className="lower_footer"
        sx={{
          borderTop: "1px solid rgba(53, 53, 53, 0.93)",
          width: "fit-content",
          margin: "auto",
          paddingX: { xs: "0px", md: "200px" },
          textAlign: "center",
          marginTop: { xs: "1px", md: "0px" },
        }}
      >
        <Typography
          component={"p"}
          sx={{
            color: "var(--mid-gray-color)",
            paddingY: "30px",
            "@media (max-width:430px)": {
              fontSize: "12px",
            },
          }}
        >
          © 2026{" "}
          <Typography
            component={"span"}
            sx={{
              color: "var(--dark-red-color)",
              "@media (max-width:430px)": {
                fontSize: "12px",
              },
            }}
          >
            Brainova
          </Typography>
          . All rights reserved. | Built for medical education and research
          purposes.
        </Typography>
      </Box>
    </Box>
  );
}

export default SupervisorDashboard