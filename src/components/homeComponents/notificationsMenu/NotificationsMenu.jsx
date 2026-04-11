import Button from '@mui/material/Button';
import ListSubheader from '@mui/material/ListSubheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import useGetAllFeedbacks from '../../../hooks/studentHooks/useGetAllFeedbacks';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import style from "./NotificationsMenu.module.css";

const StyledListHeader = styled(ListSubheader)({
  backgroundImage: 'var(--Paper-overlay)',
});

export default function NotificationsMenu() {
  const { isError, error, isLoading, data } = useGetAllFeedbacks();
  console.log("data  : ",data);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? "grouped-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Box
          className="notifications_icon"
          sx={{
            bgcolor: "var(--mid-gray-color)",
            padding: "6px",
            borderRadius: "10px",
            cursor: "pointer",
            display: "flex",
          }}
        >
          <IoMdNotificationsOutline size={22} color="#fff" />
        </Box>
      </Button>
      <Menu
        id="grouped-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
    sx: {
      border:"1px solid rgba(207, 25, 25, 0.44)",
      bgcolor: "#000",
      borderRadius: "10px",
      paddingY:"10px",
      paddingX:"15px"
    }
  }}
      >
        <Typography sx={{fontFamily: "var(--primary-font)",fontWeight: "600",fontSize: "14px",color: "#fff",marginBottom:"5px"}}>Notifications</Typography>
        {data?.items.map((feedback) => (
          <MenuItem FaCircle
            key={feedback.feedbackId}
            sx={{ alignItems: "flex-start",display:"flex",gap:"10px",paddingLeft:"0px"}}
          >
            <Box component={'span'} className={style.pulse_wrapper} sx={{width:"6px",height:"6px",borderRadius:"50%",bgcolor:"var(--primary-color)",marginTop:"5px"}}></Box>
            <Box className="content flex_column">
            <Typography
              sx={{
                fontFamily: "var(--primary-font)",
                fontWeight: "500",
                fontSize: "13px",
                color: "#fff",
              }}
            >
              {feedback.supervisorName}
            </Typography>
            <Typography
              sx={{ fontSize: "11px", color: "var(--secondary-color)" }}
            >
              {feedback.comment.length > 40
                ? feedback.comment.slice(0, 40) + "..."
                : feedback.comment}
            </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}