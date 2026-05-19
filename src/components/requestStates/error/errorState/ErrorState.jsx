import { Box, Typography } from "@mui/material";

function ErrorState({ error }) {

  let errorMessage = "Something went wrong.";

  if (error?.response?.status === 401) {
    errorMessage = "Unauthorized. Please login again.";
  } 
  else if (error?.response?.status === 403) {
    errorMessage = "You don't have permission to access this page.";
  } 
  else if (error?.response?.status === 404) {
    errorMessage = "Requested resource was not found.";
  } 
  else if (error?.response?.status === 500) {
    errorMessage = "Server error. Please try again later.";
  } 
  else if (error?.code === "ERR_NETWORK") {
    errorMessage = "Network error. Check your internet connection.";
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "var(--navy-color)",
      }}
    >
      <Typography
        sx={{
          color: "#fff",
          fontWeight: "600",
          fontSize: { xs: "14px", md: "20px" },
          textAlign: "center",
        }}
      >
        {errorMessage}
      </Typography>
    </Box>
  );
}

export default ErrorState;