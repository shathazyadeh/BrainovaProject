import { useState } from "react";
import SupervisorTable from "../../../components/muiComponents/supervisorTable/SupervisorTable";
import useGetAllOfMyStudnetsCases from "../../../hooks/supervisorHooks/useGetAllOfMyStudnetsCases";
import Loader from "../../../components/uiVerseComponents/loader/Loader";
import { Box, Container, Grid, Typography } from "@mui/material";
import DashboardNavbar from "../../../components/muiComponents/dashboardNavbar/DashboardNavbar";
import UsersSearch from "../../../components/filterSearch/usersSearch/UsersSearch";
import ReportsFilters from "../../../components/filterInputs/reportsFilters/ReportsFilters";
import BasicModal from "../../../components/muiComponents/basicModal/BasicModal";
import DashboardFooter from "../../../components/dashboardFooter/DashboardFooter";
function SupervisorReports() {
  const { isError, error, isLoading, data } = useGetAllOfMyStudnetsCases();
  const [search, setSearch] = useState("");
  const [feedbackFilter, setFeedbackFilter] = useState("all");
  const [predictionFilter, setPredictionFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  //للمودال
  const handleOpen = (row) => {
    setSelectedReport(row);
    setOpen(true);
  };
  console.log("selected Report : ", selectedReport);

  const handleClose = () => {
    setOpen(false);
  };

  const filteredRows = data?.items?.filter((row) => {
    //فلترة الدااتا حسب السيرتش قبل ما نبعتها للتيبل لتعرضهن
    const searchValue = search.toLowerCase();

    return row.studentName?.toLowerCase().includes(searchValue);
  });

  let filteredByFeedback = filteredRows;
  if (feedbackFilter !== "all") {
    feedbackFilter === "noFeedback"
      ? (filteredByFeedback = filteredRows.filter(
          (report) => report.isReviewed === false,
        ))
      : (filteredByFeedback = filteredRows.filter(
          (report) => report.isReviewed === true,
        ));
  }

  let finalFiltered = filteredByFeedback;
  if (predictionFilter !== "all") {
    finalFiltered = filteredByFeedback.filter(
      (report) => report.predictionResult === predictionFilter,
    );
  }

  console.log("my students : ", data);

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

      <Box sx={{ flex: 1, paddingBottom: { md: "20px" } }}>
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
          <Box className="section_titel">
            <Typography
              component={"h1"}
              variant="h4"
              sx={{
                color: "#fff",
                fontFamily: "var(--primary-font)",
                fontWeight: "600",
                display: "inline-block",
                marginRight: "10px",
                paddingTop: { xs: "30px", md: "0px" },
                "@media (max-width:700px)": {
                  fontSize: "22px",
                },
              }}
            >
              Reports
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
                {finalFiltered?.length}
              </Typography>{" "}
              reports found
            </Typography>
          </Box>
          <Box
            className="search_and_filter"
            sx={{ paddingTop: "23px" }}
          >
            <Grid container rowSpacing={0.1} columnSpacing={1}>
              <Grid item>
                <ReportsFilters
                  feedbackFilter={feedbackFilter}
                  setFeedbackFilter={setFeedbackFilter}
                  predictionFilter={predictionFilter}
                  setPredictionFilter={setPredictionFilter}
                />
              </Grid>
              <Grid item sx={{ flexGrow: "1" }}>
                <UsersSearch search={search} setSearch={setSearch} />
              </Grid>
            </Grid>
          </Box>
          <SupervisorTable
            rows={finalFiltered}
            count={finalFiltered?.length}
            handleOpenModal={handleOpen}
          />
          <BasicModal
            open={open}
            handleClose={handleClose}
            reportId={selectedReport?.reportId}
            type="feedback"
          />
        </Container>
      </Box>

      <DashboardFooter/>
    </Box>
  );
}

export default SupervisorReports;