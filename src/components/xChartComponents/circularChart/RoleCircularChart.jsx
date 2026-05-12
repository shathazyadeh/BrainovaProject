import { Box, CircularProgress, Typography } from "@mui/material";

function RoleCircularChart({ value, color, title, number, icon }) {
  return (
    <Box
      sx={{
        bgcolor: "rgba(0, 0, 0, 0.46)",
        borderRadius: "24px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={110}
          thickness={4}
          sx={{
            color: "#3c3a3aa8",
          }}
        />

        <CircularProgress
          variant="determinate"
          value={value}
          size={110}
          thickness={4}
          sx={{
            color,
            position: "absolute",
            left: 0,
            borderRadius: "50%",
            filter: `drop-shadow(0 0 6px ${color})`,
            "& .MuiCircularProgress-circle": {
              strokeLinecap: "round",
            },
          }}
        />

        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {icon}
          <Typography sx={{ color: "#fff", fontWeight: "600" }}>
            {value}%
          </Typography>
        </Box>
      </Box>

      <Typography
        sx={{
          color: "#fff",
          marginTop: "5px",
          fontWeight: "600",
          fontSize: "20px",
          "@media (max-width:400px)": { fontSize: "18px" },
        }}
      >
        {title}
      </Typography>

      <Typography sx={{ color: "#9ca3af" }}>{number}</Typography>
    </Box>
  );
}

export default RoleCircularChart;