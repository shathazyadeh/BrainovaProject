import { Box } from "@mui/material";
import DashboardNavbar from "./../../../muiComponents/dashboardNavbar/DashboardNavbar";
import TemporaryDrawer from "./../../../muiComponents/temporaryDrawer/TemporaryDrawer";
import Loader from "./../../../uiVerseComponents/loader/Loader";
import Offline from "../../offline/Offline";

export default function DashboardLoadingState() {
  const isOffline = !navigator.onLine; // المتصفح بفحص اذا في اتصال بالشبكة اذا ما في برجع فولس
  if (isOffline) return <Offline />;

  return (
    <>
      <Box sx={{ position: "absolute", top: 0, left: 0, right: 0 }}>
        <DashboardNavbar />
      </Box>

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
    </>
  );
}