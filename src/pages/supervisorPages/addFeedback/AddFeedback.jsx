import React, { useState } from 'react'
import useSubmitFeedback from '../../../hooks/supervisorHooks/useSubmitFeedback';
import { useParams, useLocation } from "react-router-dom";
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import useGetAllOfMyStudnetsCases from '../../../hooks/supervisorHooks/useGetAllOfMyStudnetsCases';
import useGetReportDetails from '../../../hooks/supervisorHooks/useGetReportDetails';
import DashboardNavbar from '../../../components/muiComponents/dashboardNavbar/DashboardNavbar';
import { LuBrain } from "react-icons/lu";
import { CiImageOn } from "react-icons/ci";
import { TbMessage2Question } from "react-icons/tb";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { FaFileDownload } from "react-icons/fa";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useGetPDF from '../../../hooks/supervisorHooks/useGetPDF';

function AddFeedback() {
    const { SubmitFeedbackMutation } = useSubmitFeedback();
    const { id } = useParams();
    const { isError, isLoading, error, data } = useGetReportDetails(id);//بعتله اي دي التقرير اللي بالرابط 
    console.log('report details:', data);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);// عشان اتحكم بالسهم اللي عبوكس الاسئلة 
    const {isError:pdfIsError,isLoading:pdfLoading,error:pdfError,data:pdf}=useGetPDF(id);





    return (
        <Box sx={{ bgcolor: "var(--navy-color)", minHeight: "100vh", display: "flex", flexDirection: "column", }} >
            <DashboardNavbar />
            <Container maxWidth='lg'>
                <Grid container spacing={3} alignItems="flex-start">
                    <Grid item size={{ md: 9 }} >
                        {/*اول بوكسين */}
                        <Box className='student-info_and_ai_prediction' sx={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                            <Box className='student-info' sx={{ flex: 1, border: '1px solid #57565662', borderRadius: '15px', bgcolor: '#15181e', padding: '20px', height: '160px' }}>

                                <Box sx={{ display: 'flex', paddingBottom: '20px', borderBottom: '1px solid #57565662', alignItems: "center", }}>
                                    <Avatar sx={{ bgcolor: "red", fontSize: "22px", width: 40, height: 40, }}>{data?.studentName?.charAt(0).toUpperCase()}</Avatar>
                                    <Typography sx={{ color: '#fff', paddingLeft: '10px' }}>{data?.studentName}</Typography>
                                </Box>
                                <Box className='flex_column' sx={{ paddingTop: '10px' }}>
                                    <Typography sx={{ color: '#7e8a9a' }}>submittedAt:</Typography>
                                    <Typography sx={{ color: '#fff' }}>{data?.submittedAt.split("T")[0]}</Typography>
                                </Box>


                            </Box>
                            <Box className='ai_prediction' sx={{ flex: 1, border: '1px solid #57565662', borderRadius: '15px', bgcolor: '#15181e', paddingX: '20px', paddingTop: '20px', paddingBottom: '24px', height: '160px' }}>
                                <Box component={"span"} sx={{ display: 'flex', paddingBottom: '20px', borderBottom: '1px solid #57565662', alignItems: "center", }} >
                                    <LuBrain size={"25"} color="#ff0000" />
                                    <Typography sx={{ color: '#7e8a9a', fontSize: '20px', fontWeight: '500', marginLeft: '5px' }}>AI Prediction</Typography>
                                </Box>

                                <Typography sx={{ color: '#fff', bgcolor: "#ff00004d", padding: "10px", borderRadius: "15px", display: "inline-flex", marginTop: '10px' }}>{data?.predictionResult}</Typography>
                            </Box>

                        </Box>


                        {/*ببوكس الصورة  */}
                        <Box className='img_container' sx={{ border: '1px solid #57565662', borderRadius: '15px', bgcolor: '#15181e', paddingX: '50px', paddingY: '25px', }}>
                            <Box component={"span"} sx={{ display: 'flex', color: '#7e8a9a' }} >
                                <CiImageOn size={25} color='#ff000060' />
                                <Typography sx={{ color: '#7e8a9a', fontSize: '17px', fontWeight: '500', paddingLeft: '10px', paddingBottom: '15px' }}>MRI Image Preview</Typography>
                            </Box>
                            <Box className='mri' sx={{ borderRadius: '20px', bgcolor: '#15181e', height: '400px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                <img src={data?.mriImageUrl} alt='MRI Image' style={{ borderRadius: '20px', height: '100%' }} />
                            </Box>
                        </Box>



                        {/*ببوكس الاسئلة  */}
                        <Box className='questions' sx={{ bgcolor: "#181b21", borderRadius: "8px", p: 2, mb: 2, cursor: "pointer", marginTop: '15px' }} onClick={() => setOpen(!open)}>
                            <Box sx={{ display: 'flex' }}>
                                <Box component={"span"} sx={{ display: 'flex', color: '#7e8a9a', marginBottom: '10px', flexGrow: '1' }} >
                                    <TbMessage2Question size={22} color='#ff0000' />
                                    <Typography sx={{ color: '#7e8a9a', fontSize: '17px', fontWeight: '500', paddingLeft: '10px' }}>Student Answers</Typography>
                                </Box>

                                <Box sx={{ color: "#fff" }} size="small">
                                    {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                </Box>
                            </Box>
                            {open && (
                                <Box className='student_answer' sx={{ bgcolor: '15181e', borderRadius: '15px', padding: '20px', }}>

                                    {data?.answers.map((question, index) =>
                                        <Box className='questions_and_answers' sx={{ bgcolor: '#24272d6a', borderRadius: '20px', marginBottom: '10px', padding: '20px' }}>

                                            <Typography sx={{ color: '#da2828', paddingBottom: '7px' }}>Q{index + 1}: {question.question}</Typography>
                                            <Typography sx={{ color: '#fff', paddingBottom: '10px', borderBottom: '1px solid #57565662', textTransform: 'capitalize', }} >{question.answerValue ? question.answerValue : "No answer provided"}</Typography>
                                        </Box>
                                    )}
                                </Box>
                            )}
                        </Box>

                    </Grid>

                    {/*ببوكس اللي عاليمين  */}
                    <Grid item size={{ md: 3 }}>
                        <Box className='right_side'>
                            <Box className='actions flex_column' sx={{ gap: '10px', border: '1px solid #57565662', borderRadius: '15px', bgcolor: '#15181e', paddingX: '10px', paddingY: '25px', marginBottom: '10px' }}>
                                <Typography sx={{ color: '#da2828', paddingBottom: '10px', fontWeight: '600', paddingLeft: '9px' }}>Quick Actions</Typography>
                                <Button onClick={() => { //حتى فتح ال pdf
      if (pdf) {
    const url = window.URL.createObjectURL(pdf);
    window.open(url, "_blank");
    setTimeout(() => window.URL.revokeObjectURL(url), 10000);
   }}}


                                    sx={{ bgcolor: '#0e1115', color: '#f0f2f5', display: 'flex', gap: '5px', borderRadius: '15px', "&:hover": { backgroundColor: "#ff0000" }, }}><FaFileDownload />Open PDF Report</Button>
                                <Button sx={{ bgcolor: '#0e1115', color: '#f0f2f5', display: 'flex', gap: '5px', borderRadius: '15px', "&:hover": { backgroundColor: "#ff0000" }, }}><BiSolidCommentDetail />View Feedback</Button>
                                <Button sx={{ bgcolor: '#0e1115', color: '#f0f2f5', display: 'flex', gap: '5px', borderRadius: '15px', "&:hover": { backgroundColor: "#ff0000" }, }}><FaPlus />Add Feedback</Button>
                                <Button onClick={() => navigate("/dashboard/supervisor/students-reports")} sx={{ bgcolor: '#0e1115', color: '#f0f2f5', display: 'flex', gap: '5px', borderRadius: '15px', "&:hover": { backgroundColor: "#ff0000" }, }}><FaArrowLeftLong />Back to Reports</Button>
                            </Box>
                            <Box className='flex_column' sx={{ border: '1px solid #57565662', borderRadius: '15px', bgcolor: '#15181e', paddingX: '20px', paddingY: '25px', gap: '5px' }}>
                                <Typography sx={{ color: '#da2828', paddingBottom: '10px', fontWeight: '600' }}>Report Summary</Typography>
                                <Typography sx={{ color: '#7e8a9a', fontSize: '13px' }}>Submitted</Typography>
                                <Typography sx={{ color: '#ffffff', fontSize: '11px' }}>{data?.submittedAt.split("T")[0]}</Typography>
                                <Typography sx={{ color: '#7e8a9a', fontSize: '13px' }}>Report ID</Typography>
                                <Typography sx={{ color: '#ffffff', fontSize: '11px' }}>{`REP-${data?.reportId.slice(0, 6)}`}</Typography>
                                <Typography sx={{ color: '#7e8a9a', fontSize: '13px' }}>Case ID</Typography>
                                <Typography sx={{ color: '#ffffff', fontSize: '11px' }}>{`CASE-${data?.caseId?.slice(0, 6)}`}</Typography>

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
                        <span style={{ color: "var(--dark-red-color)" }}>Brainova</span>. All
                        rights reserved.
                    </Typography>
                </Box>

            </Container>
        </Box>
    )
}

export default AddFeedback