import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import TemporaryDrawer from "../components/temporaryDrawer/TemporaryDrawer";

function DashboardLayout() {
  return (
    <Box sx={{bgcolor: "rgb(36, 35, 35)"}}>
      <Box sx={{ display: { xs: "none", md: "block"  } }}> {/*لانه تيمب ما بتوخذ sx لفيناها ببوكس */}
        <TemporaryDrawer />
      </Box>

      <Box
        component="main"
        sx={{
          ml: {xs:"0px",md:"240px"} // نفس عرض الـ Drawer
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout;