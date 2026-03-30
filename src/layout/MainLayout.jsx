import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import { Box } from "@mui/material";

function MainLayout() {
  return (
    <Box sx={{ bgcolor: "#171717", paddingTop: "20px" }}>
      <Navbar />
      <Outlet />
      <Box sx={{bgcolor:"#171717"}}>
        <Footer />
      </Box>
    </Box>
  );
}

export default MainLayout;