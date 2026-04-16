import { Box, Container, Grid, Typography, Link } from '@mui/material'
import { LineChart } from "@mui/x-charts/LineChart";
import FlipClock from '../../../components/flipClock/FlipClock';
import useGetUserById from '../../../hooks/getUsersHooks/useGetUserById';
import { Link as RouterLink } from "react-router-dom";
import RegisterForm from '../../../components/registerForm/RegisterForm'
import useUpdateUserInfo from '../../../hooks/userManagementHooks/useUpdateUserInfo';
import { UpdateUserInfoSchema } from '../../../validations/UpdateUserInfoSchema';
import useAuthStore from '../../../store/useAuthStore';
import studentImg from './../../../assets/images/profile/studentImg.webp'
import useGetAllMyCases from '../../../hooks/studentHooks/useGetAllMyCases';
import { FiFileText , FiUsers } from "react-icons/fi";
import useGetStudentPdf from '../../../hooks/studentHooks/useGetStudentPdf';
import { useEffect, useState } from 'react';
import useGetSummary from '../../../hooks/studentHooks/useGetSummary';
import Loader from '../../../components/uiVerseComponents/loader/Loader';


function StudentProfile() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;

  const { isError, isLoading, error, data } = useGetUserById();
  const { isError: isAllMyCasesError, isLoading: isAllMyCasesLoading, error: allMyCasesError, data: allMyCasesData } = useGetAllMyCases();
  const { isError: isSummaryError, isLoading: isSummaryLoading, error: summaryError, data: summaryData } = useGetSummary();

  const [selectedId, setSelectedId] = useState(null); // حتى ابعت اي دي كل تقرير لهوك البي دي اف
  const { refetch, isFetching } = useGetStudentPdf(selectedId);
  console.log(allMyCasesData);

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

  const recentSubmitted = allMyCasesData?.items
    ?.filter((report) => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // تاريخ قبل أسبوع
      return new Date(report.reportSubmittedAt) >= oneWeekAgo;
    })
    .sort(
      (a, b) => new Date(b.reportSubmittedAt) - new Date(a.reportSubmittedAt),
    );

  useEffect(() => {
    //اول ما السيت سيليكتيد اي دي يتغير بتشتغل اليوز فيتش
    if (!selectedId) return;

    const loadPdf = async () => {
      const result = await refetch(); //عملنا ريكويست جديد

      if (result.isError) {
        toast.error("Failed to load PDF");
        return;
      }

      if (result.data) {
        const url = window.URL.createObjectURL(result.data);
        window.open(url, "_blank");
      }

      setSelectedId(null);
    };

    loadPdf();
  }, [selectedId]);

  // للبار تشارت
  const reportsPerDay =
    allMyCasesData?.items?.reduce((acc, report) => {
      const date = new Date(report.reportSubmittedAt).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
        },
      );

      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {}) || {};
  const chartData = Object.entries(reportsPerDay).map(([date, count]) => ({
    date,
    count,
  }));

  if (isLoading || isAllMyCasesLoading || isSummaryLoading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader></Loader>
      </Box>
    );
  }
  if (isError || isAllMyCasesError || isSummaryError) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontWeight: "600",
            fontSize: { xs: "14px", md: "20px" },
          }}
        >
          {error?.message || allMyCasesError?.message || summaryError?.message}
        </Typography>
      </Box>
    );
  }
  return (
    <Box component={"section"} className="profile" sx={{ paddingTop: "50px" }}>
      <Container maxWidth="lg">
        <Box
          className="user_info"
          sx={{
            color: "#fff",
            bgcolor: "var(--navy-color)",
            borderRadius: "20px",
            paddingY: "30px",
            paddingX: "10px",
            boxShadow: "0 0 10px 0 rgb(249, 10, 10)",
          }}
        >
          <Grid container spacing={5} sx={{ flexGrow: 1 }}>
            <Grid
              item
              size={{ xs: 12, md: 3 }}
              sx={{ "@media (max-width:900px)": { display: "none" } }}
            >
              <Box
                className="image"
                sx={{
                  width: "300px",
                  position: "relative",
                  filter: "drop-shadow(0 0 15px rgba(255,0,0,0.6))",
                }}
              >
                <Box
                  component="img"
                  src={studentImg}
                  sx={{
                    width: "160px",
                    position: "absolute",
                    top: "-85px",
                    left: "50px",
                    "@media (max-width:1124px)": { top: "-24px" },
                    "@media (max-width:1000px)": { left: "30px" },
                  }}
                />
              </Box>
            </Grid>

            <Grid
              item
              size={{ xs: 12, md: 6 }}
              sx={{
                "@media (max-width:900px)": {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  width: "100%",
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "var(--secondary-font)",
                  marginBottom: "14px",
                }}
              >
                Hello, {user?.fullName}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "32px",
                  "@media (max-width:560px)": { justifyContent: "center" },
                }}
              >
                <Box>
                  <Typography
                    component={"span"}
                    sx={{ color: "var(--secondary-color)" }}
                  >
                    User Name
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "var(--secondary-font)",
                      fontSize: "20px",
                    }}
                  >
                    {user?.userName}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    component={"span"}
                    sx={{ color: "var(--secondary-color)" }}
                  >
                    Supervisor
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "var(--secondary-font)",
                      fontSize: "20px",
                    }}
                  >
                    {data?.supervisorName}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    component={"span"}
                    sx={{ color: "var(--secondary-color)" }}
                  >
                    Phone Number
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "var(--secondary-font)",
                      fontSize: "20px",
                    }}
                  >
                    {user?.phoneNumber}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    component={"span"}
                    sx={{ color: "var(--secondary-color)" }}
                  >
                    Account Status
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "var(--secondary-font)",
                      fontSize: "20px",
                    }}
                  >
                    {data?.isBlocked ? "Inactive" : "Active"}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              size={{ xs: 12, md: 3 }}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                "@media (max-width:900px)": {
                  width: "100%",
                },
              }}
            >
              <FlipClock />
            </Grid>
          </Grid>
        </Box>
        <Box className="chart_and_summary">
          <Grid container spacing={2}>
            <Grid item size={{ md: 8 }}>
              <Box
                className="line_chart"
                sx={{
                  bgcolor: "var(--navy-color)",
                  borderRadius: "12px",
                  marginTop: "23px",
                  paddingRight: "15px",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: { xs: "15px", sm: "17px" },
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
            </Grid>
            <Grid item size={{ md: 4 }}>
              <Box className="summary" sx={{ marginTop: "23px" }}>
                <Grid container spacing={1}>
                  <Grid item size={{ xs: 12 }}>
                    <Box
                      className="reports_submitted"
                      sx={{
                        bgcolor: "var(--navy-color)",
                        height: "100%",
                        borderRadius: "12px",
                        display: "flex",
                        justifyContent: "space-around",
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
                          Total Cases
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
                          {summaryData?.reportsSubmitted}
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
                        <FiUsers size={28} color="#fff" />
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item size={{ xs: 12 }}>
                    <Box
                      className="feedback_received"
                      sx={{
                        bgcolor: "var(--navy-color)",
                        height: "100%",
                        borderRadius: "12px",
                        display: "flex",
                        justifyContent: "space-around",
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
                          Feedbacks
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
                          {summaryData?.feedbackReceived}
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
                        <FiFileText size={28} color="#fff" />
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="form_and_recent" sx={{ paddingY: "40px" }}>
          <Grid container spacing={3}>
            <Grid item size={{ md: 8 }}>
              <Box
                className="edit_user_info_form flex_column"
                sx={{
                  borderTopRightRadius: "40px",
                  borderBottomRightRadius: "40px",
                  gap: "40px",
                  padding: "60px",
                  bgcolor: "var(--navy-color)",
                }}
              >
                {console.log("sup id :", data?.supervisorId)}
                <RegisterForm
                  useHook={useUpdateUserInfo}
                  userId={userId}
                  schema={UpdateUserInfoSchema}
                  showPassword={false}
                  showSupervisors={false}
                  btnLabel="Update Profile"
                  fullWidthInput={true}
                  textfieldColor={"textfield_black"}
                  defaultValues={{
                    fullName: user?.fullName,
                    userName: user?.userName,
                    email: user?.email,
                    phoneNumber: user?.phoneNumber,
                    supervisorUserId: data?.supervisorId,
                  }}
                />
                <Link
                  component={RouterLink}
                  to={"/auth/security-verification"}
                  sx={{
                    color: "var(--primary-color)",
                    fontFamily: "sans-serif",
                    fontSize: "15px",
                    fontWeight: "600",
                    width: "fit-content",
                  }}
                  className="auth_link"
                >
                  Reset Password?
                </Link>
              </Box>
            </Grid>

            <Grid item size={{ md: 4 }}>
              <Box
                className="recently_submitted"
                sx={{
                  bgcolor: "var(--navy-color)",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  paddingX: "14px",
                  paddingTop: "20px",
                  position: "relative",
                  height: "91%",
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
                    fontSize: { xs: "15px", sm: "17px" },
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
                  {recentSubmitted?.length} new notifications
                </Typography>
                {recentSubmitted?.length === 0 ? (
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "var(--primary-color)",
                      textAlign: "center",
                      margin: "auto",
                      marginTop: "140px",
                      bgcolor: "#291A1F",
                      width: "fit-content",
                      padding: "10px",
                      borderRadius: "16px",
                    }}
                  >
                    No recent submissions
                  </Typography>
                ) : (
                  recentSubmitted?.map((report) => (
                    <Box
                      onClick={() => {
                        if (isFetching) return;
                        setSelectedId(report.reportId);
                      }}
                      key={report.reportId}
                      sx={{
                        marginBottom: "10px",
                        padding: "5px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        cursor: "pointer",
                        bgcolor: "#6b6a6a3f",
                      }}
                    >
                      <Typography
                        sx={{
                          bgcolor: "#291A1F",
                          borderRadius: "12px",
                          padding: "8px",
                          display: "flex",
                          width: "fit-content",
                        }}
                      >
                        <FiFileText color="var(--primary-color)" />
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
                            {report.reportCode}{" "}
                          </Typography>
                          was recently submitted
                        </Typography>
                        <Typography
                          sx={{
                            color: "var(--secondary-color)",
                            fontSize: "10px",
                          }}
                        >
                          {" "}
                          {timeAgo(report.reportSubmittedAt)}{" "}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default StudentProfile