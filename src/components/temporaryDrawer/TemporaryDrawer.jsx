import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { RiDashboard3Fill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { Avatar, Button, IconButton, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import StarsBackground from "../reactBitsComponents/starsBackground/StarsBackground";
import GlowCard from "../reactBitsComponents/glowCard/GlowCard";



const drawerWidth = 240;

export default function TemporaryDrawer() {
  const navigate =  useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state)=>state.logout);
  const handleLogout = ()=>{
      logout();
      navigate('/auth/login');
     }

  const location = useLocation();



  const DrawerList = (

    
    <Box className="flex_column" sx={{ width: drawerWidth ,height:'100%'}} role="presentation">

<Box sx={{ display: 'flex',alignItems:'center',marginBottom:'20px'}}>
      <IconButton
        size='large'
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
    >
        <Avatar sx={{ bgcolor: '#928a8a', fontSize: '30px', width: 49, height: 49 }}>{user?.userName?.charAt(0).toUpperCase()}</Avatar>
    </IconButton>
    <Typography component={'span'} sx={{ fontSize: '18px', fontWeight: '300', paddingLeft: '5px', letterSpacing: '2px',overflowWrap:'break-word' }}>Welcome<br />back,<Typography component={'span'} sx={{ color: 'var( --primary-color)', fontSize: '18px', fontWeight: '300', letterSpacing: '2px',wordBreak:'break-all'}}>{user?.userName}</Typography></Typography>
      </Box>

      <List sx={{flexGrow:'1'}}>
        {["Dashboard", "User Management" , "Profile"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
  sx={{
  borderRadius: '20px',
  transition: 'all 0.3s ease',
  marginY:'4px',

  "&:hover": {
    bgcolor: "var(--dark-gray-color)",
    boxShadow: "5px 0 15px -3px rgba(0,0,0,0.3)",
  },

  ...(location.pathname === "/dashboard/admin" && text === "Dashboard" && {
    bgcolor: "var(--primary-color)",
    marginX:'10px',
    boxShadow: "5px 0 15px -3px rgba(0,0,0,0.3)",
  }),

  ...(location.pathname === "/dashboard/admin/profile" && text === "Profile" && {
    bgcolor: "var(--primary-color)",
    marginX:'10px',
    boxShadow: "5px 0 15px -3px rgba(0,0,0,0.3)",
  })
}}
  onClick={() => {
    if (text === "Dashboard") {
      navigate("/dashboard/admin");
    } else if (text === "Profile") {
      navigate("/dashboard/admin/profile");
    }
  }}
>
              <ListItemIcon>
                {text==="Dashboard" ? <RiDashboard3Fill fill='#fff' size={22} />
                : text==="User Management"? <FaUsers fill='#fff' size={22}/>
                : <CgProfile color='#fff' size={22}/>
                }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider /> {/*هو الي بعمل الخط الخفيف فوق اللوج اوت */}
      <Box className="logout_btn" sx={{paddingX:'20px',paddingY:'30px'}}>
        <Button onClick={handleLogout} className="upper_case auth_btn" sx={{color:'#fff', borderRadius:'10px', bgcolor:'var(--primary-color)',width:'100%',fontWeight:'400',letterSpacing:'2px'}}>Logout</Button>
      </Box>
    </Box>
  );

  return (
    
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
           width: drawerWidth,
           boxSizing: "border-box",
           color:'#fff',
           bgcolor:'rgba(0, 0, 0, 0.69)',
           overflowX: "hidden",
           borderRadius:'30px',
           paddingY:'20px',
      top: 15,
      left: 15,
      bottom:15,
      height: "calc(100% - 30px)", 
      boxShadow: "0px 0 15px 0px rgba(0,0,0,0.5)",
        },
      }}
    >
      {DrawerList}
    </Drawer>
     
  );
}