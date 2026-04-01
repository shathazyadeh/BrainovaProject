import { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";

const pad = (n) => String(n).padStart(2, "0");

function Digit({ value }) {
  const ref = useRef(null);
  const prevVal = useRef(value);

  useEffect(() => {
    if (prevVal.current !== value && ref.current) {
      ref.current.classList.remove("flip");
      void ref.current.offsetWidth;
      ref.current.classList.add("flip");
      prevVal.current = value;
    }
  }, [value]);

  return (
    <Box
      ref={ref}
      sx={{
        paddingX:"10px",
        bgcolor: "#222",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #333",
        overflow: "hidden",
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: "20px",
          fontWeight: "600",
          color: "#ff0000",
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

export default function FlipClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const h = pad(time.getHours());
  const m = pad(time.getMinutes());
  const s = pad(time.getSeconds());

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap');
        @keyframes flip {
          0%   { transform: rotateX(0deg); }
          50%  { transform: rotateX(-90deg); }
          100% { transform: rotateX(0deg); }
        }
        .flip { animation: flip 0.4s ease-in-out; }
      `}</style>

      
        <Box sx={{ display: "flex", gap: "5px",width:"100%",justifyContent:"center"}}>
          <Digit value={h[0]} />
          <Digit value={h[1]} />

          <Typography sx={{height: "40px",display: "flex",alignItems: "center",fontFamily: "'Oswald', sans-serif",fontSize: "30px",fontWeight: "600",color: "#555",}}>
            :
          </Typography>

          <Digit value={m[0]} />
          <Digit value={m[1]} />

          <Typography sx={{height: "40px",display: "flex",alignItems: "center",fontFamily: "'Oswald', sans-serif",fontSize: "30px",fontWeight: "600",color: "#555",}}>
           :
          </Typography>

          <Digit value={s[0]} />
          <Digit value={s[1]} />
        </Box>
    </>
  );
}