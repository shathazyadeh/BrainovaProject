import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import TemporaryDrawer from "../components/muiComponents/temporaryDrawer/TemporaryDrawer";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";

function DashboardLayout() {
    const location = useLocation();

  return (
    <Box sx={{bgcolor: "var(--navy-color)"}}>

      <ScrollToTop />
      
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