import React from "react";
import SupervisorTable from "../../../components/muiComponents/supervisorTable/SupervisorTable";
import useGetAllOfMyStudnetsCases from "../../../hooks/supervisorHooks/useGetAllOfMyStudnetsCases";
import Loader from "../../../components/uiVerseComponents/loader/Loader";
import { Box, Container } from "@mui/material";

function SupervisorReports() {
  const { isError, error, isLoading, data } = useGetAllOfMyStudnetsCases();
  console.log("my students : ", data);

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

  if (isLoading) {
    return (
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          left: "200px",
          bgcolor: "var(--navy-color)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
          "@media (max-width:899px)": {
            left: "0px",
          },
        }}
      >
        <Loader />
      </Box>
    );
  }

  return (
    <Box
      className="supervisor_table"
      sx={{ height: "100vh", paddingTop: "100px" }}
    >
      <Container maxWidth="lg">
        <SupervisorTable rows={data?.items} />
      </Container>
    </Box>
  );
}

export default SupervisorReports;