import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import TemporaryDrawer from "../components/muiComponents/temporaryDrawer/TemporaryDrawer";

function DashboardLayout() {
    const location = useLocation();

  // تحديد لون الفوتر حسب الصفحة
  let DashboardLayoutBg = "rgb(36, 35, 35)";
  if (location.pathname.includes("supervisor")) {DashboardLayoutBg="var(--navy-color)"}

  return (
    <Box sx={{bgcolor: DashboardLayoutBg}}>
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