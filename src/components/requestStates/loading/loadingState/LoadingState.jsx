import { Box } from "@mui/material";
import Loader from "../../../uiVerseComponents/loader/Loader";

function LoadingState() {
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
      <Loader />
    </Box>
  );
}

export default LoadingState;