import Button from "@mui/material/Button";
import ListSubheader from "@mui/material/ListSubheader";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { LuCheckCheck, LuNotebookPen } from "react-icons/lu";
import { IoMdNotificationsOutline, IoMdClose } from "react-icons/io";
import useGetAllFeedbacks from "../../../hooks/studentHooks/useGetAllFeedbacks";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMarksAsSeen from "../../../hooks/studentHooks/useMarksAsSeen";
import useMarkAllAsSeen from "../../../hooks/studentHooks/useMarkAllAsSeen";
import { Badge, Grid, Modal, useMediaQuery } from "@mui/material";
import useGetUnseenFeedbacks from "../../../hooks/studentHooks/useGetUnseenFeedbacks";
import { useQueryClient } from "@tanstack/react-query";

const StyledListHeader = styled(ListSubheader)({
  backgroundImage: "var(--Paper-overlay)",
});

export default function NotificationsMenu() {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isError, error, isLoading, data } = useGetAllFeedbacks();
  const { isError: isUnseenFeedbacksError, error: unseenFeedbacksError, isLoading: isUnseenFeedbacksLoading, data: unseenFeedbacksData } = useGetUnseenFeedbacks();
  const { markAsSeen, serverErrors, isLoading: isMarkSeenLoading } = useMarksAsSeen();
  const { usePostMutation: markAllSeenMutation, serverErrors: serverMarkAllSeenErrors, isLoading: isMarkAllSeenLoading } = useMarkAllAsSeen();
  const [seenIds, setSeenIds] = useState([]);
  const [openUnseenOnly, setOpenUnseenOnly] = useState(false);
  const [openModal, setOpenModal] = useState(false); //عشان نسكر ونفتح المودال
  const [selectedFeedback, setSelectedFeedback] = useState(null); // الي رح نعرضه بالمودال
  const handelMarkSeen = async (feedback) => {
    const isAlreadySeen =
      feedback.isSeen || seenIds.includes(feedback.feedbackId); //عشان اذا هو اصلا سيين ما نعمل ريكويست لما ينكبس عليه

    if (isAlreadySeen) {
      setSelectedFeedback(feedback);
      setOpenModal(true);
      return;
    }

    setSeenIds((prevIds) => [...prevIds, feedback.feedbackId]); //ضفنا الفيدباك الي وصل على قائمة الفيداباكات السابقة المقروءة

    try {
      await markAsSeen(feedback.feedbackId);
      setSelectedFeedback(feedback);
      setOpenModal(true);
    } catch (err) {
      setSeenIds(
        (prevIds) => prevIds.filter((id) => id !== feedback.feedbackId), //في حال فشل الطلب بنشيلها من القائمة
      );
    }
  };

  const handleMarkAllSeen = async () => {
    await markAllSeenMutation.mutateAsync();
    queryClient.invalidateQueries({ queryKey: ["studentFeedbacks"] });
    queryClient.invalidateQueries({ queryKey: ["studentUnseenFeedbacks"] });
  };
  const openUnreedList = async () => {
    setOpenUnseenOnly(true);
  };
  const closeUnreedList = async () => {
    setOpenUnseenOnly(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => { //عشان المنيو تسكر تلقائي عند السكرول
    const handleScroll = () => {
      if (open) {
        handleClose();
        setOpenModal(false)
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  return (
    <Box>
      <Button
        disableRipple
        sx={{
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        id="basic-button"
        aria-controls={open ? "grouped-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge
          badgeContent={
            unseenFeedbacksData?.items?.filter(
              (f) => !seenIds.includes(f.feedbackId),
            ).length
          }
          color="error"
          max={99}
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "9px",
              height: "16px",
              minWidth: "16px",
              padding: "0 4px",
              top: 6,
              right: 2,
            },
          }}
        >
          <Box
            className="notifications_icon"
            sx={{
              bgcolor: "#201F1F",
              padding: "6px",
              borderRadius: "10px",
              cursor: "pointer",
              display: "flex",
            }}
          >
            <IoMdNotificationsOutline size={22} color="#fff" />
          </Box>
        </Badge>
      </Button>
      <Menu
        id="grouped-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock
        hideBackdrop={false}
        transitionDuration={0}
        PaperProps={{
          sx: {
            border: "1px solid rgba(207, 25, 25, 0.44)",
            bgcolor: "var(--navy-color)",
            borderRadius: "10px",
            paddingTop: "10px",
            marginLeft: isMobile ? "0px" : "-20px",
          },
        }}
        sx={{
          "& .MuiMenu-list": {
            paddingBottom: "0 !important",
            maxHeight: isMobile ? "200px" : "300px",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "var(--primary-color)",
              borderRadius: "10px",
              transition: "0.3s",
              cursor: "grab",
            },
          },
        }}
      >
        <Box className="notification_header">
          <Grid container spacing={5}>
            <Grid
              item
              size={{ xs: 6 }}
              sx={{ display: "flex", paddingLeft: "10px", gap: "10px" }}
            >
              <Typography
                onClick={closeUnreedList}
                sx={{
                  fontFamily: "var(--primary-font)",
                  fontWeight: "600",
                  fontSize: "11px",
                  color: openUnseenOnly ? "#fff" : "var(--secondary-color)",
                  marginBottom: "5px",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                }}
              >
                All notifications
              </Typography>
              <Typography
                onClick={openUnreedList}
                sx={{
                  fontFamily: "var(--primary-font)",
                  fontWeight: "600",
                  fontSize: "11px",
                  color: openUnseenOnly ? "var(--secondary-color)" : "#fff",
                  marginBottom: "5px",
                  cursor: "pointer",
                }}
              >
                Unreed
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              size={{ xs: 6 }}
            >
              <Typography
                onClick={
                  !isMarkAllSeenLoading && data?.items?.some((f) => !f.isSeen)
                    ? handleMarkAllSeen
                    : undefined
                }
                sx={{
                  color: "var(--primary-color)",
                  fontSize: "10px",
                  marginRight: "10px",
                  display: "flex",
                  alignItems: "center",
                  cursor: data?.items?.some((f) => !f.isSeen)
                    ? "pointer"
                    : "not-allowed",
                }}
              >
                <LuCheckCheck style={{ marginRight: "5px" }} />
                Mark all read
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {isLoading || isUnseenFeedbacksLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <Typography
              sx={{
                color: "var(--secondary-color)",
                fontSize: isMobile ? "10px" : "12px",
              }}
            >
              Loading notifications...
            </Typography>
          </Box>
        ) : isError || isUnseenFeedbacksError ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <Typography
              sx={{ color: "red", fontSize: isMobile ? "10px" : "12px" }}
            >
              Failed to load notifications
            </Typography>
          </Box>
        ) : openUnseenOnly ? (
          unseenFeedbacksData?.items?.filter(
            (f) => !seenIds.includes(f.feedbackId),
          ).length === 0 ? (
            <Box
              sx={{
                color: "var(--secondary-color)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingY: "30px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "var(--primary-font)",
                  fontSize: isMobile ? "10px" : "12px",
                  bgcolor: "#fa040433",
                  paddingX: "10px",
                  paddingY: "3px",
                  borderRadius: "15px",
                }}
              >
                No unread notifications
              </Typography>
            </Box>
          ) : (
            unseenFeedbacksData?.items
              ?.filter((feedback) => !seenIds.includes(feedback.feedbackId))
              .map((feedback) => {
                const isSeen =
                  feedback.isSeen || seenIds.includes(feedback.feedbackId);
                return (
                  <MenuItem
                    onClick={() =>
                      !isMarkSeenLoading && handelMarkSeen(feedback)
                    }
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
                        sx={{
                          fontSize: "11px",
                          color: "var(--secondary-color)",
                        }}
                      >
                        {!isMobile
                          ? feedback.comment.length > 55
                            ? feedback.comment.slice(0, 55) + "..."
                            : feedback.comment
                          : // moblie
                            feedback.comment.length > 44
                            ? feedback.comment.slice(0, 44) + "..."
                            : feedback.comment}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "10px",
                          color: "var(--secondary-color)",
                          fontWeight: "300",
                        }}
                      >
                        {feedback.createdAt.split("T")[0]}
                        {" ( "}
                        {new Date(feedback.createdAt).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          },
                        )}{" "}
                        {")"}
                      </Typography>
                    </Box>
                  </MenuItem>
                );
              })
          )
        ) : data?.items?.length === 0 ? (
          <Box
            sx={{
              color: "var(--secondary-color)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingY: "30px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "var(--primary-font)",
                fontSize: isMobile ? "10px" : "12px",
                bgcolor: "#fa040433",
                paddingX: "10px",
                paddingY: "3px",
                borderRadius: "15px",
              }}
            >
              No notifications yet
            </Typography>
          </Box>
        ) : (
          data?.items?.map((feedback) => {
            const isSeen =
              feedback.isSeen || seenIds.includes(feedback.feedbackId);

            return (
              <MenuItem
                onClick={() => !isMarkSeenLoading && handelMarkSeen(feedback)}
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
                    sx={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      bgcolor: "var(--primary-color)",
                      marginTop: "5px",
                    }}
                  > 
                  </Box>
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
                    {!isMobile
                      ? feedback.comment.length > 55
                        ? feedback.comment.slice(0, 55) + "..."
                        : feedback.comment
                      : //moblie
                        feedback.comment.length > 44
                        ? feedback.comment.slice(0, 44) + "..."
                        : feedback.comment}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "10px",
                      color: "var(--secondary-color)",
                      fontWeight: "300",
                    }}
                  >
                    {feedback.createdAt.split("T")[0]}
                    {" ( "}
                    {new Date(feedback.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    {")"}
                  </Typography>
                </Box>
              </MenuItem>
            );
          })
        )}
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          slotProps={{
            backdrop: {
              sx: {
                backdropFilter: "blur(5px)",
                backgroundColor: "rgba(0,0,0,0.5)",
              },
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: "600px",
              maxHeight: "300px",
              overflowY: "auto",
              bgcolor: "#0a0a0a",
              color: "#fff",
              borderRadius: "15px",
              border: "1px solid #35353568",
              p: 3,
              boxShadow: "0 0 15px rgba(207, 25, 25, 0.81)",
              outline: "none",
              "&:focus": {
                outline: "none",
              },
              "&:focus-visible": {
                outline: "none",
              },
              "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "var(--primary-color)",
              borderRadius: "10px",
              transition: "0.3s",
              cursor: "grab",
            },
            }}
          >
            <Box
              className="modal_title"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  paddingTop: "4px",
                  paddingBottom: "10px",
                }}
              >
                <LuNotebookPen size={25} color="var(--primary-color)" />
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: { xs: "17px", sm: "20px"},
                    fontWeight: "500",
                    letterSpacing: "1px",
                    paddingLeft: "10px",
                  }}
                >
                  {selectedFeedback?.supervisorName}
                </Typography>
              </Box>
              <IoMdClose
                size={20}
                onClick={() => setOpenModal(false)}
                style={{ cursor: "pointer" }}
              />
            </Box>
            <Typography sx={{ color: "var(--secondary-color)" , fontSize: { xs: "13px", sm: "17px"}, wordBreak: "break-word"}}>
              {selectedFeedback?.comment}
            </Typography>
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontSize: "10px",
                fontWeight: "400",
                marginTop: "20px",
              }}
            >
              {selectedFeedback?.createdAt.split("T")[0]}
              {" ( "}
              {new Date(selectedFeedback?.createdAt).toLocaleTimeString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                },
              )}{" "}
              {")"}
            </Typography>
          </Box>
        </Modal>
      </Menu>
    </Box>
  );
}