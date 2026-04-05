import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import DashboardNavbar from '../../../components/muiComponents/dashboardNavbar/DashboardNavbar'
import Loader from '../../../components/uiVerseComponents/loader/Loader';
import useGetMyallFeedbacks from '../../../hooks/supervisorHooks/useGetMyallFeedbacks';


function SupervisorFeedback() {

    const{isError, error, isLoading, data}=useGetMyallFeedbacks();
console.log('my feedbacks:', data);

  if (isError) {
    //server errors
    return (
      <Box
        component={"section"}
        className="server_error_section flex_column"
        sx={{
          bgcolor: "var(--navy-color)",
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Typography
          component={"h1"}
          variant="h5"
          sx={{ color: "white", fontWeight: "700", textAlign: "center" }}
        >
          {error?.message}
        </Typography>
      </Box>
    );
  }
     
    
  return (
   <Box  sx={{bgcolor: 'var(--navy-color)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
   
   <DashboardNavbar/>
  <Container maxWidth='lg'>
     {isError && (
            <Box
        component={"section"}
        className="server_error_section flex_column"
        sx={{
          bgcolor:"var(--navy-color)",
          position: "absolute",
          inset: 0,
          top:"90px",
          left:"200px",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          "@media (max-width:899px)": {
                left:"0px",
        }}}
      >
        <Typography
          component={"h1"}
          variant="h5"
          sx={{ color: "white", fontWeight: "700", textAlign: "center","@media (max-width:456px)": {
                fontSize:"20px",
        }}}
        >
          {error?.message}
        </Typography>
      </Box>
          )}
          {isLoading && (
            <Box
              sx={{
                bgcolor:"var(--navy-color)",
                position: "absolute",
                inset: 0,
                top:"90px",
                left:"200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
                "@media (max-width:899px)": {
                left:"0px",
            }
              }}
            >
              <Loader />
            </Box>
          )}

  
  
    <Grid container >

        <Box className='section_titel' sx={{marginBottom:'30px',}}>
          <Typography component={"h1"} variant="h4" sx={{color:"#fff",fontFamily:"var(--primary-font)",fontWeight:"600",display:"inline",marginRight:"10px" ,"@media (max-width:700px)" :{ fontSize:"22px"}}}>Feedback</Typography>
          <Typography component={'span'} sx={{color:"#fff",fontFamily:"var(--primary-font)",fontSize:"20px","@media (max-width:700px)" :{fontSize:"15px"}}}>
            <Typography component={'span'} sx={{color:"var(--primary-color)",fontFamily:"var(--primary-font)"}}>{data?.totalCount}</Typography> feedback entries</Typography>
        </Box>

        
            {data?.items?.map((feedback)=>(
                <Grid item size={{xs:12}} key={feedback.id}>

        <Box component={'section'} className='Supervisor_feedback' sx={{borderLeft:'5px solid red',borderRadius:'10px',bgcolor:'#3636365b',padding:'20px',marginBottom:'30px', transition: 'all 0.5s ease', '&:hover': { transform: 'scale(1.03)'},}} >

        <Box className='supervisor_feedback-info' sx={{display:'flex',paddingBottom:'5px'}}>
        <Typography sx={{color:'#fff',flexGrow:'1'}}>{feedback.supervisorName}</Typography>
        <Typography sx={{color:'red'}}> {feedback.createdAt.split("T")[0]}</Typography>
        <Typography sx={{color:'#758492',paddingLeft:'6px',
                "@media (max-width:425px)": {
              display:'none'
            }}}> {feedback.createdAt.split("T")[1].split(".")[0]}</Typography>
        </Box>

        <Box className='student_info' sx={{display:'flex',marginBottom:'18px', "@media (max-width:410px)": { flexDirection: 'column'}}}>
            <Typography sx={{color:'#758492',fontWeight:'400',fontSize:'13px'}}>Student: {feedback.studentName} ·</Typography>
           <Box sx={{display:'flex'}}>
            <Typography sx={{color:'#758492',fontWeight:'400',fontSize:'13px',paddingX:'5px',"@media (max-width:410px)": { paddingLeft:"0px"}}}>{feedback.predictionResult} </Typography>
            <Typography sx={{color:'#758492',fontWeight:'400',fontSize:'13px'}}>· {feedback.reportCreatedAt.split("T")[0]}</Typography>
            </Box>
       </Box>

        <Typography sx={{color:'#d3d9de',fontWeight:"300"}}>{feedback.comment} </Typography>
    </Box>
    </Grid>
    ))}
    </Grid>
</Container>
{/*footer */}
     <Box
      sx={{
        borderTop: "1px solid rgba(53, 53, 53, 0.93)",
        textAlign: "center",
        py: 3
      }}
    >
      <Typography sx={{ color: "var(--mid-gray-color)" }}>
        © 2026{" "}
        <span style={{ color: "var(--dark-red-color)" }}>Brainova</span>
        . All rights reserved.
      </Typography>
    </Box>
  
   </Box>
  )
}

export default SupervisorFeedback