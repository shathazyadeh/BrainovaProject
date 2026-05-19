import { Box, Button, Container, Grid, Modal, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import useGetAllMyCases from '../../../hooks/studentHooks/useGetAllMyCases';
import { LuNotebookPen } from "react-icons/lu";
import Loader from '../../../components/uiVerseComponents/loader/Loader';
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';
import useGetStudentPdf from '../../../hooks/studentHooks/useGetStudentPdf.js';
import { LuDownload } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import useDownloadStudentPDF from '../../../hooks/studentHooks/useDownloadStudentPDF.js';
import Pagination from '@mui/material/Pagination';
import useMarksAsSeen from '../../../hooks/studentHooks/useMarksAsSeen.js';
import { FiFilter } from "react-icons/fi";
import style from './MyCases.module.css';
import { TbReportSearch } from "react-icons/tb";
import ErrorState from '../../../components/requestStates/error/errorState/ErrorState.jsx';
import LoadingState from '../../../components/requestStates/loading/loadingState/LoadingState.jsx';
import useGetAllFeedbacks from '../../../hooks/studentHooks/useGetAllFeedbacks.js';

function FeedbackCommet({feedback , isReviewed, feedbackId,getAllFeedbacksLoading,getAllFeedbacksIsError, }) {
  const [open, setOpen] = useState(false); //عشان نسكر ونفتح المودال
  const { markAsSeen, serverErrors, isLoading: isMarkSeenLoading } = useMarksAsSeen();

  const handleOpen = async () => { // عشان نفتح المودال ونعمل مارك از سيين 
    setOpen(true);
    if (feedbackId) {
      await markAsSeen(feedbackId);
    }
  };
if (getAllFeedbacksLoading) { return <Typography sx={{ color: "var(--secondary-color)" ,fontSize:"14px"}}>Loading...</Typography>; } 
if (getAllFeedbacksIsError) { return <Typography sx={{ color: 'var(--primary-color)',fontSize:"13px" }}>Error loading feedback</Typography>; }
  if (!isReviewed) {
    return (
      <Box>
        <Typography sx={{ color: "var(--secondary-color)", fontSize: '13px', whiteSpace: "nowrap", }}>
          No feedback yet
        </Typography>
        <Typography onClick={handleOpen} sx={{ color: '#e01313', fontSize: '13px', cursor: 'pointer', paddingTop: '5px' }}>
          Read more
        </Typography>
        <Modal open={open} onClose={() => setOpen(false)} slotProps={{
          backdrop: {
            sx: {
              backdropFilter: "blur(5px)",
              backgroundColor: "rgba(0,0,0,0.5)",

            },
          },
        }}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: "600px",
              bgcolor: "#0a0a0a",
              color: "#fff",
              borderRadius: "15px",
              border: '1px solid #35353568',
              p: 3,
              boxShadow: "0 0 15px rgba(207, 25, 25, 0.81)",
              outline: "none",
              "&:focus": {
                outline: "none",
              },
              "&:focus-visible": {
                outline: "none",
              },

            }}
          >
            <Box className='modal_title' sx={{ display: 'flex', justifyContent: 'space-between'}}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', paddingTop: '4px', paddingBottom: '10px' }}>
                <LuNotebookPen size={25} color='#c21313' />
                <Typography sx={{ color: '#fff', fontWeight: '500', letterSpacing: "1px", paddingLeft: '10px', fontSize: { xs: "17px", sm: "20px" } }}>Feedback </Typography>
              </Box>
              <IoMdClose size={20} onClick={() => setOpen(false)} style={{ cursor: 'pointer' }} />
            </Box>
            <Typography sx={{ color: "var(--secondary-color)", fontSize: { xs: "13px", sm: "17px" } }}>
              No feedback yet
            </Typography>
          </Box>
        </Modal>
      </Box>
    );
  }

  return (
    <Box>
      <Typography sx={{ color: "var(--secondary-color)", fontSize: '13px', WebkitLineClamp: 1, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', wordBreak: 'break-all', maxWidth: '100px', }}>
        {feedback?.comment || "No feedback yet"}
      </Typography>
      <Typography onClick={handleOpen} sx={{ color: '#e01313', fontSize: '13px', cursor: 'pointer', paddingTop: '5px' }}>
        Read more
      </Typography>

      <Modal open={open} onClose={() => setOpen(false)} slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0,0,0,0.5)",

          },
        },
      }}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "600px",
            bgcolor: "#0a0a0a",
            color: "#fff",
            borderRadius: "15px",
            border: '1px solid #35353568',
            p: 3,
            boxShadow: "0 0 15px rgba(207, 25, 25, 0.81)",
            outline: "none",
            "&:focus": {
              outline: "none",
            },
            "&:focus-visible": {
              outline: "none",
            },

          }}
        >
          <Box className='modal_title' sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', paddingTop: '4px', paddingBottom: '10px' }}>
              <LuNotebookPen size={25} color='#c21313' />
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: { xs: "17px", sm: "20px" },
                  fontWeight: "500",
                  letterSpacing: "1px",
                  paddingLeft: "10px",
                }}
              >
                {feedback?.supervisorName}
              </Typography>
            </Box>
            <IoMdClose size={20} onClick={() => setOpen(false)} style={{ cursor: 'pointer' }} />
          </Box>
          <Typography sx={{
            color: "var(--secondary-color)", fontSize: { xs: "13px", sm: "17px" }, maxHeight: "100px",
            overflowY: "auto",
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
            wordBreak: "break-word",
            pr: 1,
            "&::-webkit-scrollbar": {
              width: "6px",
            },

            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#c21313",
              borderRadius: "10px",
              cursor: "grab"
            },
          }}>
            {feedback?.comment}
          </Typography>
          <Typography
            sx={{
              color: "var(--primary-color)",
              fontSize: "10px",
              fontWeight: "400",
              marginTop: "20px",
            }}
          >

            {feedback?.createdAt.split("T")[0]}
            {" ( "}
            {new Date(feedback?.createdAt).toLocaleTimeString(
              "en-US",
              {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              },
            )}{" "}
            {")"}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}
function MyCases() {
  const { isError, isLoading, error, data } = useGetAllMyCases();
  console.log("dataaaa555:",data);
  const downloadMutation = useDownloadStudentPDF();
  const { isError:getAllFeedbacksIsError, isLoading:getAllFeedbacksLoading, error:getAllFeedbacksError, data: allFeedbacks }=useGetAllFeedbacks();
  console.log("shatha:",allFeedbacks);
//هون 2
   
  const feedbackMap = useMemo(() => { //يوز ميمو عشان الماب تنعمل مرة وحدة ومش كل مرة يتعمل ري ريندر الصفحة ترجع تبني ماب من جديد 
  const map = {}; //اوبجيكت فاضي

  allFeedbacks?.items?.forEach((fb) => {  // لفينا ع العناصر وخزنا بالماب ال اف بي بكون فيه الريبورت اي دي والكومنت 
    map[fb.reportId] = fb;
  });

  return map;
}, [allFeedbacks]);
  
   
  const totalCases = data?.items?.length || 0;
  const reviewedCount = data?.items?.filter(item => item.isReviewed)?.length || 0;
  const noFeedbackCount = data?.items?.filter(item => !item.isReviewed)?.length || 0;
  
  const [filter, setFilter] = useState("all");//للفلترة
  const [selectedId, setSelectedId] = useState(null); // حتى ابعت اي دي كل تقرير لهوك البي دي اف
  
  const { refetch, isFetching } = useGetStudentPdf(selectedId);

  const filteredData = data?.items?.filter((item) => {   //للفلترة
    if (filter === "all") return true;

    if (filter === "noFeedback") {
      return !item.isReviewed;
    }

    if (filter === "reviewed") {
      return item.isReviewed;
    }

    return true;
  });

  const [page, setPage] = useState(1);//رقم الصفحة الحالي بالبداية خليته 1
  const itemsPerPage = 8;//عدد العناصر اللي بدي تنعرض بكل صفحة كم ؟ 
  const paginatedData = filteredData?.slice( // قسمت البيانات حسب الصفحة الجديدة عشان اعرف ايش رح اعرض   array.slice(start, end)
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage); // عشان احسب عدد الصفحات الجديدة مثلا 20 عنصر /6=3.33 استعملت من مكتبة ماث سيل عشان اجبر اللي بعد الفاصلة العشرية وافتحلهن صفحة 

  useEffect(() => {//اول ما السيت سيليكتيد اي دي يتغير بتشتغل اليوز فيتش
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

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState error={error} />;

  return (
    <Box
      className="section"
      sx={{
        bgcolor: "var(--navy-color)",
        paddingTop: { md: "40px", xs: "20px" },
        flex: 1,
        position: "relative",
        minHeight: "70vh",
      }}
    >
      <Container maxWidth="lg">
        <Box
          className={style.section_titel}
          sx={{
            marginBottom: "40px",
            paddingX: "50px",
            paddingY: "80px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            boxShadow: "0 0 30px rgba(207, 25, 25, 0.2)",
          }}
        >
          <Box>
            <Typography
              component={"h1"}
              variant="h4"
              sx={{
                paddingLeft: "15px",
                fontSize: "50px",
                whiteSpace: "nowrap",
                color: "#fff",
                fontFamily: "var(--primary-font)",
                fontWeight: "600",
                display: "inline-block",
                marginRight: "10px",
                paddingTop: { xs: "30px", md: "0px" },
                "@media (max-width:700px)": {
                  fontSize: "45px",
                },
                "@media (max-width:450px)": {
                  fontSize: "30px",
                },
              }}
            >
              My Cases
            </Typography>
            <Typography
              component={"span"}
              sx={{
                color: "#fff",
                fontFamily: "var(--primary-font)",
                fontSize: "20px",
                whiteSpace: "nowrap",

                "@media (max-width:700px)": {
                  fontSize: "15px",
                },
              }}
            >
              <Typography
                component={"span"}
                sx={{
                  color: "var(--primary-color)",
                  fontFamily: "var(--primary-font)",
                }}
              >
                {data?.items?.length || 0}
              </Typography>{" "}
              cases found
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "10px", sm: "16px", md: "18px" },
                color: "var(--secondary-color)",
                paddingLeft: "15px",
                paddingBottom: "10px",
                marginTop: "10px",
                letterSpacing: "2px",
                fontWeight: "500",
              }}
            >
              Track your submitted analyses, predictions, and supervisor
              feedback
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                borderTop: "1px solid #55555585",
                paddingTop: "20px",
                "@media (max-width:544px)": {
                  flexWrap: "wrap",
                  gap: "10px",
                },
              }}
            >
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  bgcolor: "#66656549",
                  color: "#fa0000",
                  border: "1px solid #777575a8",
                  fontWeight: "500",
                  paddingX: "15px",
                  paddingY: "5px",
                  borderRadius: "10px",
                  boxShadow: "0 0 15px rgba(65, 63, 63, 0.46)",
                  fontSize: { xs: "13px", sm: "16px", md: "18px" },
                  transition: "0.3s all",
                  "&:hover": {
                    color: "#fff",
                    bgcolor: "#fa0000",
                  },
                }}
              >
                ● Total Cases: {totalCases}
              </Typography>

              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  fontSize: { xs: "13px", sm: "16px", md: "18px" },
                  bgcolor: "#66656549",
                  color: "#e0c13a",
                  border: "1px solid #777575a8",
                  fontWeight: "500",
                  paddingX: "15px",
                  paddingY: "5px",
                  borderRadius: "10px",
                  boxShadow: "0 0 15px rgba(65, 63, 63, 0.46)",
                  transition: "0.3s all",
                  "&:hover": {
                    color: "#fff",
                    bgcolor: "#e0c13a",
                  },
                }}
              >
                ● No Feedback: {noFeedbackCount}
              </Typography>

              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  fontSize: { xs: "13px", sm: "16px", md: "18px" },
                  bgcolor: "#66656549",
                  color: "#24b362",
                  border: "1px solid #777575a8",
                  fontWeight: "500",
                  paddingX: "15px",
                  paddingY: "5px",
                  borderRadius: "10px",
                  boxShadow: "0 0 15px rgba(65, 63, 63, 0.46)",
                  transition: "0.3s all",
                  "&:hover": {
                    color: "#fff",
                    bgcolor: "#24b362",
                  },
                  "@media (max-width:544px)": {
                    alignSelf: "center",
                    textAlign: "center",
                  },
                }}
              >
                ● Reviewed: {reviewedCount}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          className="filter"
          sx={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            alignItems: "center",
          }}
        >
          <FiFilter
            size={20}
            style={{ flexShrink: 0 }}
            color="var(--secondary-color)"
          />

          {["all", "noFeedback", "reviewed"].map(
            (
              item, // للفلترة
            ) => (
              <Button
                key={item}
                onClick={() => setFilter(item)}
                sx={{
                  borderRadius: "20px",
                  paddingX: "20px",
                  whiteSpace: "nowrap",
                  textTransform: "capitalize",
                  fontSize: { xs: "11px", sm: "14px" },
                  backgroundColor: filter === item ? "#ff0000" : "#1f1f1f",
                  color: filter === item ? "#fff" : "var(--secondary-color)",
                  "&:hover": {
                    backgroundColor: filter === item ? "#ff0000" : "#333",
                  },
                }}
              >
                {item === "all"
                  ? "All" // حتى نعرض بالبوتون
                  : item === "noFeedback"
                    ? "No Feedback"
                    : "Reviewed"}
              </Button>
            ),
          )}
        </Box>

        <Box
          sx={{
            minHeight: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: paginatedData?.length === 0 ? "center" : "space-between",
          }}
        >
          <Grid container spacing={2}>
            {!paginatedData || paginatedData?.length === 0 ? (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  className="flex_column"
                  sx={{
                    marginY: { xs: "20px", md: "45PX" },
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "50px 20px",
                    textAlign: "center",
                    gap: "10px",
                  }}
                >
                  <Box>
                    <TbReportSearch
                      size={110}
                      color={"var(--secondary-color)"}
                    />
                  </Box>

                  <Typography
                    sx={{
                      fontSize: { xs: "22px", md: "30px" },
                      color: "var(--primary-color)",
                      fontWeight: "600",
                      fontFamily: "var(--primary-font)",
                    }}
                  >
                    No cases found
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: { xs: "15px", md: "20px" },
                      color: "var(--secondary-color)",
                      opacity: 0.7,
                      fontFamily: "var(--primary-font)",
                    }}
                  >
                    {filter === "noFeedback"
                      ? "Your cases are pending supervisor feedback."
                      : filter === "reviewed"
                        ? "No reviewed cases yet, your submitted cases are awaiting supervisor feedback."
                        : "You haven't submitted any cases yet."}
                  </Typography>
                </Box>
              </Box>
            ) : (
              paginatedData?.map((item) => (
                <Grid item size={{ lg: 6, xs: 12, sm: 6 }} key={item.caseId}>
                  <Box
                    className="student_case flex_column"
                    sx={{
                      bgcolor: "#1f1f1f",
                      borderRadius: "15px",
                      padding: "10px",
                      border: "1px solid #525252a8",
                      gap: "5px",
                      transition: "all 0.4s",
                      "&:hover": {
                        border: "1px solid #ff00009f",
                        boxShadow: "0 0 30px rgba(207, 25, 25, 0.48)",
                      },
                      "@media (min-width:1024px)": {
                        flexDirection: "row",
                        gap: "15px",
                        alignItems: "center",
                        justifyContent: "space-between",
                      },
                    }}
                  >
                    <Box
                      className="img_container"
                      sx={{
                        bgcolor:"#000",
                        width: 80,
                        height: 70,
                        flexShrink: 0,
                        "@media (max-width:1023px)": {
                          height: "250px",
                          width: "auto",
                          bgcolor: "var(--navy-color)",
                          borderRadius: "15px",
                          padding: "30px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "5px",
                        },
                      }}
                    >
                      {" "}
                      {/*بوكس الصورة */}
                      <Box
                        component={"img"}
                        src={item.imageUrl}
                        alt="Brain MRI scan"
                        sx={{
                          height: "100%",
                          width: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>

                    <Box
                      className="card_details"
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box
                        className="left_side flex_column "
                        sx={{
                          gap: "5px",
                          "@media (min-width:1024px)": {
                            alignItems: "flex-start",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            marginLeft: "14px",
                            color: "#ffffff",
                            fontSize: "13px",
                            fontWeight: "500",
                            "@media (min-width:1024px)": { display: "none" },
                          }}
                        >
                          {item.reportCode}
                        </Typography>
                        <Typography
                          sx={{
                            marginLeft: "14px",
                            color: "var(--secondary-color)",
                            fontSize: "13px",
                            fontWeight: "500",
                            "@media (min-width:1024px)": { display: "none" },
                          }}
                        >
                          Prediction
                        </Typography>
                        <Typography
                          sx={{
                            marginLeft: "14px",
                            color: "var(--secondary-color)",
                            fontSize: "13px",
                            fontWeight: "500",
                            "@media (min-width:1024px)": { display: "none" },
                          }}
                        >
                          Submitted
                        </Typography>
                      </Box>
                      <Box
                        className="right_side flex_column "
                        sx={{ gap: "5PX" }}
                      >
                        <Typography
                          sx={{
                            color: "#ffffff",
                            fontSize: "14px",
                            fontWeight: "500",
                            whiteSpace: "nowrap",
                            "@media (max-width:1023px)": { display: "none" },
                          }}
                        >
                          {item.reportCode}
                        </Typography>

                        {item?.isReviewed ? (
                          <Typography
                            sx={{
                              width: "fit-content",
                              color: "#24b362",
                              fontSize: "12px",
                              fontWeight: "600",
                              display: "flex",
                              whiteSpace: "nowrap",
                              "@media (max-width:1023px)": {
                                paddingX: "14px",
                                paddingY: "5px",
                                borderRadius: "20px",
                                backgroundColor: "#183222",
                              },
                            }}
                          >
                            Submitted
                          </Typography>
                        ) : (
                          <Typography
                            sx={{
                              width: "fit-content",
                              color: "#bebe2a",
                              fontSize: "12px",
                              fontWeight: "600",
                              display: "flex",
                              whiteSpace: "nowrap",
                              "@media (max-width:1023px)": {
                                paddingX: "10px",
                                paddingY: "5px",
                                borderRadius: "20px",
                                backgroundColor: "#2d2f13",
                              },
                            }}
                          >
                            No Feedback
                          </Typography>
                        )}

                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: "500",
                            paddingRight: "31px",
                            display: "inline-flex",
                            color: "var(--secondary-color)",
                            "@media (max-width:1023px)": {
                              marginLeft: "5px",
                            },
                          }}
                        >
                          {item?.predictionResult}
                        </Typography>
                        <Typography
                          sx={{
                            color: "var(--secondary-color)",
                            fontSize: "12px",
                            fontWeight: "500",
                            paddingRight: "18px",
                            "@media (max-width:1023px)": {
                              marginLeft: "5px",
                            },
                          }}
                        >
                          {item.reportSubmittedAt.split("T")[0]}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      className="feedback flex_column"
                      sx={{
                        gap: "5px",
                        "@media (max-width:1023px)": {
                          borderTop: "1px solid #4f4f4f75",
                          padding: "4px",
                          marginLeft: "10px",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          "@media (max-width:1023px)": {
                            gap: "5px",
                            paddingTop: "4px",
                          },
                        }}
                      >
                        <LuNotebookPen color="#c21313" />
                        <Typography
                          sx={{
                            color: "#fff",
                            "@media (min-width:1024px)": {
                              marginLeft: "5px",
                            },
                          }}
                        >
                          Feedback
                        </Typography>
                      </Box>
                      <FeedbackCommet
                        feedback={feedbackMap[item.reportId]} // من الباجينيشن داتا بعتت الريبورت اي دي عشان اجيب الفييدباك تبعته 
                        isReviewed={item?.isReviewed}
                        feedbackId={item?.feedbackId}
                        getAllFeedbacksLoading={getAllFeedbacksLoading}
                        getAllFeedbacksIsError={getAllFeedbacksIsError}
                      />
                    </Box>

                    <Box
                      className="pdf flex_column"
                      sx={{
                        marginLeft: "15px",
                        justifyContent: "center",
                        gap: "10px",
                        marginTop: "5px",
                        "@media (max-width:1023px)": {
                          width: "100%",
                          marginLeft: "0px",
                          flexDirection: "row",
                        },
                      }}
                    >
                      <Button
                        disabled={isFetching} //عشان مانضل نكبس عالزر اكثر من مرة وهو لسا بحمل بالملف
                        onClick={() => setSelectedId(item.reportId)}
                        sx={{
                          "@media (max-width:1023px)": {
                            flex: 1,
                            paddingY: "10px",
                            width: "50%",
                            minWidth: "auto",
                          },

                          flex: 0,
                          minWidth: "auto",
                          paddingX: "20px",
                          paddingY: "5px",
                          bgcolor: "var(--primary-color)",
                          color: "#f0f2f5",
                          display: "flex",
                          gap: "5px",
                          justifyContent: "center",
                          textAlign: "center",
                          borderRadius: "10px",
                          border: "1px solid rgb(37, 41, 49)",
                          whiteSpace: "nowrap",
                          transition: "all .3s",
                          "&:hover": { backgroundColor: "#ff000067" },
                          "&.Mui-disabled": {
                            color: "#999",
                            bgcolor: "#1a1d23",
                          },
                        }}
                      >
                        {" "}
                        <Box sx={{ alignItems: "center", display: "flex" }}>
                          <MdOutlineRemoveRedEye
                            size={17}
                            style={{ flexShrink: 0 }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: { xs: "12px", md: "11px", lg: "14px" },
                            justifyContent: "flex-start",
                            display: "flex",
                            textTransform: "capitalize",
                            fontWeight: "500",
                          }}
                        >
                          {" "}
                          Open PDF{" "}
                        </Typography>
                      </Button>

                      <Button
                        onClick={() => downloadMutation.mutate(item.reportId)}
                        sx={{
                          "@media (max-width:1023px)": {
                            flex: 1,
                            width: "50%",
                            minWidth: "auto",
                            paddingY: "5px",
                          },
                          flex: "0",
                          minWidth: "auto",
                          paddingX: "8px",
                          paddingY: "5px",
                          bgcolor: "#ffffff",
                          color: "var(--navy-color)",
                          display: "flex",
                          gap: "5px",
                          justifyContent: "center",
                          textAlign: "center",
                          borderRadius: "10px",
                          border: "1px solid rgb(37, 41, 49)",
                          whiteSpace: "nowrap",
                          transition: "all .3s",
                          "&:hover": { backgroundColor: "#ffffffb0" },
                          "&.Mui-disabled": {
                            color: "#999",
                            bgcolor: "#1a1d23",
                          },
                        }}
                      >
                        <Box sx={{ alignItems: "center", display: "flex" }}>
                          <LuDownload size={15} style={{ flexShrink: 0 }} />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: { xs: "12px", md: "11px", lg: "14px" },
                            textTransform: "capitalize",
                            justifyContent: "flex-start",
                            display: "flex",
                            fontWeight: "500",
                          }}
                        >
                          {" "}
                          Download PDF{" "}
                        </Typography>
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
        <Box
          className="pagination"
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
            padding: "20px",
            paddingBottom: "80px",
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
      </Container>
    </Box>
  );
}

export default MyCases