import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import useGetAllMyCases from '../../../hooks/studentHooks/useGetAllMyCases';
import { FaImage } from "react-icons/fa6";

function MyCases() {
    const{isError,isLoading,error,data}=useGetAllMyCases();
    console.log('data5:',data);
    const totalReports = data?.items.length || 0;
    const digits = Math.max(3, String(totalReports).length); //لكتابة اي دي التقرير
    const reportsWithNumbers = data?.items?.map((item, index) => ({
    ...item,
    reportNumber: `RPT-${String(index + 1).padStart(digits, "0")}`,
    simpleNumber: String(index + 1),
  }));
  return (
    <Box className='section' sx={{hight:'100vh',bgcolor:'var(--navy-color)',paddingTop:'70px'}}>
      <Container maxWidth='lg'>
        <Grid container spacing={3}>
          {data?.items?.map((item , index) => (
            <Grid item size={{md:4}}>
              <Box  className='student_case flex_column' sx={{bgcolor:'#1f1f1f',padding:'20px',borderRadius:'15px',border:'1px solid #525252a8',gap:'5px',"&:hover": {
                            boxShadow: "0 0 15px rgba(207, 25, 25, 0.51)",
                          },}}>
                            
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

              </Box>
            </Grid>
            ))}
        </Grid>
      </Container>



      
    </Box>
  )
}

export default MyCases