import { Box, Container, Grid, Typography } from '@mui/material'
import DashboardNavbar from '../../../components/muiComponents/dashboardNavbar/DashboardNavbar'
import SupervisorTable from "../../../components/muiComponents/supervisorTable/SupervisorTable";
import useGetAllOfMyStudnetsCases from '../../../hooks/supervisorHooks/useGetAllOfMyStudnetsCases';
import useGetNewReports from '../../../hooks/supervisorHooks/useGetNewReports';
import useGetDashboardSummary from '../../../hooks/supervisorHooks/useGetDashboardSummary';
import Loader from '../../../components/uiVerseComponents/loader/Loader';
import { FiFileText, FiFilePlus, FiMessageSquare, FiUsers } from "react-icons/fi";

function SupervisorDashboard() {
  const { isError, error, isLoading, data } = useGetAllOfMyStudnetsCases();
  const { isError: isNewReportsError, error: newReportsError, isLoading: isNewReportsLoading, data: newReportsData } = useGetNewReports();
  const { isError: isDashboardSummaryError, error: newDashboardSummaryError, isLoading: isDashboardSummaryLoading, data: dashboardSummaryData } = useGetDashboardSummary();

console.log("newReportsData ", newReportsData);
console.log("data ", data);
console.log("dashboardSummaryData ", dashboardSummaryData);

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
  });

  const thisWeekCount = newReportsData?.items?.filter(report => {
  const now = new Date();
  const reportDate = new Date(report.submittedAt);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);

  return reportDate >= oneWeekAgo;
}).length;


  return (
    <Box
      sx={{
        bgcolor: "var(--navy-color)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
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
          {isError && (
            <Box
              component={"section"}
              className="server_error_section flex_column"
              sx={{
                bgcolor: "var(--navy-color)",
                position: "absolute",
                inset: 0,
                top: "90px",
                left: "200px",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
                "@media (max-width:899px)": {
                  left: "0px",
                },
              }}
            >
              <Typography
                component={"h1"}
                variant="h5"
                sx={{
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
                left: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
                "@media (max-width:899px)": {
                  left: "0px",
                },
              }}
            >
              <Loader />
            </Box>
          )}

          <Grid container spacing={3}>
            <Grid item size={{ md: 8 }}>
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
              <Box
                className="dashboard_summary"
                sx={{ display: "flex", gap: "10px", marginBottom: "23px" }}
              >
                <Box
                  className="total_students"
                  sx={{
                    bgcolor: "#232121b8",
                    borderRadius: "12px",
                    display: "flex",
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
                <Box
                  className="total_reports"
                  sx={{
                    bgcolor: "#232121b8",
                    borderRadius: "12px",
                    display: "flex",
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
                <Box
                  className="new_reports"
                  sx={{
                    bgcolor: "#232121b8",
                    borderRadius: "12px",
                    display: "flex",
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
                <Box
                  className="feedback_given"
                  sx={{
                    bgcolor: "#232121b8",
                    borderRadius: "12px",
                    display: "flex",
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
              </Box>
              <SupervisorTable
                rows={data?.items}
                count={data?.items.length}
                showActions={false}
              />
            </Grid>
            <Grid item size={{ md: 4 }}>
              <Box
                className="recently_submitted"
                sx={{
                  bgcolor: "#232121b8",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  paddingX: "14px",
                  paddingY: "20px",
                  position: "relative",
                  marginBottom: "23px",
                  marginTop: "90px",
                  maxHeight: "350px",
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
                    fontSize: "17px",
                    marginBottom: "10px",
                  }}
                >
                  Recently Submitted
                </Typography>
                {isNewReportsLoading && <Loader />}

                {isNewReportsError && (
                  <Typography sx={{ color: "red" }}>
                    {newReportsError?.message}
                  </Typography>
                )}
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
                {newReportsData?.items?.map((report) => (
                  <Box
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
                ))}
              </Box>
              <Box
                className="recently_reviewed"
                sx={{
                  bgcolor: "#232121b8",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  paddingX: "14px",
                  paddingY: "20px",
                  position: "relative",
                  marginBottom: "23px",
                  maxHeight: "367px",
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
                    fontSize: "17px",
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
                {recentFeedbacks?.map((report) => (
                  <Box
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
                          wordBreak: "break-all",
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
                ))}
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
    </Box>
  );
}

export default SupervisorDashboard