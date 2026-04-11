import { Box, Container, Grid, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import useGetAllMyCases from '../../../hooks/studentHooks/useGetAllMyCases';
import { LuNotebookPen } from "react-icons/lu";
import Loader from '../../../components/uiVerseComponents/loader/Loader';
import useGetSupervisorFeedbackByReportid from '../../../hooks/studentHooks/useGetSupervisorFeedbackByReportid.js';
import { IoMdClose } from "react-icons/io";

  function FeedbackCommet({ Id, isReviewed }) {

    if (!isReviewed) {
  return (
    <Typography sx={{ color: '#797979', fontSize: '13px' }}>
      No feedback yet
    </Typography>
  );
}
  const { isError,isLoading,error, data: feedback } = useGetSupervisorFeedbackByReportid(Id); 
 const [open, setOpen] = useState(false); //عشان نسكر ونفتح المودال
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
    <Typography onClick={()=> setOpen(true)} sx={{ color: '#e01313', fontSize: '13px' ,cursor:'pointer',paddingTop:'5px'}}>
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
      width: 600,
      bgcolor: "#0a0a0a",
      color: "#fff",
      borderRadius: "15px",
      border:'1px solid #35353568',
      boxShadow: 24,
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
        <Grid container spacing={2}>
          {data?.items?.map((item , index) => (
            
            <Grid item size={{md:4}} key={item.caseId}>
              <Box  className='student_case flex_column' sx={{bgcolor:'#1f1f1f',padding:'20px',borderRadius:'15px',border:'1px solid #525252a8',gap:'5px',}}>
                            
                <Box className='img_container' sx={{height:'300px',bgcolor:'#000000',border:'1px solid #525252a8',borderRadius:'15px',padding:'30px',display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'20px'}}> {/*بوكس الصورة */}
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

              <Box className='prediction' sx={{display:'flex',justifyContent:'space-between'}}>  {/*بوكس البريديكشين */}
                 <Typography sx={{color:'#797979',fontSize:'13px',fontWeight:'500'}}>Prediction</Typography>
                  <Typography sx={{color:'#fff',fontSize:'13px',fontWeight:'500'}}>{item.predictionResult}</Typography>
              </Box>

               <Box className='submittedAt' sx={{display:'flex',justifyContent:'space-between'}}>  {/*بوكس تاريخ التسليم  */}
                 <Typography sx={{color:'#797979',fontSize:'13px',fontWeight:'500'}}>Submitted</Typography>
                  <Typography sx={{color:'#797979',fontSize:'13px',fontWeight:'500'}}>{item.reportSubmittedAt.split("T")[0]}</Typography>
              </Box>
               
               

              <Box className='feedback flex_column' sx={{borderTop:'1px solid #4f4f4f75' ,gap:'5px',padding:'4px'}}>
                  <Box sx={{display:'flex' ,alignItems:'center',gap:'5px',paddingTop:'4px'}}>
                    <LuNotebookPen color='#c21313'/>
                    <Typography sx={{color:'#fff'}}>Feedback</Typography>
                  </Box>
                  
                  <FeedbackCommet Id={item?.reportId} isReviewed={item?.isReviewed} />

              </Box>
              </Box>
            </Grid>
            ))}
        </Grid>
      </Container>



      
    </Box>
  )
}

export default MyCases