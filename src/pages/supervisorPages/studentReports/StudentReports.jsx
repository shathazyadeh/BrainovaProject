import React, { useEffect, useState } from "react";
import Loader from "../../../components/uiVerseComponents/loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import useGetAllOfMyStudentsCases from "../../../hooks/supervisorHooks/useGetAllOfMyStudnetsCases";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import DashboardNavbar from "../../../components/muiComponents/dashboardNavbar/DashboardNavbar";
import { Link as RouterLink } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { BsFileEarmarkArrowDown } from "react-icons/bs";
import UsersSearch from "../../../components/filterSearch/usersSearch/UsersSearch";
import ReportsFilters from "../../../components/filterInputs/reportsFilters/ReportsFilters";
import useDownloadSupervisorPDF from "../../../hooks/supervisorHooks/useDownloadSupervisorPDF";
import { BsFillExclamationOctagonFill } from "react-icons/bs";
import DashboardFooter from "../../../components/dashboardFooter/DashboardFooter";
import DashboardErrorState from '../../../components/requestStates/error/dashboardErrorState/DashboardErrorState.jsx';
import DashboardLoadingState from "../../../components/requestStates/loading/dashboardLoadingState/DashboardLoadingState.jsx";


function StudentReports() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const { isError, error, isLoading, data } = useGetAllOfMyStudentsCases(studentId);
  const downloadMutation = useDownloadSupervisorPDF();

  const [search, setSearch] = useState("");
  const [feedbackFilter, setFeedbackFilter] = useState("all"); // "all" | "reviewed" | "noFeedback"
  const [page, setPage] = useState(1);//رقم الصفحة الحالي بالبداية خليته 1
  const reviewedCount =
    data?.items?.filter((report) => report.isReviewed)?.length || 0; // لعرض عدد الريفيود

  const totalReports = data?.items.length || 0;
  const digits = Math.max(3, String(totalReports).length); //لكتابة اي دي التقرير
  // كم اكبر عدد ديجيت ممكن اوصله في كتابة رقم التقرير


  const filteredReports =   //دمجنا فلترة السيرش والفيدباك فلتر مع بعض بخطوة وحدة عشان الباجينيشن 
    data?.items?.filter((report) => {
      const matchesSearch = report.reportCode
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesFeedback =
        feedbackFilter === "all"
          ? true
          : feedbackFilter === "noFeedback"
            ? !report.isReviewed
            : report.isReviewed;

      return matchesSearch && matchesFeedback;
    }) || [];
  useEffect(() => {
    setPage(1);
  }, [search, feedbackFilter]);
  const itemsPerPage = 9;//عدد العناصر اللي بدي تنعرض بكل صفحة كم ؟ 
  const paginatedData = filteredReports?.slice( // قسمت البيانات حسب الصفحة الجديدة عشان اعرف ايش رح اعرض   array.slice(start, end)
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil((filteredReports?.length || 0) / itemsPerPage); // عشان احسب عدد الصفحات الجديدة مثلا 20 عنصر /6=3.33 استعملت من مكتبة ماث سيل عشان اجبر اللي بعد الفاصلة العشرية وافتحلهن صفحة 

  if (isLoading) return <DashboardLoadingState />;
  if (isError) return <DashboardErrorState error={error} />;

  return (
    <Box
      sx={{
        bgcolor: "var(--navy-color)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative"
      }}
    >
      <DashboardNavbar />

      <Box
        component={"section"}
        sx={{

          flexGrow: 1,
          alignItems: "flex-start",
          display: "block",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="lg">
          {totalReports > 0 && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "30px",
                  alignItems: "center",
                  marginTop: "10px",
                  "@media (max-width:1044px)": {
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginBottom: "10px",
                  },
                }}
              >
                <Box className="student_info">
                  <Box
                    sx={{
                      display: "flex",
                      paddingBottom: "10px",
                      alignItems: "center",
                      paddingTop: { xs: "30px", md: "0px" },
                    }}
                  >
                    <FaArrowLeft
                      color="#fff"
                      size={25}
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/dashboard/supervisor/students")}
                    />
                    <Avatar
                      sx={{
                        marginLeft: "15px",
                        bgcolor: "var(--primary-color)",
                        fontSize: "27px",
                        width: 50,
                        height: 50,
                        boxShadow: "0 0 15px rgba(207, 25, 25, 0.74)",
                      }}
                    >
                      {data?.items?.[0]?.studentName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Box className="flex_column">
                      <Typography
                        sx={{
                          color: "#fff",
                          paddingLeft: "10px",
                          fontFamily: "var(--primary-font)",
                          fontWeight: "800",
                          fontSize: "23px",
                          whiteSpace: { md: "nowrap" },
                          "@media (max-width:700px)": {
                            fontSize: "18px",
                          },
                        }}
                      >
                        {data?.items?.[0]?.studentName || ""}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#7e8a9a",
                          paddingLeft: "10px",
                          fontFamily: "var(--primary-font)",
                          fontWeight: "400",
                          fontSize: "12px",
                          whiteSpace: { md: "nowrap" },
                        }}
                      >
                        {data?.items?.[0]?.studentEmail || ""}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  className="numbers"
                  sx={{
                    display: "flex",
                    gap: "10px",
                    "@media (max-width:1044px)": {
                      marginTop: "20px",
                    },
                  }}
                >
                  <Box
                    className="total_reports"
                    sx={{
                      border: "1px solid #57565662",
                      borderRadius: "15px",
                      bgcolor: "#6565655b",
                      padding: "15px",
                      height: { sm: "100px", md: "fit-content" },
                      width: { xs: "50%", md: "fit-content" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <FaFileAlt size={17} color="#fa0202" />
                      <Typography
                        sx={{
                          color: "#ffffff",
                          fontFamily: "var(--primary-font)",
                          overflowWrap: "break-word",
                          "@media (max-width:418px)": {
                            fontSize: "13px",
                          },
                        }}
                      >
                        Total Reports
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "20px",
                      }}
                    >
                      {totalReports}
                    </Typography>
                  </Box>
                  <Box
                    className="reviewed_reports"
                    sx={{
                      border: "1px solid #57565662",
                      borderRadius: "15px",
                      bgcolor: "#6565655b",
                      padding: "15px",
                      height: { sm: "100px", md: "fit-content" },
                      width: { xs: "50%", md: "fit-content" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        paddingX: "9px",
                        flexShrink: 0,
                      }}
                    >
                      <FaArrowTrendUp size={20} color="#02fa13" />
                      <Typography
                        sx={{
                          color: "#ffffff",
                          fontFamily: "var(--primary-font)",
                          overflowWrap: "break-word",
                          "@media (max-width:418px)": {
                            fontSize: "12px",
                          },
                        }}
                      >
                        Total Reviewed{" "}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "20px",
                        paddingLeft: "8px",
                      }}
                    >
                      {reviewedCount}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="search_and_filter " sx={{ paddingTop: "10px" }}>
                <Box sx={{ flexGrow: "1", display: "flex", gap: "15px" }}>
                  <Grid container rowSpacing={0.1} columnSpacing={1}>
                    <Grid item>
                      <ReportsFilters
                        feedbackFilter={feedbackFilter}
                        setFeedbackFilter={setFeedbackFilter}
                        showPredictionFilter={false}
                      />
                    </Grid>
                    <Grid item sx={{ flexGrow: "1" }}>
                      <UsersSearch
                        search={search}
                        setSearch={setSearch}
                        label="Search by report ID..."
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </>
          )}

          {totalReports === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                position: "relative",


              }}
            >
              <FaArrowLeft
                color="#fff"
                size={25}
                style={{ cursor: "pointer", position: "absolute", left: "0", top: "34px" }}
                onClick={() => navigate("/dashboard/supervisor/students")}
              />
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
                <Box component={BsFillExclamationOctagonFill}
                  sx={{
                    color: "red", fontSize: "50px",
                    "@media (max-width:600px)": { fontSize: "40px" }
                  }} />
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: { xs: "18px", sm: "22px", md: '28' },
                    fontWeight: "700",
                    marginBottom: "10px",
                    fontFamily: "var(--primary-font)",
                  }}
                >
                  No Reports Found
                </Typography>

                <Typography
                  sx={{
                    color: "#7e8a9a",
                    fontSize: { xs: "12px", sm: "14px", lg: "16" },
                    lineHeight: 1.8,
                    fontFamily: "var(--primary-font)",
                  }}
                >
                  This student hasn’t submitted any reports yet.
                </Typography>
              </Box>
            </Box>
          ) : paginatedData.length === 0 ? (

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "560px",
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  bgcolor: "#5959594e",
                  paddingY: "50px",
                  paddingX: { xs: "30px", sm: "90px" },
                  borderRadius: "15px",
                  boxShadow: "0 0 15px rgba(228, 1, 1, 0.22)",
                  fontFamily: "var(--primary-font)",
                  fontWeight: "500",
                }}
              >
                <Box
                  component={BsFillExclamationOctagonFill}
                  sx={{
                    color: "red",
                    fontSize: "50px",
                    "@media (max-width:600px)": { fontSize: "40px" }
                  }}
                />
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: { xs: "18px", sm: "22px", md: '28' },
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
                  {search
                    ? `No reports matching "${search}"`
                    : "No reports match the selected filter."}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Grid container spacing={2} sx={{ minHeight: "1030px", alignContent: "flex-start" }}>
              {paginatedData?.map((report) => (
                <Grid item size={{ xs: 12, sm: 6, lg: 4 }} key={report.reportId}>
                  <Box
                    className="report"
                    sx={{
                      bgcolor: "#3636365b",
                      padding: "25px",
                      border: "1px solid #e4dfdf3b",
                      borderRadius: "15px",

                      "&:hover": {
                        transform: "translateY(-5px)",
                        transition: "0.5s ease",
                        border: '1px solid var(--primary-color)'
                      },
                    }}
                  >
                    <Box className="report_details">
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: "500",
                          fontSize: "15px",
                          marginBottom: "10px",
                          fontFamily: "var(--primary-font)",
                        }}
                      >
                        {report.reportCode}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#7e8a9a",
                          fontWeight: "400",
                          fontSize: "13px",
                          fontFamily: "var(--primary-font)",
                        }}
                      >{`CASE-${report?.caseId?.slice(0, 6)}`}</Typography>
                      <Typography
                        sx={{
                          color: "#7e8a9a",
                          fontWeight: "400",
                          fontSize: "11px",
                          paddingTop: "3px",
                          fontFamily: "var(--primary-font)",
                        }}
                      >
                        {report.reportSubmittedAt?.split("T")[0]}
                      </Typography>
                    </Box>
                    <Box
                      className="ai_predict_details"
                      sx={{
                        border: "1px solid #57565662",
                        borderRadius: "15px",
                        bgcolor: "#3636365b",
                        paddingX: "10px",
                        marginTop: "15px",
                        paddingY: "13px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#ffffff",
                          fontWeight: "500",
                          fontSize: "13px",
                          fontFamily: "var(--primary-font)",
                        }}
                      >
                        AI Prediction
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          paddingY: "5px",
                          paddingX: "14px",
                          borderRadius: "15px",
                          display: "inline-flex",
                          marginTop: "10px",
                          bgcolor:
                            report?.predictionResult === "meningioma"
                              ? "rgb(55, 44, 28)"
                              : report?.predictionResult === "glioma"
                                ? "rgb(51, 26, 32)"
                                : report?.predictionResult === "notumor"
                                  ? "rgb(23, 49, 40)"
                                  : report?.predictionResult === "pituitary"
                                    ? "#400f4d7c"
                                    : "#781234",
                          color:
                            report?.predictionResult === "meningioma"
                              ? "rgb(218, 148, 14)"
                              : report?.predictionResult === "glioma"
                                ? "rgb(196, 36, 38)"
                                : report?.predictionResult === "notumor"
                                  ? "rgb(30, 167, 69)"
                                  : report?.predictionResult === "pituitary"
                                    ? "#9f05ffab"
                                    : "var(--primary-color)",
                        }}
                      >
                        ● {report?.predictionResult}
                      </Typography>
                    </Box>
                    <Box
                      className="feedback"
                      sx={{
                        marginTop: "15px",
                        borderBottom: "1px solid #3434348e",
                        paddingBottom: "15px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#7e8a9a",
                          fontWeight: "400",
                          fontSize: "13px",
                          fontFamily: "var(--primary-font)",
                        }}
                      >
                        Feedback
                      </Typography>
                      {report.isReviewed ? (
                        <Typography
                          sx={{
                            width: "fit-content",
                            paddingX: "14px",
                            paddingY: "5px",
                            borderRadius: "20px",
                            backgroundColor: "#173128",
                            color: "#1FA143",
                            fontSize: "13px",
                            display: "flex",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Submitted
                        </Typography>
                      ) : (
                        <Typography
                          sx={{
                            width: "fit-content",
                            paddingX: "10px",
                            paddingY: "5px",
                            borderRadius: "20px",
                            backgroundColor: "#2b313c",
                            color: "#718296",
                            fontSize: "13px",
                            display: "flex",
                            whiteSpace: "nowrap",
                          }}
                        >
                          No Feedback
                        </Typography>
                      )}
                    </Box>
                    <Box
                      className="view_details"
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        component={RouterLink}
                        to={`/dashboard/supervisor/report-details/${report.reportId}`}
                        sx={{
                          borderRadius: "15px",
                          bgcolor: "#3636365b",
                          color: "#ffffff",
                          paddingX: "30px",
                          textAlign: "center",
                          width: "100%",
                          marginTop: "10px",
                          fontSize: "12px",
                          textTransform: "none",
                          display: "flex",
                          gap: "10px",
                          border: "1px solid #66666636",
                          "&:hover": {
                            bgcolor: " #ff00009f",
                            boxShadow: "0 0 15px rgba(207, 25, 25, 0.51)",
                          },
                        }}
                      >
                        <IoMdEye size={20} />
                        View Report
                      </Button>
                      <BsFileEarmarkArrowDown
                        size={20}
                        color="#fff"
                        style={{ cursor: "pointer", marginTop: "10px" }}
                        onClick={() => downloadMutation.mutate(report.reportId)}
                      />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
          {filteredReports?.length > 0 && (
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

export default StudentReports;