import { Box } from "@mui/material";
import { FaExchangeAlt } from "react-icons/fa";
import { useState } from "react";

export default function TooltipButton({ onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      sx={{ display: "inline-block", position: "relative" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* الشريط */}
      <Box onClick={onClick}
        sx={{
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(-90deg, #fa0505 0%, #bebbbb 100%)",
          borderRadius: "50px",
          height: 50,
          width: hovered ? "190px" : "50px",
          transition: "all 0.3s ease",
          overflow: "hidden",
          cursor: "pointer",
          gap: hovered ? 1.5 : 0,
        }}
      >
        {/* الدائرة */}
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "var(--primary-color)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <FaExchangeAlt color="#fff" size={20} />
        </Box>

        {/* النص */}
        <Box
          sx={{
            color: "#fff",
            fontWeight: 600,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-10px)",
            transition: "all 0.3s ease",
            whiteSpace: "nowrap",
          }}
        >
          Change Image
        </Box>
      </Box>
    </Box>
  );
}