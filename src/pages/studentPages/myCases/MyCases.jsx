import { Box, Button, Container, Grid, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useGetAllMyCases from '../../../hooks/studentHooks/useGetAllMyCases';
import { LuNotebookPen } from "react-icons/lu";
import Loader from '../../../components/uiVerseComponents/loader/Loader';
import useGetSupervisorFeedbackByReportid from '../../../hooks/studentHooks/useGetSupervisorFeedbackByReportid.js';
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';
import useGetStudentPdf from '../../../hooks/studentHooks/useGetStudentPdf.js';
import { LuDownload } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa";
import useDownloadStudentPDF from '../../../hooks/studentHooks/useDownloadStudentPDF.js';
import Pagination from '@mui/material/Pagination';
import useMarksAsSeen from '../../../hooks/studentHooks/useMarksAsSeen.js';


  function FeedbackCommet({ Id, isReviewed ,feedbackId}) {
 const [open, setOpen] = useState(false); //عشان نسكر ونفتح المودال
  
  const { markAsSeen, serverErrors, isLoading: isMarkSeenLoading } = useMarksAsSeen(); //؟

  const handleOpen = async () => { // عشان نفتح المودال ونعمل مارك از سيين 
    setOpen(true);
     const result = await markAsSeen(feedbackId);
  };

    if (!isReviewed) {
  return (
    <Box>
    <Typography sx={{ color: '#797979', fontSize: '13px' }}>
      No feedback yet
    </Typography>
     <Typography onClick={handleOpen} sx={{ color: '#e01313', fontSize: '13px' ,cursor:'pointer',paddingTop:'5px'}}>
    Read more
  </Typography>
   <Modal  open={open} onClose={() => setOpen(false)}  slotProps={{
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
      border:'1px solid #35353568',
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
    <Box className='modal_title' sx={{display:'flex',justifyContent:'space-between'}}>
     <Box sx={{display:'flex' ,alignItems:'center',gap:'5px',paddingTop:'4px',paddingBottom:'10px'}}>
         <LuNotebookPen size={25} color='#c21313'/>
         <Typography sx={{color:'#fff',fontSize:'20px',fontWeight:'500',letterSpacing: "1px",paddingLeft:'10px',fontSize: { xs: "17px", sm: "20px"}}}>Feedback </Typography>
      </Box>
        <IoMdClose size={20}  onClick={() => setOpen(false)} style={{cursor:'pointer'}}/>
     </Box>
    <Typography sx={{ color: "var(--secondary-color)", fontSize: { xs: "13px", sm: "17px"} }}>
           No feedback yet
    </Typography>
  </Box>
</Modal>
    </Box>
  );
}
  const { isError,isLoading,error, data: feedback } = useGetSupervisorFeedbackByReportid(Id); 
  console.log("feedbackkkk:",feedback);
   if (isLoading) {
    return <Typography sx={{ color: '#797979' }}>Loading...</Typography>;
  }
  if (isError) {
    return <Typography sx={{ color: 'red' }}>Error loading feedback</Typography>;
  }
  return (
    <Box>
    <Typography sx={{ color: '#797979', fontSize: '13px' ,WebkitLineClamp: 1,  display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden',}}>
      {feedback?.comment || "No feedback yet"}
    </Typography>
    <Typography onClick={handleOpen} sx={{ color: '#e01313', fontSize: '13px' ,cursor:'pointer',paddingTop:'5px'}}>
    Read more
  </Typography>

  <Modal  open={open} onClose={() => setOpen(false)}  slotProps={{
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
      border:'1px solid #35353568',
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
    <Box className='modal_title' sx={{display:'flex',justifyContent:'space-between'}}>
     <Box sx={{display:'flex' ,alignItems:'center',gap:'5px',paddingTop:'4px',paddingBottom:'10px'}}>
         <LuNotebookPen size={25} color='#c21313'/>
         <Typography sx={{color:'#fff',fontSize:'20px',fontWeight:'500',letterSpacing: "1px",paddingLeft:'10px'}}>Feedback </Typography>
      </Box>
        <IoMdClose size={20}  onClick={() => setOpen(false)} style={{cursor:'pointer'}}/>
     </Box>
    <Typography sx={{ color: "#797979" }}>
      {feedback?.comment}
    </Typography>
  </Box>
</Modal>
  </Box>
  );
}
function MyCases() {
    const{isError,isLoading,error,data}=useGetAllMyCases();
    console.log('data5:',data);
    const totalReports = data?.items.length || 0;
    const digits = Math.max(3, String(totalReports).length); //لكتابة اي دي التقرير
    
    const [selectedId, setSelectedId] = useState(null); // حتى ابعت اي دي كل تقرير لهوك البي دي اف
    const { refetch, isFetching } = useGetStudentPdf(selectedId); 
    const downloadMutation = useDownloadStudentPDF();
  

  const [page, setPage] = useState(1);//رقم الصفحة الحالي بالبداية خليته 1
  const itemsPerPage = 6;//عدد العناصر اللي بدي تنعرض بكل صفحة كم ؟ 

  const paginatedData = data?.items?.slice( // قسمت البيانات حسب الصفحة الجديدة عشان اعرف ايش رح اعرض   array.slice(start, end)
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  
  const totalPages = Math.ceil((data?.items?.length || 0) / itemsPerPage); // عشان احسب عدد الصفحات الجديدة مثلا 20 عنصر /6=3.33 استعملت من مكتبة ماث سيل عشان اجبر اللي بعد الفاصلة العشرية وافتحلهن صفحة 


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

  return (
    <Box className='section' sx={{hight:'100vh',bgcolor:'var(--navy-color)',paddingTop:'70px',flex: 1,  minHeight: '100vh',}}>
      <Container maxWidth='lg'>
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
                left: "80px",
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
            <Box className="section_titel" sx={{marginBottom:'20px'}}>
            <Typography
              component={"h1"}
              variant="h4"
              sx={{
                color: "#fff",
                fontFamily: "var(--primary-font)",
                fontWeight: "600",
                display: "inline-block",
                marginRight: "10px",
                paddingTop:{xs:"30px",md:"0px"},
                paddingLeft:{xs:"13px",md:"0px"},
                "@media (max-width:700px)": {
                  fontSize: "22px",
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
               {data?.items.length}
              </Typography>{" "}
              cases found
            </Typography>
          </Box>
          
        <Grid container spacing={2}>
          {paginatedData?.map((item , index) => (
            
            <Grid item size={{md:4}} key={item.caseId}>
              <Box  className='student_case flex_column' sx={{bgcolor:'#1f1f1f',padding:'15px',borderRadius:'15px',border:'1px solid #525252a8',gap:'5px', transition:'all 0.4s', "&:hover": {
                           border:"1px solid #ff00009f",
                            boxShadow: "0 0 30px rgba(207, 25, 25, 0.48)",
                          },}}>
                          
                <Box className='img_container' sx={{height:'250px',bgcolor:'#000000',border:'1px solid #525252a8',borderRadius:'15px',padding:'30px',display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'5px'}}> {/*بوكس الصورة */}
                  <img src={item.imageUrl} style={{height:'100%',width:'100%',  objectFit: 'contain'}}/>
                </Box>

              <Box className='predictedAt' sx={{display:'flex',justifyContent:'space-between'}}>  {/*بوكس ا ذا في فييدباك   */}
                  <Typography sx={{color:'#ffffff',fontSize:'13px',fontWeight:'500'}}>{`RPT-${String(index + 1).padStart(digits, "0")}`}</Typography>

                {item?.isReviewed ?  (   <Typography
                                          sx={{
                                            width: "fit-content",
                                            paddingX: "14px",
                                            paddingY: "5px",
                                            borderRadius: "20px",
                                            backgroundColor: "#183222",
                                            color: "#24c86b",
                                            fontSize: "13px",
                                            fontWeight:'600',
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
                                            backgroundColor: "#13212f",
                                            color: "#2a74be",
                                            fontSize: "13px",
                                            fontWeight:'600',
                                            display: "flex",
                                            whiteSpace: "nowrap",
                                          }}
                                        >
                                          No Feedback
                                        </Typography>
                                      )}
              </Box>

              <Box className='prediction' sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>  {/*بوكس البريديكشين */}
                 <Typography sx={{color:'#797979',fontSize:'13px',fontWeight:'500'}}>Prediction</Typography>
                   <Typography
                                          sx={{
                                            fontSize: "13px",
                                            paddingY: "3px",
                                            paddingX: "10px",
                                            borderRadius: "15px",
                                            display: "inline-flex",
                                            bgcolor:"rgb(51, 26, 32)",
                                            color:"rgb(196, 36, 38)"
                                          }}
                                        >
                                          ● {item?.predictionResult}
                   </Typography>
              </Box>

               <Box className='submittedAt' sx={{display:'flex',justifyContent:'space-between'}}>  {/*بوكس تاريخ التسليم  */}
                 <Typography sx={{color:'#797979',fontSize:'13px',fontWeight:'500'}}>Submitted</Typography>
                  <Typography sx={{color:'#797979',fontSize:'13px',fontWeight:'500'}}>{item.reportSubmittedAt.split("T")[0]}</Typography>
              </Box>
               
              <Box className='feedback flex_column' sx={{borderTop:'1px solid #4f4f4f75', borderBottom:'1px solid #4f4f4f75',gap:'5px',padding:'4px'}}>
                  <Box sx={{display:'flex' ,alignItems:'center',gap:'5px',paddingTop:'4px'}}>
                    <LuNotebookPen color='#c21313'/>
                    <Typography sx={{color:'#fff'}}>Feedback</Typography>
                  </Box>
                  
                  <FeedbackCommet Id={item?.reportId} isReviewed={item?.isReviewed} feedbackId={item?.feedbackId} />

              </Box>

                <Box className='pdf' sx={{display:'flex',gap:"10px",marginTop:'5px',justifyContent:'center',width:'100%'}}>
                    <Button
                    disabled={isFetching} //عشان مانضل نكبس عالزر اكثر من مرة وهو لسا بحمل بالملف
                    onClick={() => setSelectedId(item.reportId)}
                    sx={{
                      flex: 1,
                      bgcolor: "#0e1115",
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
                        width:'50%'
                      },
                    }}
                  > <Box sx={{ alignItems: 'center', display: 'flex' }}>
                      <FaRegEye size={15} style={{ flexShrink: 0 }} />
                    </Box>
                    <Typography sx={{ fontSize: { xs: "14px", md: "11px", lg: "14px" }, justifyContent: "flex-start", display: 'flex' ,textTransform: "capitalize"}}> Open PDF </Typography>
                  </Button>
                  

                  <Button   onClick={() => downloadMutation.mutate(item.reportId)}
                   sx={{
                      flex: 1,
                      width:'50%',
                      bgcolor: "#0e1115",
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
                    }}> 
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                      <LuDownload size={15} style={{ flexShrink: 0 }} />
                    </Box>
                    <Typography sx={{ fontSize: { xs: "14px", md: "11px", lg: "14px" ,textTransform: "capitalize"}, justifyContent: "flex-start", display: 'flex' }}> Download PDF </Typography></Button>
               </Box>

              </Box>
            </Grid>
            ))}
        </Grid>

        <Box className="pagination" sx={{ display: "flex", justifyContent: "center", marginTop: "30px",padding:"20px" }}>
          <Pagination
            count={totalPages} // عدد الصفحات وهن الارقام اللي مبينات بالباجينيشن 
            page={page} // الصفحة الحالية
            onChange={(event, value) => setPage(value)} //  تغيير الصفحة لما نكبس عالباجينيشن جيب رقمها وحطها بسيت البيج عشان نرجع نعيد الموضوع من الاول للصفحة الجديدة
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#fff",
                borderRadius:'10px',
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
  )
}

export default MyCases