import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import { Box } from "@mui/material";

function MainLayout() {
  const location = useLocation();

  // تحديد لون الفوتر حسب الصفحة
  let footerBg = "#171717";
  if (location.pathname === "/home") footerBg = "#000";

  return (
    <Box sx={{ bgcolor: "#171717", paddingTop: "20px" }}>
      <Navbar />
      <Outlet />
      <Box sx={{ bgcolor: footerBg }}>
        <Footer />
      </Box>
    </Box>
  );
}

export default MainLayout;