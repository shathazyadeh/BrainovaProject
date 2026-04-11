import Button from "@mui/material/Button";
import ListSubheader from "@mui/material/ListSubheader";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { LuCheckCheck } from "react-icons/lu";
import useGetAllFeedbacks from "../../../hooks/studentHooks/useGetAllFeedbacks";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import style from "./NotificationsMenu.module.css";
import useMarksAsSeen from "../../../hooks/studentHooks/useMarksAsSeen";
import useMarkAllAsSeen from "../../../hooks/studentHooks/useMarkAllAsSeen";
import { Grid } from "@mui/material";

const StyledListHeader = styled(ListSubheader)({
  backgroundImage: "var(--Paper-overlay)",
});

export default function NotificationsMenu() {
  const { isError, error, isLoading, data } = useGetAllFeedbacks();
  const { markAsSeen, serverErrors, isLoading: isMarkSeenLoading } = useMarksAsSeen();
  const { usePostMutation: markAllSeenMutation, serverErrors: serverMarkAllSeenErrors, isLoading: isMarkAllSeenLoading } = useMarkAllAsSeen();
  const [seenIds, setSeenIds] = useState([]);

  const handelMarkSeen = async (feedbackId) => {
    setSeenIds((prevIds) => [...prevIds, feedbackId]); //ضفنا الفيدباك الي وصل على قائمة الفيداباكات السابقة المقروءة

    try {
      await markAsSeen(feedbackId);
    } catch (err) {
      setSeenIds((prevIds) => prevIds.filter((id) => id !== feedbackId)); //في حال فشل الطلب بنشيلها من القائمة
    }
  };
  const handleMarkAllSeen = async()=>{
    await markAllSeenMutation.mutateAsync();
  }

  console.log("data  : ", data);
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
        disableScrollLock
        hideBackdrop={false}
        PaperProps={{
          sx: {
            border: "1px solid rgba(207, 25, 25, 0.44)",
            bgcolor: "#000000",
            borderRadius: "10px",
            paddingTop: "10px",
          },
        }}
        sx={{
          "& .MuiMenu-list": {
            paddingBottom: "0 !important",
          },
        }}
      >
        <Box className="notification_header">
          <Grid container spacing={5}>
            <Grid item size={{xs:6}}>
              <Typography
          sx={{
            fontFamily: "var(--primary-font)",
            fontWeight: "600",
            fontSize: "14px",
            color: "#fff",
            marginBottom: "5px",
            paddingLeft: "17px",
          }}
        >
          Notifications
        </Typography>
            </Grid>
            <Grid item sx={{display:"flex",justifyContent:"flex-end",alignItems:"center"}} size={{xs:6}}>
              <Typography onClick={handleMarkAllSeen} sx={{color:"var(--primary-color)",fontSize:"10px",paddingRight:"10px",display:"flex",alignItems:"center"}}>
                <LuCheckCheck style={{marginRight:"5px"}}/>
                Mark all read
              </Typography>
            </Grid>
          </Grid>
        </Box>
        {data?.items.map((feedback) => {
          const isSeen =
            feedback.isSeen || seenIds.includes(feedback.feedbackId);
          return (
            <MenuItem
              onClick={() => handelMarkSeen(feedback.feedbackId)}
              key={feedback.feedbackId}
              sx={{
                bgcolor: isSeen ? "transparent" : "#f2080820",
                alignItems: "flex-start",
                display: "flex",
                gap: "10px",
                paddingY: "13px",
                transition: "all 0.3s ease",
                "&:hover": { bgcolor: "#f5f5f52b" },
              }}
            >
              {isSeen ? (
                <FaCheck
                  fill={"var(--secondary-color)"}
                  size={10}
                  style={{ marginTop: "3px" }}
                />
              ) : (
                <Box
                  component={"span"}
                  className={style.pulse_wrapper}
                  sx={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    bgcolor: "var(--primary-color)",
                    marginTop: "5px",
                  }}
                ></Box>
              )}
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
          );
        })}
      </Menu>
    </Box>
  );
}