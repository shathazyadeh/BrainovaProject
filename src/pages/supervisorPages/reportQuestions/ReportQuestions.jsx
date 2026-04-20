import { Box, Container, Typography } from '@mui/material'
import QuestionsTabel from '../../../components/muiComponents/questionsTabel/QuestionsTabel'
import useGetQuestions from '../../../hooks/supervisorHooks/useGetQuestions';
import DashboardNavbar from '../../../components/muiComponents/dashboardNavbar/DashboardNavbar';
import Loader from '../../../components/uiVerseComponents/loader/Loader';

function ReportQuestions() {
    const { isError, error, isLoading, data } = useGetQuestions();
        console.log("data  ", data);

  return (
    <Box sx={{
        bgcolor: "var(--navy-color)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position:"relative"
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
                top: "90px",
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
                <Typography sx={{ color: "var(--secondary-color)" }}>
                  Managing and organizing the questions used for report evaluation.
                </Typography>
              </Box>
      <QuestionsTabel data={data}/>
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