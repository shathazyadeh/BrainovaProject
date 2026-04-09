import React from 'react'

import { useNavigate, useParams } from 'react-router-dom';
import useGetAllOfMyStudentsCases from '../../../hooks/supervisorHooks/useGetAllOfMyStudnetsCases';
import { Avatar, Box, Button, Container, Grid, Typography } from '@mui/material';
import DashboardNavbar from '../../../components/muiComponents/dashboardNavbar/DashboardNavbar';
import { Link as RouterLink } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import useDownloadPDF from "../../../hooks/supervisorHooks/useDownloadPDF";
import { BsFileEarmarkArrowDown } from "react-icons/bs";
function StudentReports() {
  const {studentId}=useParams();
  const navigate=useNavigate();
  const { isError, error, isLoading, data } = useGetAllOfMyStudentsCases(studentId);
  console.log("dataaaaaa:",data);
   const downloadMutation = useDownloadPDF();
  const total = data?.items?.length || 0;
const digits = Math.max(3, String(total).length); //لكتابة اي دي التقرير 
console.log("digit:",digits);// كم اكبر عدد ديجيت ممكن اوصله في كتابة رقم التقرير
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
          <Box
            component={"section"}
            sx={{
              paddingBottom: "50px",
              flexGrow: 1,
              alignItems: "flex-start",
              display: "block",
              minHeight: "100vh",
            }}
          >
            <Container maxWidth="lg">
            <Box sx={{display:'flex',justifyContent: "space-between",marginBottom:'30px',alignItems:'center'}} >
              <Box className='student_info'>
                   <Box
                  sx={{
                    display: "flex",
                    paddingBottom: "20px",
                    alignItems: "center",
                  }}
                >
                  <FaArrowLeft color='#fff' size={25} style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard/supervisor/students")}/>
                  <Avatar
                    sx={{
                      marginLeft:'15px',
                      bgcolor: "var(--primary-color)",
                      fontSize: "22px",
                      width: 50,
                      height: 50,
                      boxShadow: "0 0 15px rgba(207, 25, 25, 0.51)",
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
                        fontSize:'23px',
                        whiteSpace: { md: "nowrap" }
                      }}
                    >
                      {data?.items?.[0]?.studentName || ""}
                    </Typography>
                    
                  </Box>
                </Box>
              </Box>
              <Box className="numbers" sx={{display:'flex',gap:'10px'}}>
                <Box className='total_reports' sx={{border: "1px solid #57565662",borderRadius: "15px",bgcolor:'#181b21',padding:'15px',}}>
                  <Box sx={{display:'flex',alignItems:'center',gap:'10px'}}>
                      <FaFileAlt size={17} color='#fa0202'/>
                  <Typography sx={{color:'#7e8a9a',fontFamily: "var(--primary-font)",}}>Total Reports</Typography>
                 </Box>
                   <Typography sx={{color:'#fff',fontWeight:'600',fontSize:'20px'}}>1</Typography>
                </Box>
                <Box className='reviewed_reports' sx={{border: "1px solid #57565662",borderRadius: "15px",bgcolor:'#181b21',padding:'15px',}}>
                  <Box sx={{display:'flex',alignItems:'center',gap:'10px',paddingX:'9px'}}>
                      <FaArrowTrendUp size={18} color='#02fa13'/>
                  <Typography sx={{color:'#7e8a9a',fontFamily: "var(--primary-font)",}}>Reviewed </Typography>
                 </Box>
                   <Typography sx={{color:'#fff',fontWeight:'600',fontSize:'20px',paddingLeft:'8px'}}>1</Typography>
                </Box> 
              </Box>
           </Box>
              <Grid container spacing={2}>
                {data?.items.map((report,index)=>
                 <Grid item size={{xs:12,sm:6,md:4}}>
                      <Box className="report" sx={{bgcolor:'#15181e',padding:'25px',border: "1px solid #ff01013b",borderRadius: "15px",}}>
                        <Box className='report_details'>
                          <Typography sx={{color:'#fff',fontWeight:'500',fontSize:'15px',marginBottom:'10px',fontFamily: "var(--primary-font)",}}>{`RPT-${String(index + 1).padStart(digits, "0")}`}</Typography>
                          <Typography sx={{color:'#7e8a9a',fontWeight:'400',fontSize:'13px',fontFamily: "var(--primary-font)",}}>{`CASE-${report?.caseId?.slice(0, 6)}`}</Typography>
                          <Typography sx={{color:'#7e8a9a',fontWeight:'400',fontSize:'11px',paddingTop:'3px',fontFamily: "var(--primary-font)",}}>{report.reportSubmittedAt.split("T")[0]}</Typography>
                        </Box>
                       <Box className="ai_predict_details" sx={{border: "1px solid #57565662",borderRadius: "15px",bgcolor:'#181b21',paddingX:'10px',marginTop:'15px',paddingY:'13px'}}>
                        <Typography sx={{color:"#7e8a9a",fontWeight:'500',fontSize:'13px',fontFamily: "var(--primary-font)",}}>AI Prediction</Typography>
                           <Typography  sx={{fontSize: "15px",paddingY: "5px",paddingX: "14px",borderRadius: "15px",display: "inline-flex", marginTop: "10px",
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
                                     }}>
                                ● {report?.predictionResult}
                            </Typography>
                       </Box>
                        <Box className='feedback' sx={{marginTop:'15px',borderBottom:'1px solid #3434348e',paddingBottom:'15px',display:'flex',justifyContent: "space-between",alignItems:'center'}}>
                          <Typography sx={{color:"#7e8a9a",fontWeight:'400',fontSize:'13px',fontFamily: "var(--primary-font)",}}>Feedback</Typography>
                          {report.isReviewed? (
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
                               ) :(
                                  <Typography
                                      sx={{
                                        width: "fit-content",
                                        paddingX: "10px",
                                        paddingY: "5px",
                                        borderRadius: "20px",
                                        backgroundColor: "#23272f",
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
                        <Box className="view_details" sx={{display:'flex',gap:'10px',alignItems:'center'}}>
                           <Button component={RouterLink} to={`/dashboard/supervisor/report-details/${report.reportId}`}
                               sx={{
                                 borderRadius: "15px",
                                   bgcolor: "#6f6e6e3b",
                                   color: "#ffffff",
                                   paddingX: "30px",
                                   textAlign: "center",
                                   width: "100%",
                                   marginTop: "10px",
                                   fontSize: "12px",
                                   textTransform: "none",
                                   display:'flex',
                                   gap:"10px",
                                   "&:hover": {
                                     bgcolor: " #ff00009f",
                                     boxShadow: "0 0 15px rgba(207, 25, 25, 0.51)",
                                   },
                                 }}
                               >
                                    <IoMdEye size={20}/>
                                  View Reports
                             </Button>
                             <BsFileEarmarkArrowDown size={20} color='#fff' style={{ cursor: "pointer" }} onClick={() => downloadMutation.mutate(report.reportId)}/>
                        </Box>
                      </Box>
                    
                  </Grid>
                )}
                 
              </Grid>


            </Container>
      </Box>






{/*footer */}
  <Box
        className="lower_footer"
        sx={{
          borderTop: "1px solid rgba(53, 53, 53, 0.93)",
          width: "fit-content",
          margin: "auto",
          paddingX: { xs: "0px", md: "200px" },
          textAlign: "center",
          marginTop: { xs: "60px", md: "0px" },
        }}
      >
        <Typography
          component={"p"}
          sx={{ color: "var(--mid-gray-color)", paddingY: "30px" }}
        >
          © 2026{" "}
          <Typography
            component={"span"}
            sx={{ color: "var(--dark-red-color)" }}
          >
            Brainova
          </Typography>
          . All rights reserved. | Built for medical education and research
          purposes.
        </Typography>
      </Box>

    </Box>
  )
}

export default StudentReports