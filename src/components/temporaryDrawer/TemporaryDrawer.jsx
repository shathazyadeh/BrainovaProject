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
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";



const drawerWidth = 240;

export default function TemporaryDrawer() {
  const navigate =  useNavigate();
  const DrawerList = (
    <Box className="flex_column" sx={{ width: drawerWidth ,height:'100%', paddingX:'0px'}} role="presentation">
      <List sx={{flexGrow:'1'}}>
        {["Dashboard", "User Management" , "Profile"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
  sx={{ "&:hover": { bgcolor: "var(--dark-gray-color)" } }}
  onClick={() => {
    if (text === "Dashboard") {
      navigate("/dashboard/admin");
    }else if(text === "Profile"){
      navigate("/dashboard/admin/profile")
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
        <Button className="upper_case auth_btn" sx={{color:'#fff', borderRadius:'10px', bgcolor:'var(--dark-red-color)',width:'100%',fontWeight:'400',letterSpacing:'2px'}}>Logout</Button>
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
           top: "88px",
           height: "calc(100% - 80px)",
           color:'#fff',
           bgcolor:'rgb(36, 35, 35)',
           overflowX: "hidden",
        },
      }}
    >
      {DrawerList}
    </Drawer>
  );
}