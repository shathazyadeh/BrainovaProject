import { useRef, useState } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import { FaRegEdit } from "react-icons/fa";
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
import useDeleteFeedback from "../../../hooks/supervisorHooks/useDeleteFeedback";
import DashboardFooter from "../../../components/dashboardFooter/dashboardFooter";

function ReportDetails() {
  const { id } = useParams();
  const { isError, isLoading, error, data } = useGetReportDetails(id); //بعتله اي دي التقرير اللي بالرابط
  const { deleteFeedbackMutation } = useDeleteFeedback(id);
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
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const tumorProbabilitiesArray = data?.probabilities?.map((p) => p.value) || [];
  const tumorProbability = Math.max(...tumorProbabilitiesArray);
  const percentage = parseFloat((tumorProbability * 100).toFixed(2));
  const { refetch, isFetching } = useGetPDF(id);
  const feedbackRef = useRef(null); // عشان لما نكبس على البوتون فيو فيدابك ينزلني للفيدباك تحت
  const [highlight, setHighlight] = useState(false); // عشان الفيدباك يضوي لما ننزل عنده

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    setSelectedFeedback(null);
  };

  const handleDeleteFeedback = async (feedbackId) => {
    await deleteFeedbackMutation.mutateAsync(feedbackId);
  };

  const handleChangeFeedback = async (feedback) => {
    setOpenModal(true);
    setSelectedFeedback(feedback);
  };

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
      <Container maxWidth="lg">
        {isError && (
            <Box
              component={"section"}
              className="server_error_section flex_column"
              sx={{
                bgcolor: "var(--navy-color)",
                position: "absolute",
                inset: 0,
                top: "88px",
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
                top: "88px",
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
        <Grid container spacing={1.5} alignItems="flex-start">
          <Grid item size={{ xs: 12, md: 9 }}>
            {/*اول بوكسين */}
            <Box
              className="student-info_and_ai_prediction"
              sx={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap", paddingTop:{xs:"30px",md:"0px"},}}
            >
              <Box
                className="student-info"
                sx={{
                  flex: 1,
                  border: "1px solid #57565662",
                  borderRadius: "15px",
                  bgcolor: "#65656547",
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
                        whiteSpace: { md: "nowrap" }
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
                  <Typography sx={{ color: "#fff", fontSize: { xs: '12px', md: "14px" }, }}>
                    {data?.submittedAt.split("T")[0]}
                    <Typography component={'span'} sx={{color:"#7e8a9a",fontSize:"13px"}}>
                      {" ( "}
                      {new Date(data?.submittedAt).toLocaleTimeString('en-US', {
                         hour: '2-digit',
                         minute: '2-digit',
                         hour12: true,
                       })} {")"}
                    </Typography>
                  </Typography>
                </Box>
              </Box>
              <Box
                className="ai_prediction"
                sx={{
                  flex: 1,
                  border: "1px solid #57565662",
                  borderRadius: "15px",
                  bgcolor: "#65656547",
                  paddingX: "20px",
                  paddingTop: "20px",
                  paddingBottom: "24px",

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
                      "@media (max-width:979px)": {
                        height: '60px',
                        width: "60px",

                      }, "@media (max-width:895px)": {
                        height: '70px',
                        width: "70px",

                      }
                      , "@media (max-width:529px)": {
                        height: '60px',
                        width: "60px",
                      }
                      , "@media (max-width:429px)": {
                        height: '70px',
                        width: "70px",

                      },

                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontFamily: "var(--primary-font)",
                        fontWeight: "600",
                        "@media (max-width:979px)": {
                          fontSize: '14px'
                        }, "@media (max-width:529px)": {
                          fontSize: '14px'
                        }
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
                bgcolor: "#65656547",
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
                  bgcolor: "#040202",
                  height: "400px",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  "@media (max-width:4835px)": {
                    height: '350px'
                  }
                  , "@media (max-width:405px)": {
                    height: '260px'
                  },
                }}
              >
                <Box
                  component={"img"}
                  src={data?.mriImageUrl}
                  alt="Brain MRI scan"
                  style={{ borderRadius: "20px", height: "100%" }}
                />
              </Box>
            </Box>

            {/*ببوكس الاسئلة  */}
            <Box
              className="questions"
              sx={{
                bgcolor: "#65656547",
                border: "1px solid #57565662",
                borderRadius: "8px",
                p: 2,
                mb: 2,
                cursor: "pointer",
                marginTop: "15px",
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
                    <Box key={question.questionId}
                      className="questions_and_answers"
                      sx={{
                       bgcolor: "#49494957",
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
          <Grid item size={{ xs: 12, md: 3 }}>
            <Box className="right_side">
              <Box sx={{ display: { xs: "flex", md: "block", }, gap: "10px", alignItems: { xs: "flex-start", md: "normal" }, flexDirection: { xs: "column", sm: "row" }, }}> {/*هاد البوكس عشان يخليهن حد بعض في صفحة الmd */}
                <Box
                  className="actions flex_column"
                  sx={{
                    gap: "10px",
                    border: "1px solid #57565662",
                    borderRadius: "15px",
                    bgcolor: "#65656547",
                    paddingX: "7px",
                    paddingY: "25px",
                    marginBottom: "10px",
                    width: { xs: '100%', sm: '50%', md: '100%' },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#da2828",
                      paddingBottom: "10px",
                      fontWeight: "600",
                      paddingLeft: "9px",
                      fontFamily: "var(--primary-font)",
                      fontSize: { xs: "20px", md: "13px", lg: "15px" },
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
                      bgcolor: "#65656547",
                      color: "#f0f2f5",
                      display: "flex",
                      gap: '10px',
                      justifyContent: "center",
                      textAlign: "center",
                      borderRadius: "10px",
                      border: "1px solid rgb(37, 41, 49)",
                      whiteSpace: "nowrap",
                      "&:hover": { backgroundColor: "#ff0000" },
                      "&.Mui-disabled": {
                        color: "#999",
                        bgcolor: "#1a1d23",
                      },
                    }}
                  > <Box sx={{ alignItems: 'center', display: 'flex' }}>
                      <FaFileDownload size={15} style={{ flexShrink: 0 }} />
                    </Box>
                    <Typography sx={{ fontSize: { xs: "14px", md: "11px", lg: "14px" }, justifyContent: "flex-start", display: 'flex' }}> Open PDF Report</Typography>
                  </Button>
                  <Button
                    onClick={() => {
                      feedbackRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                      setHighlight(true);

                      setTimeout(() => {
                        setHighlight(false);
                      }, 1000);
                    }}
                    sx={{

                     bgcolor: "#65656547",
                      color: "#f0f2f5",
                      display: "flex",
                      gap: '10px',
                      justifyContent: "center",
                      textAlign: "center",
                      borderRadius: "10px",
                      border: "1px solid rgb(37, 41, 49)",
                      whiteSpace: "nowrap",
                      "&:hover": { backgroundColor: "#ff0000" },
                      "&.Mui-disabled": {
                        color: "#999",
                        bgcolor: "#1a1d23",
                      },
                    }}
                  > <Box sx={{ alignItems: 'center', display: 'flex' }}>
                      <BiSolidCommentDetail size={15} style={{ flexShrink: 0 }} />
                    </Box>
                    <Typography sx={{ minWidth: { xs: '120px', md: '96px', lg: "120px" }, fontSize: { xs: "14px", md: "11px", lg: "14px" }, justifyContent: "flex-start", display: 'flex' }}> View Feedback</Typography>

                  </Button>
                  <Button
                    sx={{

                      bgcolor: "#65656547",
                      color: "#f0f2f5",
                      display: "flex",
                      gap: '10px',
                      justifyContent: "center",
                      textAlign: "center",
                      borderRadius: "10px",
                      border: "1px solid rgb(37, 41, 49)",
                      whiteSpace: "nowrap",
                      "&:hover": { backgroundColor: "#ff0000" },
                      "&.Mui-disabled": {
                        color: "#999",
                        bgcolor: "#1a1d23",
                      },
                    }}
                    onClick={handleOpen} //للمودال
                  > <Box sx={{ alignItems: 'center', display: 'flex' }}>
                      <FaPlus size={15} style={{ flexShrink: 0 }} />
                    </Box>
                    <Typography sx={{ minWidth: { xs: '120px', md: '96px', lg: "120px" }, fontSize: { xs: "14px", md: "11px", lg: "14px" }, justifyContent: "flex-start", display: 'flex' }}> ADD Feedback</Typography>

                  </Button>
                  <Button
                    onClick={() =>
                      navigate("/dashboard/supervisor/students-reports")
                    }
                    sx={{

                      bgcolor: "#65656547",
                      color: "#f0f2f5",
                      display: "flex",
                      gap: '10px',
                      justifyContent: "center",
                      textAlign: "center",
                      borderRadius: "10px",
                      border: "1px solid rgb(37, 41, 49)",
                      whiteSpace: "nowrap",
                      "&:hover": { backgroundColor: "#ff0000" },
                      "&.Mui-disabled": {
                        color: "#999",
                        bgcolor: "#1a1d23",
                      },
                    }}
                  >  <Box sx={{ alignItems: 'center', display: 'flex' }}>
                      <FaArrowLeftLong size={15} style={{ flexShrink: 0 }} />
                    </Box>
                    <Typography sx={{ minWidth: { xs: '10px', md: '96px', lg: "10px" }, fontSize: { xs: "14px", md: "11px", lg: "14px" }, justifyContent: "flex-start", display: 'flex' }}> Back to Reports</Typography>

                  </Button>
                </Box>


                <Box
                  className="flex_column"
                  sx={{
                    border: "1px solid #57565662",
                    borderRadius: "15px",
                    bgcolor: "#65656547",
                    paddingX: "18px",
                    paddingTop: "25px",
                    paddingBottom: { xs: '30px', sm: '40px', md: '25px' },
                    width: { xs: '100%', sm: '50%', md: '100%' },
                    textAlign: { xs: 'center', md: 'left' },
                    marginBottom: "10px",

                  }}
                >
                  <Typography
                    sx={{
                      color: "#da2828",
                      paddingBottom: "10px",
                      fontWeight: "600",
                      fontFamily: "var(--primary-font)",
                      whiteSpace: { md: "nowrap" },
                      fontSize: { xs: "20px", md: "13px", lg: "15px" },
                      marginBottom: '19px'
                    }}
                  >
                    Report Summary
                  </Typography>
                  <Typography sx={{ color: "#7e8a9a", fontSize: { xs: "15px", md: "13px" }, }}>
                    Submitted
                  </Typography>
                  <Typography
                    sx={{
                      color: "#ffffff",
                      fontSize: "11px",
                      paddingBottom: "10px",
                      whiteSpace:"nowrap"
                    }}
                  >
                    {data?.submittedAt.split("T")[0]}
                    <Typography component={'span'} sx={{fontSize:"11px"}}>
                      {" ( "}
                      {new Date(data?.submittedAt).toLocaleTimeString('en-US', {
                         hour: '2-digit',
                         minute: '2-digit',
                         hour12: true,
                       })} {")"}
                    </Typography>
                  </Typography>
                  <Typography sx={{ color: "#7e8a9a", fontSize: { xs: "15px", md: "13px" }, }}>
                    Report ID
                  </Typography>
                  <Typography
                    sx={{
                      color: "#ffffff",
                      fontSize: "11px",
                      paddingBottom: "10px",
                    }}
                  >{data?.reportCode}</Typography>
                  <Typography sx={{ color: "#7e8a9a", fontSize: { xs: "15px", md: "13px" }, }}>
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
              </Box>
              <BasicModal
                open={openModal}
                handleClose={handleClose}
                reportId={id}
                type="feedback"
                feedback={selectedFeedback}
              />
              <Box
                className="feedback_details"
                ref={feedbackRef}
                sx={{
                  border: "1px solid #57565662",
                  borderRadius: "15px",
                  bgcolor: "#65656547",
                  paddingX: "10px",
                  paddingY: "25px",
                  marginTop: "10px",
                  boxShadow: highlight
                    ? "0 0 10px var(--primary-color)"
                    : "none",
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
                ) : isFeedbackError &&
                  feedbackError?.message !==
                  "Request failed with status code 404" ? (
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
                  <Box
                    sx={{
                      color: "#fff",
                      fontSize: "13px",
                      paddingLeft: "9px",
                    }}
                  >
                    <Box
                      sx={{
                        height: "53px",
                        overflowY: "auto",
                        paddingLeft: "9px",
                        paddingRight: "5px",
                        wordBreak: "break-word",
                        "&::-webkit-scrollbar": {
                          width: "6px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          bgcolor: "var(--primary-color)",
                          borderRadius: "3px",
                          cursor: "grab",
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
                    <Box
                    className="action_icons"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: "5px",
                      marginY:"10px"
                    }}
                  >
                    <DeleteIcon
                      sx={{ color: "var(--primary-color)", cursor: "pointer", fontSize:"20px" }}
                      onClick={() => handleDeleteFeedback(feedbackData?.id)}
                    />
                    <FaRegEdit
                      size={16}
                      style={{
                        color: "var(--secondary-color)",
                        cursor: "pointer",
                      }}
                      onClick={() => handleChangeFeedback(feedbackData)}
                    />
                  </Box>
                  </Box>
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

     <DashboardFooter/>
      </Container>
    </Box>
  );
}

export default ReportDetails;