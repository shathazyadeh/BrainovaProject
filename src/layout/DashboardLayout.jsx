import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import TemporaryDrawer from "../components/temporaryDrawer/TemporaryDrawer";

function DashboardLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      
      <TemporaryDrawer />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Outlet />
      </Box>

    </Box>
  );
}

export default DashboardLayout;