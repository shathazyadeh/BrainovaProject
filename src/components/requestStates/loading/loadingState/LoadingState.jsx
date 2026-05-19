import { Box } from "@mui/material";
import Loader from "../../../uiVerseComponents/loader/Loader";
import Offline from "../../offline/Offline";

function LoadingState() {
  const isOffline = !navigator.onLine; // المتصفح بفحص اذا في اتصال بالشبكة اذا ما في برجع فولس
  if (isOffline) return <Offline />;
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