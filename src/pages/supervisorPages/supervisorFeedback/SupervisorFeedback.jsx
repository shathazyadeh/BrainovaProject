import { Box, Container, Grid, Pagination, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaRegEdit } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import DashboardNavbar from "../../../components/muiComponents/dashboardNavbar/DashboardNavbar";
import Loader from "../../../components/uiVerseComponents/loader/Loader";
import useGetMyallFeedbacks from "../../../hooks/supervisorHooks/useGetMyallFeedbacks";
import UsersSearch from "../../../components/filterSearch/usersSearch/UsersSearch";
import useDeleteFeedback from "../../../hooks/supervisorHooks/useDeleteFeedback";
import BasicModal from "../../../components/muiComponents/basicModal/BasicModal";
import { useNavigate } from "react-router-dom";
import { BsFillExclamationOctagonFill } from "react-icons/bs";
import DashboardFooter from "../../../components/dashboardFooter/DashboardFooter";
import useGetAllOfMyStudentsCases from "../../../hooks/supervisorHooks/useGetAllOfMyStudnetsCases";
import DashboardErrorState from '../../../components/requestStates/error/dashboardErrorState/DashboardErrorState.jsx';
import DashboardLoadingState from "../../../components/requestStates/loading/dashboardLoadingState/DashboardLoadingState.jsx";

function SupervisorFeedback() {
  const { isError, error, isLoading, data } = useGetMyallFeedbacks();
  const { isError: isGetAllCasesError, error: getAllCasesError, isLoading: isGetAllCasesLoading, data: getAllCasesData } = useGetAllOfMyStudentsCases();
  const { deleteFeedbackMutation } = useDeleteFeedback();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const navigate = useNavigate();



  const filteredData =
    data?.items?.filter((feedback) =>
      feedback.studentName?.toLowerCase().includes(search.toLowerCase()) ||
      feedback.supervisorName?.toLowerCase().includes(search.toLowerCase())
    ) || [];
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


  const reportsWithoutFeedback =
    getAllCasesData?.items?.filter((report) => !report.isReviewed) || [];


  const handleDeleteFeedback = async (feedbackId) => {
    await deleteFeedbackMutation.mutateAsync(feedbackId);
  };

  const handleChangeFeedback = async (feedback) => {
    setOpen(true);
    setSelectedFeedback(feedback);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading || isGetAllCasesLoading) return <DashboardLoadingState />;
  if (isError || isGetAllCasesError) return <DashboardErrorState error={error || getAllCasesError} />;

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
                "@media (max-width:700px)": { fontSize: "22px" },
              }}
            >
              Feedback
            </Typography>
            <Typography
              component={"span"}
              sx={{
                color: "#fff",
                fontFamily: "var(--primary-font)",
                fontSize: "20px",
                "@media (max-width:700px)": { fontSize: "15px" },
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
              feedback entries
            </Typography>
          </Box>

          <Box
            className="unreviewed_feedbacks"
            sx={{
              bgcolor: "rgba(207, 25, 25, 0.12)",
              border: "1px solid rgba(207,25,25,0.4)",
              borderRadius: "10px",
              padding: "20px",
              marginTop: "23px",

            }}
          >
            <Typography
              component={"h2"}
              sx={{
                color: "#fff",
                fontSize: "14px",
                fontFamily: "var(--primary-font)",
                fontWeight: "600",
                marginBottom: "10px",
              }}
            >
              Reports Awaiting Feedback
              <Typography
                className="number_of_unreviewed_feedbacks"
                component={"span"}
                sx={{
                  fontFamily: "var(--primary-font)",
                  fontWeight: "600",
                  fontSize: "12px",
                  color: "var(--primary-color)",
                }}
              >
                {" "}
                ({reportsWithoutFeedback?.length})
              </Typography>
            </Typography>
            {reportsWithoutFeedback?.length === 0 ? (
              <Box
                className="no_unreviewed_feedbacks"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "60px",

                }}
              >
                <Typography
                  sx={{
                    color: "#7e8a9a",
                    fontSize: "13px",
                    fontFamily: "var(--primary-font)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FiCheckCircle
                    size={13}
                    color="#7e8a9a"
                    style={{ marginRight: "5px" }}
                  />
                  All reports have feedback
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  height: "60px",
                  overflowY: "auto",
                  paddingRight: "10px",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#353535",
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "var(--primary-color)",
                    cursor: "grab",
                    borderRadius: "10px",
                  },
                }}
              >
                {reportsWithoutFeedback.map((report) => (
                  <Typography
                    component={RouterLink}
                    to={`/dashboard/supervisor/report-details/${report.reportId}`}
                    key={report.reportId}
                    sx={{
                      fontSize: "10px",
                      color: "var(--secondary-color)",
                      borderRadius: "10px",
                      border: "1px solid #313030",
                      bgcolor: "#3636365b",
                      paddingY: "5px",
                      paddingX: "8px",
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "#8b8b8b",
                        color: "var(--navy-color)",
                      },
                      "&:hover .student_name": {
                        color: "var(--primary-color)",
                      },
                    }}
                  >
                    <Typography
                      className="student_name"
                      component={"span"}
                      sx={{
                        color: "#fff",
                        fontSize: "10px",
                        fontWeight: "500",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {report.reportCode}
                    </Typography>{" "}
                    • {report.studentName}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>

          {data?.items?.length > 0 && (
            <>
              <Box className="search" sx={{ paddingTop: "23px" }}>
                <UsersSearch search={search} setSearch={setSearch} />
              </Box>
            </>
          )}

          {paginatedData?.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "75vh",
              }}
            >
              <Box
                sx={{
                  marginTop: "50px",
                  textAlign: "center",
                  bgcolor: "#5959594e",
                  paddingY: "50px",
                  paddingX: { xs: "30px", sm: "90px" },
                  borderRadius: "15px",
                  boxShadow: "0 0 15px rgba(228, 1, 1, 0.22)",
                  fontFamily: "var(--primary-font)",
                  fontWeight: "500",
                  borderBottom: "5px solid var(--primary-color)"
                }}
              >
                <Box
                  component={BsFillExclamationOctagonFill}
                  sx={{
                    color: "red",
                    fontSize: "50px",

                    "@media (max-width:600px)": { fontSize: "40px" },
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
                  {search ? "No Results Found" : "No Feedbacks Found"}

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
                    ? `There is no feedback matching "${search}"`
                    : "You haven't added any feedback for your students yet."}
                </Typography>
              </Box>
            </Box>
          ) : (


            <Box sx={{ minHeight: "1073px" }}>
              <Grid container spacing={3}>

                {paginatedData.map((feedback) => (
                  <Grid item size={{ xs: 12, md: 6 }} key={feedback.id}>
                    <Box className="feedback_card"  >
                      <Box
                        component={"section"}
                        className="Supervisor_feedback"
                        sx={{
                          borderLeft: "5px solid red",
                          borderRadius: "10px",
                          bgcolor: "#3636365b",
                          padding: "11px",

                          transition: "all 0.5s ease",
                          "&:hover": { transform: "scale(1.03)" },
                        }}
                      >
                        <Box sx={{ display: "flex", paddingY: "10px" }}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              flexGrow: "1",
                            }}
                          >
                            <Typography
                              sx={{
                                color: "#fff",
                                flexGrow: "1",
                                fontFamily: "var(--primary-font)",
                                fontWeight: "600",
                                fontSize: "20px",
                                "@media (max-width:701px)": {
                                  fontSize: "17px"
                                }, "@media (max-width:400px)": {
                                  fontSize: "15px"
                                },
                              }}
                            >
                              {feedback.supervisorName}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                marginBottom: "18px",
                                "@media (max-width:410px)": {
                                  flexDirection: "column",
                                },
                              }}
                            >
                              <Box
                                className="student_info"
                                onClick={() =>
                                  navigate(
                                    `/dashboard/supervisor/report-details/${feedback.reportId}`,
                                  )
                                }
                                sx={{
                                  cursor: "pointer",
                                  display: "flex",
                                  "@media (max-width:718px)": {
                                    flexDirection: "column",
                                  },
                                }}
                              >
                                <Typography
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    color: "#758492",
                                    fontWeight: "400",
                                    fontSize: "13px",

                                    "@media (max-width:1120px)": {
                                      fontSize: "12px",
                                    }, "@media (min-width:1277px)": {
                                      paddingTop: "18px",
                                    }, "@media (max-width:1306px)": {
                                      paddingTop: "15px",
                                    }, "@media (max-width:1277px)": {
                                      paddingTop: "5px",
                                    }, "@media (max-width:550px)": {
                                      fontSize: "11px",
                                    }, "@media (max-width:1056px)": {
                                      flexDirection: "column",
                                      alignItems: "flex-start", paddingRight: "38px",
                                    }, "@media (max-width:899.6px)": {
                                      paddingTop: "16px"
                                    },
                                  }}
                                >
                                  Student: {feedback.studentName} · {feedback.predictionResult}{" "}
                                </Typography>


                              </Box>
                            </Box>
                          </Box>
                          <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Box
                              className="seen_unseen"
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: "8px",
                              }}
                            >
                              {feedback.isSeen ? (
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    color: "#e0e9e3",
                                    backgroundColor: "#01b413",
                                    paddingX: "18px",
                                    paddingY: "4px",
                                    borderRadius: "15px",
                                    marginBottom: "12px",
                                    fontWeight: "600",
                                    boxShadow: "0 0 15px rgba(7, 242, 15, 0.35)",
                                    "@media (max-width:1120px)": {
                                      fontSize: "10px",
                                    },
                                  }}
                                >
                                  Seen
                                </Typography>
                              ) : (
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    color: "#ffffff",
                                    boxShadow: "0 0 15px rgba(207, 25, 25, 0.5)",
                                    backgroundColor: "#ff0000b1",
                                    paddingX: "15px",
                                    paddingY: "4px",
                                    borderRadius: "15px",
                                    marginBottom: "12px",
                                    fontWeight: "600",
                                    "@media (max-width:1120px)": {
                                      fontSize: "10px",
                                    },
                                  }}
                                >
                                  Unseen
                                </Typography>
                              )}
                            </Box>

                            <Box
                              className="date_time_of_feedback"
                              sx={{
                                display: "flex",
                                "@media (max-width:418px)": {
                                  flexDirection: "column",
                                  alignItems: "flex-end",
                                }, "@media (max-width:1277px)": {
                                  display: "none"
                                }, "@media (max-width:899.6px)": {
                                  display: "flex"
                                }, "@media (max-width:578px)": {
                                  display: "none"
                                }
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "red",
                                  fontSize: "15px",
                                  "@media (max-width:550px)": {
                                    fontSize: "11px",
                                  }, "@media (max-width:1356px)": {
                                    fontSize: "14px",
                                  }, "@media (max-width:1306px)": {
                                    fontSize: "12px",
                                  }, "@media (max-width:900px)": {
                                    fontSize: "16px",
                                  }, "@media (max-width:701px)": {
                                    fontSize: "13px"
                                  },
                                }}
                              >
                                {" "}
                                {feedback.createdAt.split("T")[0]}
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#758492",
                                  paddingLeft: "6px",
                                  fontSize: "15px",
                                  "@media (max-width:550px)": {
                                    fontSize: "11px",
                                  }, "@media (max-width:1356px)": {
                                    fontSize: "14px",
                                  }, "@media (max-width:1306px)": {
                                    fontSize: "12px",
                                  }, "@media (max-width:900px)": {
                                    fontSize: "16px",
                                  }, "@media (max-width:701px)": {
                                    fontSize: "13px"
                                  },
                                }}
                              >
                                {" "}
                                {new Date(feedback.createdAt).toLocaleTimeString(
                                  "en-US",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  },
                                )}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>

                        <Typography
                          sx={{
                            color: "#d3d9de",
                            fontWeight: "300",
                            wordBreak: "break-word",
                            paddingRight: "10px",
                            height: "38px",
                            overflowY: "auto",
                            "&::-webkit-scrollbar": {
                              width: "6px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                              backgroundColor: "var(--primary-color)",
                              borderRadius: "3px",
                              cursor: "grab"
                            },
                            "&::-webkit-scrollbar-track": {
                              backgroundColor: "#2a2a3d",
                            }, "@media (max-width:701px)": {
                              fontSize: "15px"
                            }, "@media (max-width:400px)": {
                              fontSize: "14px"
                            },
                          }}
                        >
                          {feedback.comment}{" "}
                        </Typography>
                        <Box
                          className="date_time_of_feedback"
                          sx={{
                            display: "flex",
                            marginTop: "18px",
                            "@media (max-width:418px)": {
                              flexDirection: "column",
                              alignItems: "flex-end",
                            }, "@media (min-width:1277px)": {
                              display: "none"
                            }, "@media (max-width:899px)": {
                              display: "none"
                            }, "@media (max-width:899.6px)": {
                              display: "flex"
                            }
                          }}
                        >
                          <Typography
                            sx={{
                              color: "red",
                              "@media (max-width:550px)": {
                                fontSize: "11px",
                              }, "@media (max-width:1356px)": {
                                fontSize: "14px",
                              }, "@media (max-width:1306px)": {
                                fontSize: "12px",
                              }
                            }}
                          >
                            {" "}
                            {feedback.createdAt.split("T")[0]}
                          </Typography>
                          <Typography
                            sx={{
                              color: "#758492",
                              paddingLeft: "6px",
                              "@media (max-width:550px)": {
                                fontSize: "11px",
                              }, "@media (max-width:1356px)": {
                                fontSize: "14px",
                              }, "@media (max-width:1306px)": {
                                fontSize: "12px",
                              },
                            }}
                          >
                            {" "}
                            {new Date(feedback.createdAt).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              },
                            )}
                          </Typography>
                        </Box>

                        <Box
                          className="action_icons"
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            gap: "5px",
                            marginTop: "10px",
                          }}
                        >
                          <DeleteIcon
                            sx={{
                              color: "var(--primary-color)",
                              cursor: "pointer",
                              fontSize: "20px",
                            }}
                            onClick={() => handleDeleteFeedback(feedback.id)}
                          />
                          <FaRegEdit
                            size={16}
                            style={{
                              color: "var(--secondary-color)",
                              cursor: "pointer",
                            }}
                            onClick={() => handleChangeFeedback(feedback)}
                          />
                        </Box>
                        <BasicModal
                          open={open}
                          handleClose={handleClose}
                          reportId={selectedFeedback?.reportId}
                          feedback={selectedFeedback}
                          type="feedback"
                        />
                      </Box>
                    </Box>
                  </Grid>
                ))}

              </Grid>
            </Box>
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

export default SupervisorFeedback;