import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import useGetReportDetails from "../../../hooks/supervisorHooks/useGetReportDetails";
import DashboardNavbar from "../../../components/muiComponents/dashboardNavbar/DashboardNavbar";
import { LuBrain } from "react-icons/lu";
import { TbMessage2Question } from "react-icons/tb";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { FaFileDownload } from "react-icons/fa";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useGetPDF from "../../../hooks/supervisorHooks/useGetPDF";
import BasicModal from "../../../components/muiComponents/basicModal/BasicModal";
import { FaImage } from "react-icons/fa6";
import useGetFeedbackByReportId from "../../../hooks/supervisorHooks/useGetFeedbackByReportId";
import Loader from "../../../components/uiVerseComponents/loader/Loader";
import { toast } from "react-toastify";

function AddFeedback() {
  const { id } = useParams();
  const { isError, isLoading, error, data } = useGetReportDetails(id); //بعتله اي دي التقرير اللي بالرابط
  const {
    isError: isFeedbackError,
    isLoading: isFeedbackLoading,
    error: feedbackError,
    data: feedbackData,
  } = useGetFeedbackByReportId(id);
  console.log("report details:", data);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // عشان اتحكم بالسهم اللي عبوكس الاسئلة
  const [openModal, setOpenModal] = useState(false);
  const tumorProbabilitiesArray = data?.probabilities.map((p) => p.value) || [];
  const tumorProbability = Math.max(...tumorProbabilitiesArray);
  const percentage = parseFloat((tumorProbability * 100).toFixed(2));
  const { refetch, isFetching } = useGetPDF(id);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          bgcolor: "var(--navy-color)",
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <Loader />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        component={"section"}
        className="server_error_section flex_column"
        sx={{
          bgcolor: "var(--navy-color)",
          position: "absolute",
          inset: 0,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
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
    );
  }

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
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="flex-start">
          <Grid item size={{ md: 9 }}>
            {/*اول بوكسين */}
            <Box
              className="student-info_and_ai_prediction"
              sx={{ display: "flex", gap: "10px", marginBottom: "15px" }}
            >
              <Box
                className="student-info"
                sx={{
                  flex: 1,
                  border: "1px solid #57565662",
                  borderRadius: "15px",
                  bgcolor: "#15181e",
                  padding: "20px",
                  height: "160px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    paddingBottom: "20px",
                    borderBottom: "1px solid #57565662",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "var(--primary-color)",
                      fontSize: "22px",
                      width: 40,
                      height: 40,
                      boxShadow: "0 0 15px rgba(207, 25, 25, 0.51)",
                    }}
                  >
                    {data?.studentName?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box className="flex_column">
                    <Typography
                      sx={{
                        color: "#fff",
                        paddingLeft: "10px",
                        fontFamily: "var(--primary-font)",
                        fontWeight: "600",
                      }}
                    >
                      {data?.studentName}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#7e8a9a",
                        fontSize: "10px",
                        paddingLeft: "10px",
                      }}
                    >
                      {data?.studentEmail}
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex_column" sx={{ paddingTop: "10px" }}>
                  <Typography sx={{ color: "#7e8a9a", fontSize: "13px" }}>
                    Submitted at:
                  </Typography>
                  <Typography sx={{ color: "#fff", fontSize: "14px" }}>
                    {data?.submittedAt.split("T")[0]}
                  </Typography>
                </Box>
              </Box>
              <Box
                className="ai_prediction"
                sx={{
                  flex: 1,
                  border: "1px solid #57565662",
                  borderRadius: "15px",
                  bgcolor: "#15181e",
                  paddingX: "20px",
                  paddingTop: "20px",
                  paddingBottom: "24px",
                  height: "160px",
                }}
              >
                <Box
                  component={"span"}
                  sx={{
                    display: "flex",
                    paddingBottom: "20px",
                    alignItems: "center",
                  }}
                >
                  <LuBrain size={"20"} color="#ff0000" />
                  <Typography
                    sx={{
                      color: "#ffffff",
                      fontWeight: "600",
                      marginLeft: "10px",
                      fontFamily: "var(--primary-font)",
                    }}
                  >
                    AI Prediction
                  </Typography>
                </Box>
                <Box
                  className="prediction_details"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "var(--primary-color)",
                      bgcolor: "#291a1f",
                      paddingY: "5px",
                      paddingX: "10px",
                      borderRadius: "15px",
                      display: "inline-flex",
                      marginTop: "10px",
                    }}
                  >
                    {data?.predictionResult}
                  </Typography>

                  <Box
                    sx={{
                      height: "70px",
                      width: "70px",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--primary-color)",
                      bgcolor: "#291a1f",
                      border: "2px solid #ff000065",
                      borderRadius: "50%",
                      display: "inline-flex",
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontFamily: "var(--primary-font)",
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                      {percentage}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/*ببوكس الصورة  */}
            <Box
              className="img_container"
              sx={{
                border: "1px solid #57565662",
                borderRadius: "15px",
                bgcolor: "#15181e",
                paddingX: "30px",
                paddingY: "25px",
              }}
            >
              <Box
                component={"span"}
                sx={{ display: "flex", color: "#7e8a9a" }}
              >
                <FaImage size={22} color="#ff0000" />
                <Typography
                  sx={{
                    color: "#7e8a9a",
                    fontSize: "17px",
                    fontWeight: "500",
                    paddingLeft: "10px",
                    paddingBottom: "15px",
                    fontFamily: "var(--primary-font)",
                  }}
                >
                  MRI Image Preview
                </Typography>
              </Box>
              <Box
                className="mri"
                sx={{
                  borderRadius: "20px",
                  bgcolor: "#15181e",
                  height: "400px",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <img
                  src={data?.mriImageUrl}
                  alt="MRI Image"
                  style={{ borderRadius: "20px", height: "100%" }}
                />
              </Box>
            </Box>

            {/*ببوكس الاسئلة  */}
            <Box
              className="questions"
              sx={{
                bgcolor: "#181b21",
                borderRadius: "8px",
                p: 2,
                mb: 2,
                cursor: "pointer",
                marginTop: "15px",
                marginBottom: "50px",
              }}
              onClick={() => setOpen(!open)}
            >
              <Box sx={{ display: "flex" }}>
                <Box
                  component={"span"}
                  sx={{
                    display: "flex",
                    color: "#7e8a9a",
                    marginBottom: "10px",
                    flexGrow: "1",
                    paddingLeft: "17px",
                  }}
                >
                  <TbMessage2Question size={22} color="#ff0000" />
                  <Typography
                    sx={{
                      color: "#7e8a9a",
                      fontSize: "17px",
                      fontWeight: "500",
                      paddingLeft: "10px",
                      fontFamily: "var(--primary-font)",
                    }}
                  >
                    Student Answers
                  </Typography>
                </Box>

                <Box sx={{ color: "#fff" }} size="small">
                  {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </Box>
              </Box>
              {open && (
                <Box
                  className="student_answer"
                  sx={{
                    bgcolor: "15181e",
                    borderRadius: "15px",
                    padding: "20px",
                  }}
                >
                  {data?.answers.map((question, index) => (
                    <Box
                      className="questions_and_answers"
                      sx={{
                        bgcolor: "#24272d6a",
                        borderRadius: "20px",
                        marginBottom: "10px",
                        padding: "20px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#da2828",
                          paddingBottom: "7px",
                          fontFamily: "var(--primary-font)",
                        }}
                      >
                        Q{index + 1}: {question.question}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#fff",
                          paddingBottom: "10px",
                          borderBottom: "1px solid #57565662",
                          textTransform: "capitalize",
                          fontFamily: "var(--primary-font)",
                        }}
                      >
                        {question.answerValue
                          ? question.answerValue
                          : "No answer provided"}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Grid>

          {/*ببوكس اللي عاليمين  */}
          <Grid item size={{ md: 3 }}>
            <Box className="right_side">
              <Box
                className="actions flex_column"
                sx={{
                  gap: "10px",
                  border: "1px solid #57565662",
                  borderRadius: "15px",
                  bgcolor: "#15181e",
                  paddingX: "10px",
                  paddingY: "25px",
                  marginBottom: "10px",
                }}
              >
                <Typography
                  sx={{
                    color: "#da2828",
                    paddingBottom: "10px",
                    fontWeight: "600",
                    paddingLeft: "9px",
                    fontFamily: "var(--primary-font)",
                  }}
                >
                  Quick Actions
                </Typography>
                <Button
                  disabled={isFetching}
                  onClick={async () => {
                    const result = await refetch();

                    if (result.isError) {
                      toast.error("Failed to load PDF");
                      return;
                    }

                    if (result.data) {
                      const url = window.URL.createObjectURL(result.data);
                      window.open(url, "_blank");
                    }
                  }}
                  sx={{
                    bgcolor: "#0e1115",
                    color: "#f0f2f5",
                    display: "flex",
                    gap: "10px",
                    borderRadius: "10px",
                    border: "1px solid rgb(37, 41, 49)",
                    justifyContent: "flex-start",
                    paddingX: "50px",
                    whiteSpace: "nowrap",
                    "&:hover": { backgroundColor: "#ff0000" },
                    "&.Mui-disabled": {
                      color: "#999",
                      bgcolor: "#1a1d23",
                    },
                  }}
                >
                  <FaFileDownload />
                  Open PDF Report
                </Button>
                <Button
                  sx={{
                    bgcolor: "#0e1115",
                    color: "#f0f2f5",
                    display: "flex",
                    gap: "10px",
                    border: "1px solid rgb(37, 41, 49)",
                    borderRadius: "10px",
                    justifyContent: "flex-start",
                    paddingX: "50px",
                    whiteSpace: "nowrap",
                    "&:hover": { backgroundColor: "#ff0000" },
                  }}
                >
                  <BiSolidCommentDetail />
                  View Feedback
                </Button>
                <Button
                  sx={{
                    bgcolor: "#0e1115",
                    color: "#f0f2f5",
                    display: "flex",
                    gap: "10px",
                    borderRadius: "10px",
                    border: "1px solid rgb(37, 41, 49)",
                    justifyContent: "flex-start",
                    paddingX: "50px",
                    whiteSpace: "nowrap",
                    "&:hover": { backgroundColor: "#ff0000" },
                  }}
                  onClick={handleOpen} //للمودال
                >
                  <FaPlus />
                  Add Feedback
                </Button>
                <Button
                  onClick={() =>
                    navigate("/dashboard/supervisor/students-reports")
                  }
                  sx={{
                    bgcolor: "#0e1115",
                    color: "#f0f2f5",
                    display: "flex",
                    gap: "10px",
                    borderRadius: "10px",
                    border: "1px solid rgb(37, 41, 49)",
                    justifyContent: "flex-start",
                    paddingX: "50px",
                    whiteSpace: "nowrap",
                    "&:hover": { backgroundColor: "#ff0000" },
                  }}
                >
                  <FaArrowLeftLong />
                  Back to Reports
                </Button>
              </Box>

              <BasicModal
                open={openModal}
                handleClose={handleClose}
                reportId={id}
                type="feedback"
              />
              <Box
                className="flex_column"
                sx={{
                  border: "1px solid #57565662",
                  borderRadius: "15px",
                  bgcolor: "#15181e",
                  paddingX: "20px",
                  paddingY: "25px",
                }}
              >
                <Typography
                  sx={{
                    color: "#da2828",
                    paddingBottom: "10px",
                    fontWeight: "600",
                    fontFamily: "var(--primary-font)",
                  }}
                >
                  Report Summary
                </Typography>
                <Typography sx={{ color: "#7e8a9a", fontSize: "13px" }}>
                  Submitted
                </Typography>
                <Typography
                  sx={{
                    color: "#ffffff",
                    fontSize: "11px",
                    paddingBottom: "10px",
                  }}
                >
                  {data?.submittedAt.split("T")[0]}
                </Typography>
                <Typography sx={{ color: "#7e8a9a", fontSize: "13px" }}>
                  Report ID
                </Typography>
                <Typography
                  sx={{
                    color: "#ffffff",
                    fontSize: "11px",
                    paddingBottom: "10px",
                  }}
                >{`REP-${data?.reportId.slice(0, 6)}`}</Typography>
                <Typography sx={{ color: "#7e8a9a", fontSize: "13px" }}>
                  Case ID
                </Typography>
                <Typography
                  sx={{
                    color: "#ffffff",
                    fontSize: "11px",
                    paddingBottom: "10px",
                  }}
                >{`CASE-${data?.caseId?.slice(0, 6)}`}</Typography>
              </Box>
              <Box
                className="feedback_details"
                sx={{
                  border: "1px solid #57565662",
                  borderRadius: "15px",
                  bgcolor: "#15181e",
                  paddingX: "10px",
                  paddingY: "25px",
                  marginTop: "10px",
                }}
              >
                <Typography
                  sx={{
                    color: "#da2828",
                    paddingBottom: "10px",
                    fontWeight: "600",
                    paddingLeft: "9px",
                    fontFamily: "var(--primary-font)",
                  }}
                >
                  Feedback
                </Typography>

                {isFeedbackLoading ? (
                  <Typography
                    sx={{
                      color: "#7e8a9a",
                      fontSize: "13px",
                      paddingLeft: "9px",
                    }}
                  >
                    Loading...
                  </Typography>
                ) : isFeedbackError ? (
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      paddingLeft: "9px",
                    }}
                  >
                    {feedbackError?.message}
                  </Typography>
                ) : feedbackData && feedbackData.comment ? (
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: "13px",
                      paddingLeft: "9px",
                    }}
                  >
                    <Box
                      sx={{
                        maxHeight: "120px",
                        overflowY: "auto",
                        paddingLeft: "9px",
                        paddingRight: "5px",
                        "&::-webkit-scrollbar": {
                          width: "6px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          bgcolor: "#ff0000",
                          borderRadius: "3px",
                        },
                        "&::-webkit-scrollbar-track": {
                          bgcolor: "#2a2a3d",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#fff",
                          fontSize: "13px",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {feedbackData.comment}
                      </Typography>
                    </Box>
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      color: "#7e8a9a",
                      fontSize: "13px",
                      paddingLeft: "9px",
                    }}
                  >
                    No feedback yet.
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/*footer */}
        <Box
          sx={{
            borderTop: "1px solid rgba(53, 53, 53, 0.93)",
            textAlign: "center",
            py: 3,
          }}
        >
          <Typography sx={{ color: "var(--mid-gray-color)" }}>
            © 2026{" "}
            <span style={{ color: "var(--dark-red-color)" }}>Brainova</span>.
            All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default AddFeedback;