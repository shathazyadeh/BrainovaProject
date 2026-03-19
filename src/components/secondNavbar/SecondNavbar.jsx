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
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function SecondNavbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };
  const handleDashboard = () => {
    if(user.role === "Admin")
    navigate("/dashboard/admin");
    else navigate("/dashboard/super-admin");
    handleClose();
  };

  const handleUserManagement = () => {
    if(user.role === "Admin")
    navigate("/dashboard/admin/user-management");
    else navigate("/dashboard/super-admin/user-management");
    handleClose();
  };

  const handleProfile = () => {
    if(user.role === "Admin")
    navigate("/dashboard/admin/profile");
    else  navigate("/dashboard/super-admin/profile");
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="relative"
        sx={{ bgcolor: "transparent", paddingY: "12px", boxShadow: "none" }}
      >
        {" "}
        {/*عشان يطلع فوق الدروار */}
        <Toolbar>
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
                    fontSize: "30px",
                    width: 50,
                    height: 50,
                  }}
                >
                  {user?.userName?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Typography
                component={"span"}
                sx={{
                  fontSize: "18px",
                  fontWeight: "300",
                  paddingLeft: "5px",
                  letterSpacing: "2px",
                  display: { md: "none" },
                }}
              >
                Welcome
                <br />
                back,
                <Typography
                  component={"span"}
                  sx={{
                    color: "var( --primary-color)",
                    fontSize: "18px",
                    fontWeight: "300",
                    letterSpacing: "2px",
                  }}
                >
                  {user?.userName}
                </Typography>
              </Typography>
              <Menu
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
                <MenuItem
                  sx={{
                    color: "#fff",
                    paddingTop: "10px",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)", // لون الخلفية عند hover
                    },
                  }}
                  onClick={handleDashboard}
                >
                  Dashboard
                </MenuItem>
                <MenuItem
                  sx={{
                    color: "#fff",
                    paddingBottom: "10px",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)", // لون الخلفية عند hover
                    },
                  }}
                  onClick={handleUserManagement}
                >
                  User Management
                </MenuItem>
                <MenuItem
                  sx={{
                    color: "#fff",
                    paddingBottom: "10px",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)", // لون الخلفية عند hover
                    },
                  }}
                  onClick={handleProfile}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  sx={{
                    color: "#fff",
                    paddingBottom: "10px",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)", // لون الخلفية عند hover
                    },
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
          <Typography
            component={"span"}
            sx={{
              bgcolor: "rgba(43, 25, 25)",
              padding: "10px",
              borderRadius: "15px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LuBrain size={"30"} color="var(--light-red-color)" />
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