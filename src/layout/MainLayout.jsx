import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer.jsx";
import { Box } from "@mui/material";
import StarsNavbar from "../components/muiComponents/starsNavbar/StarsNavbar.jsx";
import ScrollToTop from "../components/scrollToTop/ScrollToTop.jsx";
import useAuthStore from "../store/useAuthStore.js";
import AuthFallback from "../components/authSession/authFallback/AuthFallback.jsx";

function MainLayout() {
  const location = useLocation();
  const { user, isAuthLoading } = useAuthStore();

  const publicRoutes = ["/home","/"];
  
  if (!user && !isAuthLoading && !publicRoutes.includes(location.pathname)) {
    return <AuthFallback />;
  }

  let footerBg = "#171717";
  let navbarBg = "#171717";
  let linkColor = "#fff";
  if (location.pathname === "/home" || location.pathname === "/my-cases" || location.pathname === "/profile" ) {footerBg = "#000"; navbarBg="var(--navy-color)"}
  else if( location.pathname === "/learning-hub") {footerBg = "#E8E0E4"; navbarBg="#E8E0E4";linkColor="var(--navy-color)"}

  return (
    <Box sx={{ bgcolor: "#171717" }}>
      <Box sx={{bgcolor: navbarBg, paddingTop:"20px"}}>
        <StarsNavbar linkColor={linkColor} />
      </Box>
      <ScrollToTop />
      <Outlet />
      <Box sx={{ bgcolor: footerBg }}>
        <Footer />
      </Box>
    </Box>
  );
}

export default MainLayout;