import { Box, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaRegEdit } from "react-icons/fa";
import DashboardNavbar from "../../../components/muiComponents/dashboardNavbar/DashboardNavbar";
import Loader from "../../../components/uiVerseComponents/loader/Loader";
import useGetMyallFeedbacks from "../../../hooks/supervisorHooks/useGetMyallFeedbacks";
import UsersSearch from "../../../components/usersSearch/UsersSearch";
import useDeleteFeedback from "../../../hooks/supervisorHooks/useDeleteFeedback";
import BasicModal from "../../../components/muiComponents/basicModal/BasicModal";

function SupervisorFeedback() {
  const { isError, error, isLoading, data } = useGetMyallFeedbacks();
  const { deleteFeedbackMutation } = useDeleteFeedback();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  console.log("my feedbacks:", data);

  const handleDeleteFeedback = async (feedbackId) => {
    await deleteFeedbackMutation.mutateAsync(feedbackId);
  };

  const handleChangeFeedback = async (feedback) => {
    setOpen(true);
    setSelectedFeedback(feedback);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isError) {
    //server errors
    return (
      <Box
        component={"section"}
        className="server_error_section flex_column"
        sx={{
          bgcolor: "var(--navy-color)",
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Typography
          component={"h1"}
          variant="h5"
          sx={{ color: "white", fontWeight: "700", textAlign: "center" }}
        >
          {error?.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "var(--navy-color)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DashboardNavbar />
      <Box
        component={"section"}
        sx={{
          paddingBottom: "50px",
          flexGrow: 1,
          alignItems: "flex-start",
          display: "block",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="lg">
          {isError && (
            <Box
              component={"section"}
              className="server_error_section flex_column"
              sx={{
                bgcolor: "var(--navy-color)",
                position: "absolute",
                inset: 0,
                top: "90px",
                left: "200px",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
                "@media (max-width:899px)": {
                  left: "0px",
                },
              }}
            >
              <Typography
                component={"h1"}
                variant="h5"
                sx={{
                  color: "white",
                  fontWeight: "700",
                  textAlign: "center",
                  "@media (max-width:456px)": {
                    fontSize: "20px",
                  },
                }}
              >
                {error?.message}
              </Typography>
            </Box>
          )}
          {isLoading && (
            <Box
              sx={{
                bgcolor: "var(--navy-color)",
                position: "absolute",
                inset: 0,
                top: "90px",
                left: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
                "@media (max-width:899px)": {
                  left: "0px",
                },
              }}
            >
              <Loader />
            </Box>
          )}

          <Box className="section_titel">
            <Typography
              component={"h1"}
              variant="h4"
              sx={{
                color: "#fff",
                fontFamily: "var(--primary-font)",
                fontWeight: "600",
                display: "inline-block",
                marginRight: "10px",
                paddingTop: { xs: "30px", md: "0px" },
                "@media (max-width:700px)": { fontSize: "22px" },
              }}
            >
              Feedback
            </Typography>
            <Typography
              component={"span"}
              sx={{
                color: "#fff",
                fontFamily: "var(--primary-font)",
                fontSize: "20px",
                "@media (max-width:700px)": { fontSize: "15px" },
              }}
            >
              <Typography
                component={"span"}
                sx={{
                  color: "var(--primary-color)",
                  fontFamily: "var(--primary-font)",
                }}
              >
                {data?.totalCount}
              </Typography>{" "}
              feedback entries
            </Typography>
          </Box>
          <Box className="search" sx={{ paddingTop: "23px" }}>
            <UsersSearch search={search} setSearch={setSearch} />
          </Box>

          {data?.items
            .filter(
              (
                feedbacks, //لفتلترة الداتا حسب السيرش
              ) =>
                feedbacks.studentName
                  ?.toLowerCase()
                  .includes(search.toLowerCase()),
            )
            .map((feedback) => (
              <Box className="feedback_card" key={feedback.id}>
                <Box
                  component={"section"}
                  className="Supervisor_feedback"
                  sx={{
                    borderLeft: "5px solid red",
                    borderRadius: "10px",
                    bgcolor: "#3636365b",
                    padding: "11px",
                    marginBottom: "30px",
                    transition: "all 0.5s ease",
                    "&:hover": { transform: "scale(1.03)" },
                  }}
                >
                  <Box
                    className="supervisor_feedback-info"
                    sx={{ display: "flex", paddingBottom: "5px" }}
                  >
                    <Typography sx={{ color: "#fff", flexGrow: "1" }}>
                      {feedback.supervisorName}
                    </Typography>
                    <Typography
                      sx={{
                        color: "red",
                        "@media (max-width:550px)": {
                          fontSize: "11px",
                        },
                      }}
                    >
                      {" "}
                      {feedback.createdAt.split("T")[0]}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#758492",
                        paddingLeft: "6px",
                        "@media (max-width:550px)": {
                          fontSize: "11px",
                        },
                      }}
                    >
                      {" "}
                      {new Date(feedback.createdAt).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        },
                      )}
                    </Typography>
                  </Box>

                  <Box
                    className="student_info"
                    sx={{
                      display: "flex",
                      marginBottom: "18px",
                      "@media (max-width:410px)": { flexDirection: "column" },
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#758492",
                        fontWeight: "400",
                        fontSize: "13px",
                        "@media (max-width:550px)": {
                          fontSize: "11px",
                        },
                      }}
                    >
                      Student: {feedback.studentName} ·
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        sx={{
                          color: "#758492",
                          fontWeight: "400",
                          fontSize: "13px",
                          paddingX: "5px",
                          "@media (max-width:410px)": { paddingLeft: "0px" },
                          "@media (max-width:550px)": {
                            fontSize: "11px",
                          },
                        }}
                      >
                        {feedback.predictionResult}{" "}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#758492",
                          fontWeight: "400",
                          fontSize: "13px",
                          "@media (max-width:550px)": {
                            fontSize: "11px",
                          },
                        }}
                      >
                        · {feedback.reportCreatedAt.split("T")[0]}
                        {" ( "}
                        {new Date(feedback.reportCreatedAt).toLocaleTimeString(
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
                  </Box>

                  <Typography
                    sx={{
                      color: "#d3d9de",
                      fontWeight: "300",
                      wordBreak: "break-word",
                      paddingRight: "10px",
                      height: "38px",
                      overflowY: "auto",
                      "&::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "var(--primary-color)",
                        borderRadius: "3px",
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "#2a2a3d",
                      },
                    }}
                  >
                    {feedback.comment}{" "}
                  </Typography>
                  <Box
                    className="action_icons"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: "5px",
                      marginTop: "10px",
                    }}
                  >
                    <DeleteIcon
                      sx={{
                        color: "var(--primary-color)",
                        cursor: "pointer",
                        fontSize: "20px",
                      }}
                      onClick={() => handleDeleteFeedback(feedback.id)}
                    />
                    <FaRegEdit
                      size={16}
                      style={{
                        color: "var(--secondary-color)",
                        cursor: "pointer",
                      }}
                      onClick={() => handleChangeFeedback(feedback)}
                    />
                  </Box>
                  <BasicModal
                    open={open}
                    handleClose={handleClose}
                    reportId={selectedFeedback?.reportId}
                    feedback={selectedFeedback}
                    type="feedback"
                  />
                </Box>
              </Box>
            ))}
        </Container>
      </Box>
      {/*footer */}
      <Box
        className="lower_footer"
        sx={{
          borderTop: "1px solid rgba(53, 53, 53, 0.93)",
          width: "fit-content",
          margin: "auto",
          paddingX: { xs: "0px", md: "200px" },
          textAlign: "center",
          marginTop: { xs: "10px", md: "0px" },
        }}
      >
        <Typography
          component={"p"}
          sx={{ color: "var(--mid-gray-color)", paddingY: "30px" }}
        >
          © 2026{" "}
          <Typography
            component={"span"}
            sx={{ color: "var(--dark-red-color)" }}
          >
            Brainova
          </Typography>
          . All rights reserved. | Built for medical education and research
          purposes.
        </Typography>
      </Box>
    </Box>
  );
}

export default SupervisorFeedback;