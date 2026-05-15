import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { LuBrain } from "react-icons/lu";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import useLogout from "../../../hooks/authHooks/useLogout";

export default function DashboardNavbar() {
  const user = useAuthStore((state) => state.user);
  const { authMutation } = useLogout();
  const navigate = useNavigate();
  const handleLogout = () => {
    authMutation.mutate({});
  };
  const handleDashboard = () => {
    if (user?.roles[0] === "Admin") navigate("/dashboard/admin");
    else navigate("/dashboard/super-admin");
    handleClose();
  };

  const handleUserManagement = () => {
    if (user?.roles[0] === "Admin") navigate("/dashboard/admin/user-management");
    else navigate("/dashboard/super-admin/user-management");
    handleClose();
  };

  const handleProfile = () => {
    if (user?.roles[0] === "Admin") navigate("/dashboard/admin/profile");
    else navigate("/dashboard/super-admin/profile");
    handleClose();
  };

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    //عشان المنيو تسكر تلقائي عند السكرول
    const handleScroll = () => {
      if (anchorEl) setAnchorEl(null);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [anchorEl]);

  if (!user) return null; //عشان بس نكبس لوج اوت بصير ريريندر وبكون قيمة اليوزر نل لو ما فحصنا هيك رح ينزل كمان مرة تحت ويعرض الايلس وتنعرض قائمة الادمن للحظة صغيرة قبل مانطلع للوج ان
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="relative"
        sx={{ bgcolor: "transparent", paddingY: "12px", boxShadow: "none" }}
      >
        {" "}
        {/*عشان يطلع فوق الدروار */}
        <Toolbar
          sx={{
            paddingLeft: {xs:"5px",sm:"18px"},
            paddingRight: "15px",
          }}
        >
          {auth && (
            <div style={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
              <IconButton
                size="larg"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{ display: { md: "none" } }}
              >
                <Avatar
                  sx={{
                    bgcolor: "var(--secondary-color)",
                    fontSize: { xs: "25px", md: "30px" },
                    width: { xs: 40, sm: 49 },
                    height: { xs: 40, sm: 49 },
                  }}
                >
                  {user?.userName?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Typography
                component={"span"}
                sx={{
                  fontSize: { xs: "15px", md: "18px" },
                  fontWeight: "300",
                  paddingLeft: "5px",
                  letterSpacing: "2px",
                  display: { md: "none" },
                }}
              >
                Welcome back,
                <br />
                <Typography
                  component={"span"}
                  sx={{
                    color: "var( --primary-color)",
                    fontSize: { xs: "15px", md: "18px" },
                    fontWeight: "300",
                    letterSpacing: "2px",
                  }}
                >
                  {user?.userName}
                </Typography>
              </Typography>
              <Menu
                disableScrollLock
                transitionDuration={0}
                PaperProps={{
                  sx: {
                    marginTop: "60px",
                    borderRadius: 2,
                    //sotprops بسيتخدمها مكون مينيو   mui داخليا  خاصية
                    //لعمل الناف بار شفاف
                    background: "rgba(255,255,255,0.04)", // أقل شفافية
                    backdropFilter: "blur(20px)", // بلور أقوى
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
                    display: { md: "none" },
                  },
                }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {user?.roles[0] === "Supervisor"
                  ? [
                      "Dashboard",
                      "Reports",
                      "Questions",
                      "Students",
                      "Feedback",
                      "Profile",
                      "Logout",
                    ].map((text) => (
                      <MenuItem
                        key={text}
                        sx={{
                          color: "#fff",
                          paddingY: "10px",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.1)",
                          },
                        }}
                        onClick={() => {
                          if (text === "Dashboard")
                            navigate("/dashboard/supervisor");
                          else if (text === "Reports")
                            navigate("/dashboard/supervisor/students-reports");
                          else if (text === "Questions")
                            navigate("/dashboard/supervisor/report-questions");
                          else if (text === "Students")
                            navigate("/dashboard/supervisor/students");
                          else if (text === "Feedback")
                            navigate("/dashboard/supervisor/feedback");
                          else if (text === "Profile")
                            navigate("/dashboard/supervisor/profile");
                          else if (text === "Logout") handleLogout();
                          handleClose();
                        }}
                      >
                        {text}
                      </MenuItem>
                    ))
                  : [
                      <MenuItem
                        key="dashboard"
                        sx={{ color: "#fff" }}
                        onClick={handleDashboard}
                      >
                        Dashboard
                      </MenuItem>,
                      <MenuItem
                        key="users"
                        sx={{ color: "#fff" }}
                        onClick={handleUserManagement}
                      >
                        User Management
                      </MenuItem>,
                      <MenuItem
                        key="profile"
                        sx={{ color: "#fff" }}
                        onClick={handleProfile}
                      >
                        Profile
                      </MenuItem>,
                      <MenuItem
                        key="logout"
                        sx={{ color: "#fff" }}
                        onClick={handleLogout}
                      >
                        Logout
                      </MenuItem>,
                    ]}
              </Menu>
            </div>
          )}
          <Typography
            component={"span"}
            sx={{
              bgcolor: "rgba(43, 25, 25)",
              padding: { xs: "6px", sm: "10px" },
              borderRadius: "15px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LuBrain size={"30"} color="var(--primary-color)" />
          </Typography>
          <Typography
            component={"h2"}
            variant="h4"
            sx={{
              fontWeight: "700",
              fontFamily: "monospace",
              fontSize: 35,
              letterSpacing: "5px",
              marginLeft: "5px",
              display: { xs: "none", md: "block" },
            }}
          >
            BRAINOVA
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}