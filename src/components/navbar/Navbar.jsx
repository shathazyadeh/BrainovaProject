import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import StarsBackground from '../reactBitsComponents/starsBackground/StarsBackground';
import { LuBrain } from "react-icons/lu";
import { IoBookOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import style from "./Navbar.module.css"
import useAuthStore from '../../store/useAuthStore';

const pages = [
  { name: "Home", icon: <LuBrain size={20}/> },
  { name: "Analysis", icon: <FiUpload size={20}/> },
  { name: "Learning Hub", icon: <IoBookOutline size={20}/> },
];
const settings = ['Profile', 'Logout'];

function Navbar() {
  const user = useAuthStore((state)=>state.user);
  const logout = useAuthStore((state)=>state.logout);
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

  const handleLogout = ()=>{
    console.log('hi');
    logout();
    navigate('/auth/login');
  }

  return (
    <AppBar position="static" sx={{
      marginRight: '7px',
      borderRadius: '29px',
      marginLeft: '7px',
      width: 'calc(100% - 14px)',
      //لعمل الناف بار شفاف
      background: "rgba(255,255,255,0.04)", // أقل شفافية
      backdropFilter: "blur(20px)",        // بلور أقوى
      border: "1px solid rgba(255,255,255,0.15)",
      boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StarsBackground> {/*stars effect from react bit*/}
          </StarsBackground>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 800,
              fontSize: 25,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              display: 'flex',
              gap: '10px',

            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
              fill="white"
              stroke="var(--primary-color)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-brain w-8 h-8 text-red-500"
              data-fg-caxq9="1.21:1.9465:/src/app/components/Login.tsx:32:17:1540:42:e:Brain::::::42K"
            >
              <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
              <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
              <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
              <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
              <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
              <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
              <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
              <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
              <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
            </svg>
            BRAINOVA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
              slotProps={{
                paper: {
                  sx: {  //sotprops بسيتخدمها مكون مينيو   mui داخليا  خاصية 
                    //لعمل الناف بار شفاف
                    background: "rgba(255,255,255,0.04)", // أقل شفافية
                    backdropFilter: "blur(20px)",        // بلور أقوى
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
                  }
                }
              }
              }
            >

              {pages.map((page) => (
                <MenuItem key={page.name} sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)", // لون الخلفية عند hover
                  }
                }} onClick={handleCloseNavMenu}>
                  <Typography component={RouterLink}
                    to={
                      page.name == 'Home' ? '/home' :
                        page.name == 'Analysis' ? '/predict-tumor' :
                          '/'
                    }
                    sx={{ textAlign: 'center', color: 'white',
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"}}>
                      {page.name}
                    </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: '12px' }}>
            {pages.map((page) => (
              <Button
                component={RouterLink}
                key={page.name}
                onClick={handleCloseNavMenu}
                className={`upper_case ${style.navbar_btn}`}

                sx={{ my: 2, color: 'white', display: 'flex', alignItems:'center' , gap:'6px', fontFamily: 'revert', fontSize: '18px', fontWeight: '600' }}
                to={
                      page.name == 'Home' ? '/home' :
                        page.name == 'Analysis' ? '/predict-tumor' :
                          '/'
                    }
              >
                {page.icon}
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} >
                <Avatar sx={{ bgcolor: 'var(--secondary-color)' }}>{user?.userName?.charAt(0).toUpperCase()}</Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px', }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              slotProps={{
                paper: {
                  sx: {  //sotprops بسيتخدمها مكون مينيو   mui داخليا  خاصية 
                    //لعمل الناف بار شفاف
                    background: "rgba(255,255,255,0.04)", // أقل شفافية
                    backdropFilter: "blur(20px)",        // بلور أقوى
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.25)",

                  }
                }
              }}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)", // لون الخلفية عند hover
                  }
                }} onClick={handleCloseUserMenu}>
                  <Typography sx={{ color: 'white', textAlign: 'center' }}
                  onClick={()=> {if (setting==='Logout') handleLogout()}}
                   >{setting}
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
export default Navbar;