
import { Box, Button, Container, Typography } from '@mui/material'
import QuestionsTabel from '../../../components/muiComponents/questionsTabel/QuestionsTabel'
import useGetQuestions from '../../../hooks/supervisorHooks/useGetQuestions';
import DashboardNavbar from '../../../components/muiComponents/dashboardNavbar/DashboardNavbar';
import Loader from '../../../components/uiVerseComponents/loader/Loader';
import { FiPlus } from "react-icons/fi";
import { useState } from 'react';
import RightDrawer from '../../../components/muiComponents/rightDrawer/RightDrawer';
function ReportQuestions() {
    const { isError, error, isLoading, data } = useGetQuestions();
    console.log("data  ", data);
    const [open, setOpen] = useState(false);


    return (
        <Box sx={{
            bgcolor: "var(--navy-color)",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            position: "relative"
        }}>
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
                                zIndex: 1,
                            }}
                        >
                            <Typography
                                component={"h1"}
                                variant="h5"
                                sx={{
                                    marginTop: "290px",
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
                                display: "flex",
                                justifyContent: "center",
                                zIndex: 1,
                            }}
                        >
                            <Box sx={{ marginTop: "290px" }}>
                                <Loader />
                            </Box>
                        </Box>
                    )}
                    <Box className="section_titel" sx={{ marginBottom: "23px" }}>
                        <Typography
                            component={"h1"}
                            variant="h4"
                            sx={{
                                color: "#fff",
                                fontFamily: "var(--primary-font)",
                                fontWeight: "600",
                                display: "inline",
                                marginRight: "10px",
                                "@media (max-width:700px)": {
                                    fontSize: "22px",
                                },
                            }}
                        >
                            Report Questions
                        </Typography>
                        <Box  sx={{ display: 'flex', justifyContent:"space-between", alignItems: { xs: "flex-start",  }, "@media (max-width:1142px)": {flexDirection:'column'} ,marginBottom:'20px'}}>
                            <Typography sx={{ color: "var(--secondary-color)" }}>
                                Managing and organizing the questions used for report evaluation.
                            </Typography>
                            <Button
                                onClick={() => setOpen(true)}
                                sx={{
                                    bgcolor: "#ed2c2c",
                                    color: "#f0f2f5",
                                    display: "flex",
                                    paddingX: {xs:'10px',md:'15px'},
                                    paddingY: {xs:'5px',md:'10px'},
                                    gap: '10px',
                                    justifyContent: "center",
                                    textAlign: "center",
                                    borderRadius: "25px",
                                    whiteSpace: "nowrap",
                                    boxShadow: "0 0 15px rgba(207, 25, 25, 0.81)",
                                   
                                     "@media (max-width:1142px)": {marginTop:'20px'} ,
                                    
                                }}
                            > <Box sx={{ alignItems: 'center', display: 'flex' }}>
                                    <FiPlus size={20} style={{ flexShrink: 0 }} />
                                </Box>
                                <Typography sx={{ fontSize: { xs: "14px",sm:'15px', md: "17px", }, justifyContent: "flex-start", display: 'flex', textTransform: "capitalize", fontWeight: "500",  }}>Create Question</Typography>
                            </Button>
                        </Box>
                    </Box>
                    <RightDrawer open={open} setOpen={setOpen} />

                    <QuestionsTabel data={data} />
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
                    marginTop: { xs: "1px", md: "0px" },
                }}
            >
                <Typography
                    component={"p"}
                    sx={{
                        color: "var(--mid-gray-color)",
                        paddingY: "30px",
                        "@media (max-width:430px)": {
                            fontSize: "12px",
                        },
                    }}
                >
                    © 2026{" "}
                    <Typography
                        component={"span"}
                        sx={{
                            color: "var(--dark-red-color)",
                            "@media (max-width:430px)": {
                                fontSize: "12px",
                            },
                        }}
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

export default ReportQuestions
