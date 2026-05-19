import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import TemporaryDrawer from "../components/muiComponents/temporaryDrawer/TemporaryDrawer";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";
import useAuthStore from "../store/useAuthStore";
import AuthFallback from "../components/authSession/authFallback/AuthFallback";

function DashboardLayout() {
    const location = useLocation();
    const { user, isAuthLoading } = useAuthStore();

    if (!user && !isAuthLoading) { // لأنه كمان اثناء اللودينج بكون ما في يوزر ف اذا هو ما بحمل ولا في يوزر معناها في خلل
      return <AuthFallback />;
    }

  return (
    <Box sx={{bgcolor: "var(--navy-color)"}}>

      <ScrollToTop />
      
      <Box sx={{ display: { xs: "none", md: "block"  } }}> {/*لانه تيمب ما بتوخذ sx لفيناها ببوكس */}
        <TemporaryDrawer />
      </Box>
      <Box
        component="main"
        sx={{
          ml: {xs:"0px", md: !isAuthLoading ? "240px" : "0px",} // نفس عرض الـ Drawer
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout;