import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, useNavigate } from "react-router-dom";
import StarsBackground from "../../reactBitsComponents/starsBackground/StarsBackground";
import useAuthStore from "../../../store/useAuthStore";
import { LuBrain } from "react-icons/lu";
import { IoBookOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import style from "./StarsNavbar.module.css";
import { TbReportSearch } from "react-icons/tb";
import NotificationsMenu from "../../homeComponents/notificationsMenu/NotificationsMenu";
import useLogout from "../../../hooks/authHooks/useLogout";

const pages = [
  {
    name: "Home",
    icon: (
      <Box
        component={LuBrain}
        sx={{
          fontSize: "20px",
          "@media (max-width:970px)": { fontSize: "16px" },
        }}
      />
    ),
  },
  {
    name: "Analysis",
    icon: (
      <Box
        component={FiUpload}
        sx={{
          fontSize: "20px",
          "@media (max-width:970px)": { fontSize: "16px" },
        }}
      />
    ),
  },
  {
    name: "Learning Hub",
    icon: (
      <Box
        component={IoBookOutline}
        sx={{
          fontSize: "20px",
          "@media (max-width:970px)": { fontSize: "16px" },
        }}
      />
    ),
  },
  {
    name: "My Cases",
    icon: (
      <Box
        component={TbReportSearch}
        sx={{
          fontSize: "20px",
          "@media (max-width:970px)": { fontSize: "16px" },
        }}
      />
    ),
  },
];
const settings = ["Profile", "Logout"];

function StarsNavbar({ linkColor }) {
  const user = useAuthStore((state) => state.user);
  const { authMutation } = useLogout();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    authMutation.mutate({});
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  React.useEffect(() => {
    //عشان المنيو تسكر تلقائي عند السكرول
    const handleScroll = () => {
      if (anchorElNav) setAnchorElNav(null);
      if (anchorElUser) setAnchorElUser(null);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [anchorElNav, anchorElUser]);

  return (
    <AppBar
      position="static"
      sx={{
        marginRight: "7px",
        borderRadius: "29px",
        marginLeft: "7px",
        width: "calc(100% - 14px)",
        //لعمل الناف بار شفاف
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StarsBackground></StarsBackground>

          <Typography
            variant="h6"
            className="logo"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              fontFamily: "monospace",
              fontWeight: 800,
              fontSize: 28,
              letterSpacing: ".3rem",
              color: linkColor,
              textDecoration: "none",
              "@media (max-width:1000px)": { fontSize: "23px" },
            }}
          >
            <Box sx={{ marginRight: "5px", lineHeight: "0" }}>
              <Box
                component={LuBrain}
                sx={{
                  fontSize: "23px",
                  "@media (max-width:1000px)": { fontSize: "20px" },
                }}
              />
            </Box>
            BRAINOVA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: linkColor }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              disableScrollLock
              transitionDuration={0}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
              slotProps={{
                paper: {
                  sx: {
                    //لعمل الناف بار شفاف
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
                  },
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                  onClick={handleCloseNavMenu}
                >
                  <Typography
                    component={NavLink}
                    to={
                      page.name == "Home"
                        ? "/home"
                        : page.name == "Analysis"
                          ? "/predict-tumor"
                          : page.name == "Learning Hub"
                            ? "/learning-hub"
                            : page.name == "My Cases"
                              ? "/my-cases"
                              : "/"
                    }
                    sx={{
                      textAlign: "center",
                      color: linkColor,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              gap: "12px",
            }}
          >
            {pages.map((page) => (
              <Button
                component={NavLink}
                key={page.name}
                to={
                  page.name == "Home"
                    ? "/home"
                    : page.name == "Analysis"
                      ? "/predict-tumor"
                      : page.name == "Learning Hub"
                        ? "/learning-hub"
                        : page.name == "My Cases"
                          ? "/my-cases"
                          : "/"
                }
                className={`upper_case ${style.navbar_btn}`}
                sx={{
                  my: 2,
                  color: linkColor,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "revert",
                  fontSize: "18px",
                  fontWeight: "600",
                  "&.active": {
                    color: "var(--primary-color)",
                    borderBottom: "2px solid var(--primary-color)",
                  },
                  "@media (max-width:1100px)": { fontSize: "16px" },
                }}
              >
                {page.icon}
                {page.name}
              </Button>
            ))}
          </Box>

          <NotificationsMenu></NotificationsMenu>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: "var(--secondary-color)" }}>
                  {user?.userName?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              disableScrollLock
              transitionDuration={0}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              slotProps={{
                paper: {
                  sx: {
                    //لعمل الناف بار شفاف
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
                  },
                },
              }}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                  onClick={handleCloseUserMenu}
                >
                  <Typography
                    sx={{ color: linkColor, textAlign: "center" }}
                    onClick={() => {
                      setting === "Logout" ? handleLogout() : handleProfile();
                    }}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default StarsNavbar;