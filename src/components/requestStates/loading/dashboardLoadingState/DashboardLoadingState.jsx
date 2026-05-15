import { Box } from "@mui/material";
import Loader from "../../../uiVerseComponents/loader/Loader";
import DashboardNavbar from "../../../muiComponents/dashboardNavbar/DashboardNavbar";
import useAuthStore from "../../../../store/useAuthStore";

function DashboardLoadingState() {
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <DashboardNavbar />

      <Box
        sx={{
          position: "fixed",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: user? "110px":"0px",
          bgcolor: "var(--navy-color)",
          zIndex: 1,
        }}
      >
        <Loader />
      </Box>
    </>
  );
}

export default DashboardLoadingState;