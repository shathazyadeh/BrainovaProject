import { Box, Typography } from "@mui/material";

export default function Offline() {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "var(--navy-color)",
          color: "#fff",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: { xs: "14px", md: "20px" },
            textAlign: "center",
          }}
        >
          You're offline. Please check your internet connection.
        </Typography>
      </Box>
    );

}