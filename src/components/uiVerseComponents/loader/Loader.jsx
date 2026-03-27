import React from "react";
import { Box } from "@mui/material";

const Loader = () => {
  const squares = Array.from({ length: 7 });

  return (
    <Box
      sx={{
        width: 96,
        height: 96,
        position: "relative",
        transform: "rotate(45deg)",
        "& .loader-square": {
          position: "absolute",
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          margin: "2px",
          borderRadius: 0,
          background: "white",
          animation: "square-animation 10s ease-in-out infinite both",
        },
        "& .loader-square:nth-of-type(1)": { animationDelay: "0s" },
        "& .loader-square:nth-of-type(2)": { animationDelay: "-1.4285714286s" },
        "& .loader-square:nth-of-type(3)": { animationDelay: "-2.8571428571s" },
        "& .loader-square:nth-of-type(4)": { animationDelay: "-4.2857142857s" },
        "& .loader-square:nth-of-type(5)": { animationDelay: "-5.7142857143s" },
        "& .loader-square:nth-of-type(6)": { animationDelay: "-7.1428571429s" },
        "& .loader-square:nth-of-type(7)": { animationDelay: "-8.5714285714s" },
        "@keyframes square-animation": {
          "0%": { left: 0, top: 0 },
          "10.5%": { left: 0, top: 0 },
          "12.5%": { left: 32, top: 0 },
          "23%": { left: 32, top: 0 },
          "25%": { left: 64, top: 0 },
          "35.5%": { left: 64, top: 0 },
          "37.5%": { left: 64, top: 32 },
          "48%": { left: 64, top: 32 },
          "50%": { left: 32, top: 32 },
          "60.5%": { left: 32, top: 32 },
          "62.5%": { left: 32, top: 64 },
          "73%": { left: 32, top: 64 },
          "75%": { left: 0, top: 64 },
          "85.5%": { left: 0, top: 64 },
          "87.5%": { left: 0, top: 32 },
          "98%": { left: 0, top: 32 },
          "100%": { left: 0, top: 0 },
        },
      }}
    >
      {squares.map((_, idx) => (
        <Box key={idx} className="loader-square" />
      ))}
    </Box>
  );
};

export default Loader;