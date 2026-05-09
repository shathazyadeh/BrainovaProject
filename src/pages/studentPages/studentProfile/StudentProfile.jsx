import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Button,
  useMediaQuery,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import FlipClock from "../../../components/flipClock/FlipClock";
import Loader from "../../../components/uiVerseComponents/loader/Loader";
import RegisterForm from "../../../components/registerForm/RegisterForm";
import useGetUserById from "../../../hooks/getUsersHooks/useGetUserById";
import useGetSummary from "../../../hooks/studentHooks/useGetSummary";
import useUpdateUserInfo from "../../../hooks/userManagementHooks/useUpdateUserInfo";
import useGetAllMyCases from "../../../hooks/studentHooks/useGetAllMyCases";
import useGetStudentPdf from "../../../hooks/studentHooks/useGetStudentPdf";
import { UpdateUserInfoSchema } from "../../../validations/UpdateUserInfoSchema";
import useAuthStore from "../../../store/useAuthStore";
import studentImg from "./../../../assets/images/profile/studentImg.webp";
import sparklesNotebookImg from "./../../../assets/images/profile/sparklesNotebookImg.webp";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { FiFileText, FiUsers } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { LuSparkles } from "react-icons/lu";
import { FaArrowTrendUp } from "react-icons/fa6";
import RecentlySubmitted from "../../../components/recentlySubmitted/RecentlySubmitted";

function StudentProfile() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;
  const isCustomScreen = useMediaQuery("(max-width:500px)");
  const isBelow1000px = useMediaQuery("(max-width:1000px)");

  const { isError, isLoading, error, data } = useGetUserById();
  const {
    isError: isAllMyCasesError,
    isLoading: isAllMyCasesLoading,
    error: allMyCasesError,
    data: allMyCasesData,
  } = useGetAllMyCases();
  const {
    isError: isSummaryError,
    isLoading: isSummaryLoading,
    error: summaryError,
    data: summaryData,
  } = useGetSummary();

  const [selectedId, setSelectedId] = useState(null); // حتى ابعت اي دي كل تقرير لهوك البي دي اف
  const { refetch, isFetching } = useGetStudentPdf(selectedId);
  console.log(data);

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
          bgcolor: "var(--navy-color)",
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
          bgcolor: "var(--navy-color)",
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
    <Box
      component={"section"}
      className="profile"
      sx={{
        paddingBottom: "140px",
        paddingTop: { xs: "50px", md: "90px" },
        bgcolor: "var(--navy-color)",
      }}
    >
      <Box
        sx={{
          paddingX: "30px",
        }}
      >
        <Grid container spacing={4}>
          <Grid item size={{xs:0,md:isBelow1000px?3.5:3.3}}>
        <RecentlySubmitted
          recentSubmitted={recentSubmitted}
          isFetching={isFetching}
          setSelectedId={setSelectedId}
          isCustomScreen={isCustomScreen}
          isSidePanel={true}
          sparklesNotebookImg={sparklesNotebookImg}
          timeAgo={timeAgo}
        />
        </Grid>
        <Grid item size={{xs:12,md:isBelow1000px?8.5:8.7}}>
        <Box className="right_side flex_column" sx={{ flexGrow: "1",  height: "100%"}}>
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: "45px",
              paddingTop: { xs: "30px", md: "0px" },
              "@media (max-width:780px)": {
                flexDirection: "column",
                gap: "50px",
                alignItems: "center",
              },
            }}
          >
            <Box
              className="image_and_user_info"
              sx={{
                display: "flex",
                gap: "30px",
                alignItems: "center",
                "@media (max-width:450px)": {
                  flexDirection: "column",
                  textAlign: "center",
                },
              }}
            >
              <Box
                className="image"
                sx={{
                  filter: "drop-shadow(0 0 15px rgba(255,0,0,0.6))",
                  bgcolor: "var(--primary-color)",
                  width: "190px",
                  height: "190px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  overflow: "hidden",
                  borderRadius: "50%",
                  "@media (max-width:1360px)": {
                    width: "170px",
                    height: "170px",
                  },
                  "@media (max-width:1120px)": {
                    width: "150px",
                    height: "150px",
                  },
                }}
              >
                <Box
                  component={"img"}
                  src={studentImg}
                  alt=""
                  width={140}
                  sx={{
                    "@media (max-width:1360px)": { width: "127px" },
                    "@media (max-width:1120px)": { width: "110px" },
                  }}
                />
              </Box>
              <Box className="user_info">
                <Typography
                  sx={{
                    color: "#07D06C",
                    fontFamily: "var(--primary-font)",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    border: "1px solid #07D06C",
                    borderRadius: "15px",
                    width: "fit-content",
                    paddingX: "5px",
                    "@media (max-width:1198px)": { fontSize: "10px" },
                    "@media (max-width:450px)": {
                      margin: "auto",
                      marginBottom: "15px",
                    },
                  }}
                >
                  <Box
                    component={LuSparkles}
                    sx={{
                      fontSize: "12px",
                      color: "#07D06C",
                      "@media (max-width:1198px)": { fontSize: "10px" },
                    }}
                  />
                  {user?.role}
                </Typography>
                <Typography
                  className="user_full_name"
                  component={"h1"}
                  sx={{
                    color: "#fff",
                    fontFamily: "var(--primary-font)",
                    fontWeight: "600",
                    fontSize: "34px",
                    whiteSpace:"nowrap",
                    "@media (max-width:1360px)": { fontSize: "26px" },
                    "@media (max-width:1000px)": { fontSize: "22px" },
                  }}
                >
                  Hello, {user?.fullName}
                </Typography>
                <Typography
                  className="email"
                  sx={{
                    color: "var(--secondary-color)",
                    fontFamily: "var(--primary-font)",
                    "@media (max-width:1198px)": { fontSize: "14px" },
                  }}
                >
                  {user?.email}
                </Typography>
                <Typography
                  className="user_name"
                  sx={{
                    color: "var(--secondary-color)",
                    fontFamily: "var(--primary-font)",
                    "@media (max-width:1198px)": { fontSize: "14px" },
                  }}
                >
                  <Typography
                    component={"span"}
                    sx={{
                      color: "#c7c7c7",
                      fontFamily: "var(--primary-font)",
                      "@media (max-width:1198px)": { fontSize: "14px" },
                    }}
                  >
                    User Name:{" "}
                  </Typography>
                  {user?.userName}
                </Typography>
                <Typography
                  className="phone_number"
                  sx={{
                    color: "var(--secondary-color)",
                    fontFamily: "var(--primary-font)",
                    "@media (max-width:1198px)": { fontSize: "14px" },
                  }}
                >
                  <Typography
                    component={"span"}
                    sx={{
                      color: "#c7c7c7",
                      fontFamily: "var(--primary-font)",
                      "@media (max-width:1198px)": { fontSize: "14px" },
                    }}
                  >
                    Phone:{" "}
                  </Typography>
                  {user?.phoneNumber}
                </Typography>
                <Typography
                  className="supervisor_name"
                  sx={{
                    color: "var(--secondary-color)",
                    fontFamily: "var(--primary-font)",
                    "@media (max-width:1198px)": { fontSize: "14px" },
                  }}
                >
                  <Typography
                    component={"span"}
                    sx={{
                      color: "#c7c7c7",
                      fontFamily: "var(--primary-font)",
                      "@media (max-width:1198px)": { fontSize: "14px" },
                    }}
                  >
                    Supervisor:{" "}
                  </Typography>
                  Dr. {data?.supervisorName}
                </Typography>
                <Box className="status">
                  {data?.isBlocked ? (
                    <Typography
                      sx={{
                        color: "var(--primary-color)",
                        fontFamily: "var(--primary-font)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        "@media (max-width:1198px)": { fontSize: "14px" },
                        "@media (max-width:450px)": {
                          justifyContent: "center",
                        },
                      }}
                    >
                      <Box
                        component={IoIosCloseCircle}
                        sx={{
                          fontSize: "17px",
                          color: "var(--primary-color)",
                          "@media (max-width:1198px)": { fontSize: "14px" },
                        }}
                      />
                      Inactive
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        color: "#07D06C",
                        fontFamily: "var(--primary-font)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        "@media (max-width:1198px)": { fontSize: "14px" },
                        "@media (max-width:450px)": {
                          justifyContent: "center",
                        },
                      }}
                    >
                      <Box
                        component={IoIosCheckmarkCircle}
                        sx={{
                          fontSize: "17px",
                          color: "#07D06C",
                          "@media (max-width:1198px)": { fontSize: "14px" },
                        }}
                      />
                      Active
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
            <Box className="clock">
              <FlipClock />
            </Box>
          </Box>
          <Box className="summary" sx={{ marginTop: "10px" }}>
            <Grid container spacing={1}>
              <Grid item size={{ xs: 12, sm: 4 }}>
                <Box
                  className="reports_submitted"
                  sx={{
                    bgcolor: "var(--primary-color)",
                    height: "100%",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    gap: "15px",
                    paddingX: "15px",
                    paddingTop: "18px",
                    paddingBottom: "27px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#fff",
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <Box className="details flex_column" sx={{ gap: "10px" }}>
                    <Typography
                      sx={{
                        color: "var(--dark-gray-color)",
                        textTransform: "uppercase",
                        fontSize: "18px",
                        fontWeight: "700",
                        fontFamily: "var(--primary-font)",
                        "@media (max-width:1198px)": { fontSize: "14px" },
                      }}
                    >
                      Total Cases
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--dark-gray-color)",
                        textTransform: "uppercase",
                        fontSize: "20px",
                        fontWeight: "700",
                        fontFamily: "var(--primary-font)",
                        "@media (max-width:1198px)": { fontSize: "17px" },
                      }}
                    >
                      {summaryData?.reportsSubmitted}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      bgcolor: "var(--dark-gray-color)",
                      boxShadow: "0 0 15px rgba(16, 16, 16, 0.51)",
                      borderRadius: "12px",
                      padding: "8px",
                      display: "flex",
                    }}
                  >
                    <Box
                      component={FiUsers}
                      sx={{
                        fontSize: "34px",
                        color: "#fff",
                        "@media (max-width:1198px)": { fontSize: "27px" },
                      }}
                    />
                  </Typography>
                </Box>
              </Grid>
              <Grid item size={{ xs: 12, sm: 4 }}>
                <Box
                  className="feedback_received"
                  sx={{
                    bgcolor: "var(--primary-color)",
                    height: "100%",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    gap: "15px",
                    paddingX: "15px",
                    paddingTop: "18px",
                    paddingBottom: "27px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#fff",
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <Box
                    className="details flex_column"
                    sx={{ gap: "10px", position: "relative" }}
                  >
                    <Typography
                      sx={{
                        color: "var(--dark-gray-color)",
                        textTransform: "uppercase",
                        fontSize: "18px",
                        fontWeight: "700",
                        fontFamily: "var(--primary-font)",
                        "@media (max-width:1198px)": { fontSize: "14px" },
                      }}
                    >
                      Feedbacks
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--dark-gray-color)",
                        textTransform: "uppercase",
                        fontSize: "20px",
                        fontWeight: "700",
                        fontFamily: "var(--primary-font)",
                        "@media (max-width:1198px)": { fontSize: "17px" },
                      }}
                    >
                      {summaryData?.feedbackReceived}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      bgcolor: "var(--dark-gray-color)",
                      boxShadow: "0 0 15px rgba(16, 16, 16, 0.51)",
                      borderRadius: "12px",
                      padding: "8px",
                      display: "flex",
                    }}
                  >
                    <Box
                      component={FiFileText}
                      sx={{
                        fontSize: "34px",
                        color: "#fff",
                        "@media (max-width:1198px)": { fontSize: "27px" },
                      }}
                    />
                  </Typography>
                </Box>
              </Grid>
              <Grid item size={{ xs: 12, sm: 4 }}>
                <Box
                  className="this_week"
                  sx={{
                    bgcolor: "var(--primary-color)",
                    height: "100%",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    gap: "15px",
                    paddingX: "15px",
                    paddingTop: "18px",
                    paddingBottom: "27px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#fff",
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <Box className="details flex_column" sx={{ gap: "10px" }}>
                    <Typography
                      sx={{
                        color: "var(--dark-gray-color)",
                        textTransform: "uppercase",
                        fontSize: "18px",
                        fontWeight: "700",
                        fontFamily: "var(--primary-font)",
                        "@media (max-width:1198px)": { fontSize: "14px" },
                      }}
                    >
                      This Week
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--dark-gray-color)",
                        textTransform: "uppercase",
                        fontSize: "20px",
                        fontWeight: "700",
                        fontFamily: "var(--primary-font)",
                        "@media (max-width:1198px)": { fontSize: "17px" },
                      }}
                    >
                      {recentSubmitted?.length}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      bgcolor: "var(--dark-gray-color)",
                      boxShadow: "0 0 15px rgba(16, 16, 16, 0.51)",
                      borderRadius: "12px",
                      padding: "8px",
                      display: "flex",
                    }}
                  >
                    <Box
                      component={FaArrowTrendUp}
                      sx={{
                        fontSize: "34px",
                        color: "#fff",
                        "@media (max-width:1198px)": { fontSize: "27px" },
                      }}
                    />
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <RecentlySubmitted
            recentSubmitted={recentSubmitted}
            isFetching={isFetching}
            setSelectedId={setSelectedId}
            isCustomScreen={isCustomScreen}
            isSidePanel={false}
            sparklesNotebookImg={sparklesNotebookImg}
            timeAgo={timeAgo}
          />
          <Box
            className="line_chart"
            sx={{
              bgcolor: "#8986862b",
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
              localeText={{
                noData: "Start submitting reports to see stats",
              }}
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
                "& .MuiChartsNoDataOverlay-root text": {
                  display: "none !important",
                },
              }}
              slotProps={{
                legend: {
                  position: {
                    vertical: "top",
                    horizontal: "end",
                  },
                },
                noDataOverlay: {
                  sx: {
                    fill: "#fff !important",
                    "@media (max-width:500px)": { fontSize: "10px" },
                  },
                },
              }}
            />
          </Box>
          <Box
            className="edit_user_info_form"
            sx={{
              borderRadius: "12px",
              marginTop: "23px",
              paddingX: "60px",
              paddingTop: "68px",
              paddingBottom: "40px",
              bgcolor: "#8986862b",
              flexGrow: "1",
              position: "relative",
              "@media (max-width:700px)": { paddingX: "10px" },
            }}
          >
            <RegisterForm
              useHook={useUpdateUserInfo}
              userId={userId}
              schema={UpdateUserInfoSchema}
              showPassword={false}
              showSupervisors={false}
              fullWidthButton={false}
              fullWidthInput={isCustomScreen ? true : false}
              btnLabel="Update Profile"
              textfieldColor={"textfield_black"}
              defaultValues={{
                fullName: user.fullName,
                userName: user.userName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                supervisorUserId: data?.supervisorId
              }}
            />
            <Typography
              sx={{
                fontFamily: "var(--primary-font)",
                fontWeight: "600",
                color: "#fff",
                fontSize: { xs: "15px", sm: "17px" },
                marginBottom: "10px",
                position: "absolute",
                top: "12px",
                left: "33px",
              }}
            >
              Profile Settings
            </Typography>
            <Link
              component={RouterLink}
              to={"/auth/security-verification"}
              sx={{
                color: "var(--primary-color)",
                fontFamily: "sans-serif",
                fontSize: "15px",
                fontWeight: "600",
                width: "fit-content",
                position: "absolute",
                bottom: "40px",
                "@media (max-width:440px)": { bottom: "-34px", left: "13px" },
              }}
              className="auth_link"
            >
              Reset Password?
            </Link>
          </Box>
        </Box>
        </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default StudentProfile;