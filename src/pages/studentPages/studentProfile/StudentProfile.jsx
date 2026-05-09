import { Box, Container, Grid, Typography, Link, Button } from '@mui/material'
import { LineChart } from "@mui/x-charts/LineChart";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import FlipClock from '../../../components/flipClock/FlipClock';
import Loader from '../../../components/uiVerseComponents/loader/Loader';
import RegisterForm from '../../../components/registerForm/RegisterForm'
import useGetUserById from '../../../hooks/getUsersHooks/useGetUserById';
import useGetSummary from '../../../hooks/studentHooks/useGetSummary';
import useUpdateUserInfo from '../../../hooks/userManagementHooks/useUpdateUserInfo';
import useGetAllMyCases from '../../../hooks/studentHooks/useGetAllMyCases';
import useGetStudentPdf from '../../../hooks/studentHooks/useGetStudentPdf';
import { UpdateUserInfoSchema } from '../../../validations/UpdateUserInfoSchema';
import useAuthStore from '../../../store/useAuthStore';
import studentImg from './../../../assets/images/profile/studentImg.webp'
import sparklesNotebookImg from './../../../assets/images/profile/sparklesNotebookImg.webp'
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { FiFileText , FiUsers } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { LuSparkles } from "react-icons/lu";
import { FaArrowTrendUp } from "react-icons/fa6";



function StudentProfile() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;

  const { isError, isLoading, error, data } = useGetUserById();
  const { isError: isAllMyCasesError, isLoading: isAllMyCasesLoading, error: allMyCasesError, data: allMyCasesData } = useGetAllMyCases();
  const { isError: isSummaryError, isLoading: isSummaryLoading, error: summaryError, data: summaryData } = useGetSummary();

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
          bgcolor:"var(--navy-color)"
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
          bgcolor:"var(--navy-color)"
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
    <Box component={"section"} className="profile" sx={{ paddingY: "100px" , bgcolor:"var(--navy-color)" }}>
        <Box sx={{display:"flex",paddingX:"30px",gap:"30px"}}>
          <Box className="left_side" sx={{width:'400px'}}>
            <Box className="summary" sx={{ marginBottom: "23px" }}>
                <Grid container spacing={1}>
                  <Grid item size={{ xs: 12 }}>
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
                        "&:hover": { bgcolor: "#fff",transform: "translateY(-3px)" },
                      }}
                    >
                      <Box className="details flex_column" sx={{ gap: "10px" }}>
                        <Typography
                          sx={{
                            color: "var(--dark-gray-color)",
                            textTransform: "uppercase",
                            fontSize: "18px",
                            fontWeight:"600",
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
                            color: "var(--dark-gray-color)",
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
                          bgcolor: "var(--dark-gray-color)",
                          boxShadow: "0 0 15px rgba(16, 16, 16, 0.51)",
                          borderRadius: "12px",
                          padding: "8px",
                          display: "flex",
                        }}
                      >
                        <FiUsers size={34} color="#fff" />
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item size={{ xs: 12 }}>
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
                        "&:hover": { bgcolor: "#fff",transform: "translateY(-3px)" },
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
                            fontWeight:"600",
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
                            color: "var(--dark-gray-color)",
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
                          bgcolor: "var(--dark-gray-color)",
                          boxShadow: "0 0 15px rgba(16, 16, 16, 0.51)",
                          borderRadius: "12px",
                          padding: "8px",
                          display: "flex",
                        }}
                      >
                        <FiFileText size={34} color="#fff" />
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item size={{ xs: 12 }}>
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
                        "&:hover": { bgcolor: "#fff",transform: "translateY(-3px)" },
                      }}
                    >
                      <Box className="details flex_column" sx={{ gap: "10px" }}>
                        <Typography
                          sx={{
                            color: "var(--dark-gray-color)",
                            textTransform: "uppercase",
                            fontSize: "18px",
                            fontWeight:"600",
                            fontFamily: "var(--primary-font)",
                            "@media (max-width:700px)": {
                              fontSize: "11px",
                            },
                          }}
                        >
                          
                        This Week
                        </Typography>
                        <Typography
                          sx={{
                            color: "var(--dark-gray-color)",
                            textTransform: "uppercase",
                            fontSize: "20px",
                            fontWeight: "600",
                            fontFamily: "var(--primary-font)",
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
                        <FaArrowTrendUp size={34} color="#fff" />
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
          <Box className="recently_submitted"
                sx={{
                  bgcolor: "#8986862b",
                  direction: "rtl", // لجعل السكرولر عاليسار بدي الديفولت الي هو يمين
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                  paddingX: "14px",
                  paddingTop: "20px",
                  position: "relative",
                  height: "427px",
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
               <Box sx={{ direction: "ltr" }}>  {/* wrapper برجع المحتوى الداخلي لليمين */}
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
                  <Box className="no_recent_submissions flex_column" sx={{gap:"20px",alignItems:"center",paddingTop:"200px"}}>
                  <Box component={"img"} src={sparklesNotebookImg} alt="" width={260} sx={{
                    border:"1px solid #cccccc2b",
                    borderRadius:"20px",
                    padding:"20px",
                      "@media (max-width:700px)": { width:"160px" }
                  }} />
                  <Typography sx={{color:"#fff",fontFamily: "var(--primary-font)",fontWeight: "500",fontSize:"17px"}}>
                    No recent submissions
                  </Typography>
                  <Typography sx={{color:"var(--secondary-color)"}}>
                    You haven’t submitted any cases recently.<br/>
                    Your recent submissions will appear here.
                  </Typography>
                  <Button
          className="upper_case"
          component={RouterLink}
          to="/predict-tumor"
          sx={{
            bgcolor: "var(--primary-color)",
            color: "white",
            fontSize:"14px",
            fontWeight:"600",
            borderRadius: "6px",
            paddingX: "25px",
            paddingY: "7px",
            display:"flex",
            alignItems:"center",
            gap:"5px",
            width:"fit-content",
            transition: "all 0.3s ease",
            "&:hover": { bgcolor: "#fff", color: "var(--navy-color)" },
          }}
        >
          <FaPlus sx={{fontWeight:"800"}}/>
          Submit New Case
        </Button>
                  </Box>
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
              </Box>
              </Box>
              <Box className="right_side" sx={{flexGrow:"1"}}>
                <Box className="header"
                    sx={{
                      display:"flex",
                      justifyContent:"space-between",
                      paddingBottom: "45px",
                      paddingTop:{xs:"30px",md:"0px"},
                    }}
                  >
                    <Box className="left_side" sx={{display:"flex", gap:"30px"}}>
                      <Box className="image"
                      sx={{ filter: "drop-shadow(0 0 15px rgba(255,0,0,0.6))",
                            bgcolor:"var(--primary-color)",width:"170px",
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"flex-end",
                            overflow:"hidden",
                            height:"170px",borderRadius:"50%" }}
                    >
                      <Box component={"img"} src={studentImg} alt="" width={120} sx={{
                      "@media (max-width:700px)": { width:"160px" }
                    }} />
                    </Box>
                    <Box className="user_info">
                      <Typography sx={{color:"#07D06C",
                                       fontFamily: "var(--primary-font)",
                                       fontSize:"12px",
                                       display:"flex",alignItems:"center",
                                       gap:"4px",border:"1px solid #07D06C",
                                       borderRadius:"15px",width:"fit-content",
                                       paddingX:"5px"}}>
                        <LuSparkles fill={"#07D06C"} size={12}/>
                        {user?.role}
                      </Typography>
                      <Typography className='user_full_name'
                        component={"h1"}
                        sx={{
                          color: "#fff",
                          fontFamily: "var(--primary-font)",
                          fontWeight: "600",
                          fontSize: "34px",
                          "@media (max-width:700px)": { fontSize: "26px" },
                        }}
                      >
                         Hello, {user?.fullName}
                      </Typography>
                      <Typography className='email' 
                      sx={{ color: "var(--secondary-color)",
                            fontFamily: "var(--primary-font)",
                      }}>
                        {user?.email}
                      </Typography>
                      <Typography className='user_name' 
                      sx={{ color: "var(--secondary-color)",
                            fontFamily: "var(--primary-font)",
                      }}>
                        <Typography component={'span'} sx={{color: "#c7c7c7",
                            fontFamily: "var(--primary-font)"}}>
                          User Name:{" "}
                        </Typography>
                        {user?.userName}
                      </Typography>
                      <Typography className='phone_number' 
                      sx={{ color: "var(--secondary-color)",
                            fontFamily: "var(--primary-font)",
                      }}>
                        <Typography component={'span'} sx={{color: "#c7c7c7",
                            fontFamily: "var(--primary-font)"}}>
                          Phone:{" "}
                        </Typography>
                        {user?.phoneNumber}
                      </Typography>
                      <Typography className='supervisor_name' 
                      sx={{ color: "var(--secondary-color)",
                            fontFamily: "var(--primary-font)",
                      }}>
                        <Typography component={'span'} sx={{color: "#c7c7c7",
                            fontFamily: "var(--primary-font)"}}>
                          Supervisor:{" "}
                        </Typography>
                        Dr. {data?.supervisorName}
                      </Typography>
                      <Box className='status'>
                        {data?.isBlocked ? 
                        <Typography sx={{color:"var(--primary-color)",fontFamily: "var(--primary-font)",display:"flex",alignItems:"center",gap:"4px"}}>
                          <IoIosCloseCircle fill={"var(--primary-color)"} size={17}/>
                          Inactive
                        </Typography>
                         : 
                         <Typography sx={{color:"#07D06C",fontFamily: "var(--primary-font)",display:"flex",alignItems:"center",gap:"4px"}}>
                          <IoIosCheckmarkCircle fill={"#07D06C"} size={17}/>
                          Active
                        </Typography>
                        }
                      </Box>
                    </Box>
                    </Box>
                    <Box className="clock">
                      <FlipClock/>
                    </Box>
        </Box>
       
                <Box className="line_chart"
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
              <Box className="edit_user_info_form"
              sx={{
                borderRadius: "12px",
                marginTop: "23px",
                paddingX: "60px",
                paddingTop: "68px",
                paddingBottom: "40px",
                bgcolor: "#8986862b",
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
                btnLabel="Update Profile"
                textfieldColor={"textfield_black"}
                defaultValues={{
                  fullName: user.fullName,
                  userName: user.userName,
                  email: user.email,
                  phoneNumber: user.phoneNumber,
                }}
              />
              <Typography
                  sx={{
                    fontFamily: "var(--primary-font)",
                    fontWeight: "600",
                    color: "#fff",
                    fontSize: { xs: "15px", sm: "17px" },
                    marginBottom: "10px",
                    position:"absolute",
                    top:"12px",
                    left:"33px"
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
        </Box>
    </Box>
  );
}

export default StudentProfile