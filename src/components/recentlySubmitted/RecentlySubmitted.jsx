import { Box, Typography, Button, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { FiFileText } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";

function RecentlySubmitted({
  recentSubmitted,
  isFetching,
  setSelectedId,
  isCustomScreen,
  isSidePanel,
  sparklesNotebookImg,
  timeAgo,
}) {
  return (
    <Box
      className="recently_submitted"
      sx={{
        display: isSidePanel
          ? { xs: "none", md: "block" }
          : { xs: "block", md: "none" },
        bgcolor: "#8986862b",
        direction: "rtl", // لجعل السكرولر عاليسار بدي الديفولت الي هو يمين
        borderTopRightRadius: "20px",
        borderBottomRightRadius: "20px",
        paddingX: "14px",
        paddingTop: "20px",
        position: "relative",
        overflowY: "auto",
        ...(isSidePanel
          ? { maxHeight: "925px" }
          : { paddingY: "20px", marginTop: "23px", height: "337px" }),
        "&::-webkit-scrollbar": { width: "6px" },
        "&::-webkit-scrollbar-thumb": {
          bgcolor: "var(--primary-color)",
          cursor: "grab",
        },
        "&::-webkit-scrollbar-track": { bgcolor: "#2a2a3d" },
      }}
    >
      <Box sx={{ direction: "ltr" }}>
        {" "}
        {/* wrapper برجع المحتوى الداخلي لليمين */}
        <Typography
          sx={{
            fontFamily: "var(--primary-font)",
            fontWeight: "600",
            color: "#fff",
            fontSize: { xs: "15px", sm: "17px" },
            marginBottom: "10px",
          }}
        >
          Recently Submitted
        </Typography>
        <Typography
          className="no_of_notifications"
          sx={{
            color: "var(--secondary-color)",
            fontWeight: "500",
            fontSize: "10px",
            position: "absolute",
            top: "25px",
            right: "14px",
            ...(isSidePanel
              ? { "@media (max-width:1320px)": { top: "5px", left: "12px" } }
              : { "@media (max-width:400px)": { top: "5px", left: "12px" } }),
          }}
        >
          {recentSubmitted?.length} new notifications
        </Typography>
        {recentSubmitted?.length === 0 ? (
          <Box
            className="no_recent_submissions flex_column"
            sx={{
              gap: "20px",
              alignItems: "center",
              ...(isSidePanel ? { paddingTop: "200px", height: "868px" } : {}),
            }}
          >
            <Box
              component={"img"}
              src={sparklesNotebookImg}
              alt="Add new clipboard item icon"
              sx={{
                border: "1px solid #cccccc2b",
                borderRadius: "20px",
                padding: "20px",
                ...(isSidePanel
                  ? {
                      width: "260px",
                      "@media (max-width:1360px)": { width: "220px" },
                      "@media (max-width:1120px)": { width: "180px" },
                    }
                  : {
                      width: "160px",
                      "@media (max-width:800px)": { width: "130px" },
                      "@media (max-width:400px)": {
                        width: "100px",
                        marginTop: "20px",
                      },
                    }),
              }}
            />
            <Typography
              sx={{
                color: "#fff",
                fontFamily: "var(--primary-font)",
                fontWeight: "500",
                ...(isSidePanel
                  ? {
                      fontSize: "17px",
                      "@media (max-width:1198px)": { fontSize: "15px" },
                    }
                  : {
                      fontSize: "17px",
                      "@media (max-width:800px)": { fontSize: "15px" },
                      "@media (max-width:400px)": { fontSize: "12px" },
                    }),
              }}
            >
              No recent submissions
            </Typography>
            <Typography
              sx={{
                color: "var(--secondary-color)",
                whiteSpace: "nowrap",
                ...(isSidePanel
                  ? { "@media (max-width:1240px)": { fontSize: "12px" },
                      "@media (max-width:970px)": { fontSize: "10px" }
                    }
                  : {
                      "@media (max-width:800px)": { fontSize: "12px" },
                      "@media (max-width:400px)": { fontSize: "10px" },
                    }),
              }}
            >
              You haven't submitted any cases recently.
              <br />
              Your recent submissions will appear here.
            </Typography>
            <Button
              className="upper_case"
              component={RouterLink}
              to="/predict-tumor"
              sx={{
                bgcolor: "var(--primary-color)",
                color: "white",
                fontWeight: "600",
                borderRadius: "6px",
                paddingX: "25px",
                paddingY: "7px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                width: "fit-content",
                transition: "all 0.3s ease",
                "&:hover": { bgcolor: "#fff", color: "var(--navy-color)" },
                ...(isSidePanel
                  ? {
                      fontSize: "14px",
                      "@media (max-width:1198px)": { fontSize: "12px" },
                    }
                  : {
                      fontSize: "14px",
                      "@media (max-width:800px)": { fontSize: "12px" },
                      "@media (max-width:400px)": { fontSize: "10px" },
                    }),
              }}
            >
              <Box
                component={FaPlus}
                sx={{
                  fontWeight: "800",
                  ...(isSidePanel
                    ? { "@media (max-width:1198px)": { fontSize: "10px" } }
                    : {
                        "@media (max-width:800px)": { fontSize: "10px" },
                        "@media (max-width:400px)": { fontSize: "8px" },
                      }),
                }}
              />
              Submit New Case
            </Button>
          </Box>
        ) : isSidePanel ? (
          // Desktop
          recentSubmitted?.map((report) => (
            <Box
              onClick={() => {
                if (isFetching) return;
                setSelectedId(report.reportId);
              }}
              key={report.reportId}
              sx={{
                marginBottom: "10px",
                padding: "5px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "pointer",
                bgcolor: "#6b6a6a3f",
              }}
            >
              <Typography
                sx={{
                  bgcolor: "#291A1F",
                  borderRadius: "12px",
                  padding: "8px",
                  display: "flex",
                  width: "fit-content",
                }}
              >
                <FiFileText color="var(--primary-color)" />
              </Typography>
              <Box>
                <Typography
                  component={"span"}
                  sx={{
                    color: "var(--secondary-color)",
                    fontWeight: "400",
                    fontSize: "13px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Typography
                    component={"span"}
                    sx={{
                      color: "#fff",
                      fontFamily: "var(--primary-font)",
                      fontWeight: "600",
                      fontSize: "13px",
                      "@media (max-width:1398px)": {
                        display: "block",
                        paddingRight: "90px",
                      },
                    }}
                  >
                    {report.reportCode}{" "}
                  </Typography>
                  was recently submitted
                </Typography>
                <Typography
                  sx={{ color: "var(--secondary-color)", fontSize: "10px" }}
                >
                  {timeAgo(report.reportSubmittedAt)}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          // Mobile
          <Grid container spacing={1}>
            {recentSubmitted.map((report) => (
              <Grid
                item
                size={{ xs: isCustomScreen ? 12 : 6 }}
                key={report.reportId}
              >
                <Box
                  onClick={() => {
                    if (isFetching) return;
                    setSelectedId(report.reportId);
                  }}
                  sx={{
                    padding: "5px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    cursor: "pointer",
                    bgcolor: "#6b6a6a3f",
                  }}
                >
                  <Typography
                    sx={{
                      bgcolor: "#291A1F",
                      borderRadius: "12px",
                      padding: "8px",
                      display: "flex",
                      width: "fit-content",
                    }}
                  >
                    <FiFileText color="var(--primary-color)" />
                  </Typography>
                  <Box>
                    <Typography
                      component={"span"}
                      sx={{
                        color: "var(--secondary-color)",
                        fontWeight: "400",
                        fontSize: "13px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Typography
                        component={"span"}
                        sx={{
                          color: "#fff",
                          fontFamily: "var(--primary-font)",
                          fontWeight: "600",
                          fontSize: "13px",
                          "@media (max-width:730px)": {
                            display: "block",
                            paddingRight: "90px",
                          },
                          "@media (max-width:500px)": {
                            display: "inline",
                            paddingRight: "0px",
                          },
                          "@media (max-width:404px)": {
                            display: "block",
                            paddingRight: "90px",
                          },
                        }}
                      >
                        {report.reportCode}{" "}
                      </Typography>
                      was recently submitted
                    </Typography>
                    <Typography
                      sx={{ color: "var(--secondary-color)", fontSize: "10px" }}
                    >
                      {timeAgo(report.reportSubmittedAt)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default RecentlySubmitted;