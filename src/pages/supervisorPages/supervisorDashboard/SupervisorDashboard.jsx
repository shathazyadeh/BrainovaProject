import { Box, Container, Grid, Typography } from '@mui/material'
import DashboardNavbar from '../../../components/muiComponents/dashboardNavbar/DashboardNavbar'
import SupervisorTable from "../../../components/muiComponents/supervisorTable/SupervisorTable";
import useGetAllOfMyStudnetsCases from '../../../hooks/supervisorHooks/useGetAllOfMyStudnetsCases';
import useGetNewReports from '../../../hooks/supervisorHooks/useGetNewReports';
import Loader from '../../../components/uiVerseComponents/loader/Loader';
import { FiFileText } from "react-icons/fi";
import { FiMessageSquare } from "react-icons/fi";


function SupervisorDashboard() {
  const { isError, error, isLoading, data } = useGetAllOfMyStudnetsCases();
  const { isError: isNewReportsError, error: newReportsError, isLoading: isNewReportsLoading, data: newReportsData } = useGetNewReports();
console.log("data : ",data);
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

// داخل SupervisorDashboard قبل ال-return
const recentFeedbacks = data?.items?.filter(item => item.feedbackId) // صار عنا بس اللي فيها فيدباك
  .filter(item => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // تاريخ قبل أسبوع
    return new Date(item.feedbackSubmittedAt) >= oneWeekAgo;
  });

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
                  borderTopLeftRadius: "12px",
                  borderBottomLeftRadius: "12px",
                  paddingX: "14px",
                  paddingY: "20px",
                  position: "relative",
                  marginBottom:"23px",
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
              
              <Box className="recently_reviewed"
                sx={{
                  bgcolor: "#232121b8",
                  borderTopLeftRadius: "12px",
                  borderBottomLeftRadius: "12px",
                  paddingX: "14px",
                  paddingY: "20px",
                  position: "relative",
                  marginBottom:"23px",
                  maxHeight: "360px",
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
                }}>
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
                  <Box key={report.reportId} 
                      sx={{
                      marginBottom: "10px",
                      padding: "5px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}>
                    <Typography
                      sx={{
                        bgcolor: "#162435",
                        borderRadius: "12px",
                        padding: "8px",
                        display: "flex",
                        width:"fit-content"
                      }}
                    >
                      <FiMessageSquare color="#1E86EE" />
                    </Typography>

                    <Box >
                      <Typography component={'span'} sx={{
                            color: "var(--secondary-color)",
                            fontWeight: "400",
                            fontSize: "13px",
                          }}>
                        <Typography component={'span'} sx={{
                          color: "#fff",
                          fontFamily: "var(--primary-font)",
                          fontWeight: "600",
                          fontSize: "13px",
                        }}>{`REP-${report?.reportId.slice(0, 6)}`}{" "}</Typography>
                        feedback was added to {report.studentName}
                    </Typography>
                    <Typography component={'span'} sx={{
                          color: "var(--secondary-color)",
                          fontSize: "12px",
                        }}>
                      {" "}{timeAgo(report.feedbackSubmittedAt)}{" "}
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
          ©️ 2026{" "}
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