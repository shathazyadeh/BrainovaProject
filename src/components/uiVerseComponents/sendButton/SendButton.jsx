import { useEffect, useMemo, useState } from "react";
import { ButtonBase, Box, Typography } from "@mui/material";
import { keyframes, styled } from "@mui/material/styles";

const PRIMARY = "#ff5569";
const NEUTRAL_1 = "#f7f8f7";
const NEUTRAL_2 = "#e7e7e7";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const wave = keyframes`
  30% {
    opacity: 1;
    transform: translateY(4px);
  }
  50% {
    opacity: 1;
    transform: translateY(-3px);
    color: ${PRIMARY};
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px) translateX(5px) rotate(-90deg);
    color: ${PRIMARY};
    filter: blur(5px);
  }
  30% {
    opacity: 1;
    transform: translateY(4px) translateX(0) rotate(0);
    filter: blur(0);
  }
  50% {
    opacity: 1;
    transform: translateY(-3px) translateX(0) rotate(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0) translateX(0) rotate(0);
    color: inherit;
    filter: blur(0);
  }
`;

const disappear = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translateX(5px) translateY(20px);
    color: ${PRIMARY};
    filter: blur(5px);
  }
`;

const takeOff = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0) rotate(0deg) scale(1);
  }
  60% {
    opacity: 1;
    transform: translateX(70px) rotate(45deg) scale(2);
  }
  100% {
    opacity: 0;
    transform: translateX(160px) rotate(45deg) scale(0);
  }
`;

const land = keyframes`
  0% {
    transform: translateX(-60px) translateY(30px) rotate(-50deg) scale(2);
    opacity: 0;
    filter: blur(3px);
  }
  100% {
    transform: translateX(0) translateY(0) rotate(0deg) scale(1);
    opacity: 1;
    filter: blur(0);
  }
`;

const contrail = keyframes`
  0% {
    width: 0;
    opacity: 1;
  }
  8% {
    width: 15px;
  }
  60% {
    width: 80px;
    opacity: 0.7;
  }
  100% {
    width: 160px;
    opacity: 0;
  }
`;

const appear = keyframes`
  0% {
    opacity: 0;
    transform: scale(4) rotate(-40deg);
    color: ${PRIMARY};
    filter: blur(4px);
  }
  30% {
    opacity: 1;
    transform: scale(0.6);
    filter: blur(1px);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
    filter: blur(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
`;

const Root = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "animating" && prop !== "success",
})(({ animating, success }) => ({
  position: "relative",
  minWidth: 220,
  height: 72,
  padding: "20px 26px",
  borderRadius: 18,
  border: "none",
  cursor: "pointer",
  overflow: "hidden",
  fontFamily: "Inter, Roboto, Arial, sans-serif",
  textShadow: "0 1px 1px rgba(0,0,0,0.15)",
  boxShadow:
    "0 0.5px 0.5px 1px rgba(255,255,255,0.2), 0 10px 20px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.05)",
  transition: "all 0.3s ease",
  transform: animating ? "scale(1)" : "scale(1)",
  "&:hover": {
    transform: success ? "scale(1)" : "scale(1.02)",
    boxShadow:
      "0 0 1px 2px rgba(255,255,255,0.3), 0 15px 30px rgba(0,0,0,0.3), 0 10px 3px -3px rgba(0,0,0,0.04)",
  },
  "&:active": {
    transform: "scale(1)",
    boxShadow:
      "0 0 1px 2px rgba(255,255,255,0.3), 0 10px 3px -3px rgba(0,0,0,0.2)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: 18,
    border: "2.5px solid transparent",
    background: `
      linear-gradient(${NEUTRAL_1}, ${NEUTRAL_2}) padding-box,
      linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.45)) border-box
    `,
    zIndex: 0,
    transition: "all 0.4s ease",
  },
  "&:hover::after": {
    transform: success ? "none" : "scale(1.05, 1.1)",
    boxShadow: success ? "none" : "inset 0 -1px 3px 0 rgba(255,255,255,1)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    inset: "7px 6px 6px 6px",
    borderRadius: 30,
    background: `linear-gradient(to top, ${NEUTRAL_1}, ${NEUTRAL_2})`,
    filter: "blur(0.5px)",
    zIndex: 1,
  },
}));

const Outline = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: "-2px -3.5px",
  borderRadius: "inherit",
  overflow: "hidden",
  zIndex: 2,
  opacity: 0,
  transition: "opacity 0.4s ease",
  ".MuiButtonBase-root:hover &": {
    opacity: 1,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    inset: "-100%",
    background:
      "conic-gradient(from 180deg, transparent 60%, white 80%, transparent 100%)",
    animation: `${spin} 2s linear infinite`,
  },
}));

const StateWrap = styled(Box)({
  position: "relative",
  zIndex: 3,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});

const TextRow = styled(Typography)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 18,
  fontWeight: 600,
  lineHeight: 1,
  letterSpacing: 0,
  color: "#111",
  whiteSpace: "pre",
});

function PlaneIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <path
        d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z"
        fill="currentColor"
      />
      <path
        d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      height="24"
      width="24"
      strokeWidth="0.5px"
      stroke="black"
      style={{ overflow: "visible" }}
    >
      <path
        fill="currentColor"
        d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
      />
      <path
        fill="currentColor"
        d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z"
      />
    </svg>
  );
}

function AnimatedLetters({
  text,
  variant,
  animateOut = false,
  delayStep = 0.03,
  startIndex = 0,
}) {
  return (
    <TextRow component="div">
      {text.split("").map((char, i) => (
        <Box
          key={`${variant}-${i}-${char}`}
          component="span"
          sx={{
            display: "inline-block",
            opacity: 0,
            animation: animateOut
              ? `${disappear} 0.6s ease forwards ${(startIndex + i) * delayStep}s`
              : `${slideDown} 0.8s ease forwards ${(startIndex + i) * delayStep}s`,
            ".MuiButtonBase-root:hover &": !animateOut
              ? {
                  animation: `${wave} 0.5s ease forwards ${i * 0.02}s`,
                  opacity: 1,
                }
              : undefined,
            ...(char === " " ? { width: "0.38em" } : {}),
            ...(variant === "default" && i === 3 ? { marginRight: "0.25em" } : {}),
          }}
        >
          {char === " " ? "\u00A0" : char}
        </Box>
      ))}
    </TextRow>
  );
}

export default function SendButton({
  onClick,
  isSuccess,
  resetAfter = 2500,
  defaultText = "Send Report",
  sentText = "Sent",
  disabled = false,
}) {
    const [phase, setPhase] = useState("idle");

  useEffect(() => {
  if (isSuccess) {
    setPhase("sending");

    setTimeout(() => {
      setPhase("sent");
    }, 800);

    if (resetAfter > 0) {
      setTimeout(() => {
        setPhase("idle");
      }, resetAfter + 800);
    }
  }
}, [isSuccess]);

  const sent = phase === "sent";
const sending = phase === "sending";

  const handleClick = async (e) => {
  if (disabled || phase === "sending") return;

  await onClick?.(e);

};

  const defaultLetters = useMemo(
    () => <AnimatedLetters text={defaultText} variant="default" />,
    [defaultText]
  );

  const sentLetters = useMemo(
    () => (
      <AnimatedLetters
        text={sentText}
        variant="sent"
        startIndex={5}
        delayStep={0.2}
      />
    ),
    [sentText]
  );

  return (
    <Root
      animating={sending ? 1 : 0}
      success={sent ? 1 : 0}
      onClick={handleClick}
      disabled={disabled}
      focusRipple={false}
    >
      <Outline />

      <StateWrap>
        {/* Default state */}
        <Box
          sx={{
            position: sending ? "absolute" : "relative",
            display: "flex",
            alignItems: "center",
            pl: "29px",
            zIndex: 3,
            display: sent ? "none" : "flex",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              my: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: sending ? "rotate(0deg) scale(1.25)" : "scale(1.25)",
              transition: "all 0.3s ease",
              color: "#111",
              ".MuiButtonBase-root:hover &": sending
                ? undefined
                : {
                    transform: "rotate(45deg) scale(1.25)",
                  },
              "& svg": {
                animation: sending
                  ? `${takeOff} 0.8s linear forwards`
                  : `${land} 0.6s ease forwards`,
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: "50%",
                left: "-5px",
                height: "2px",
                width: sending ? "0px" : "0px",
                background:
                  "linear-gradient(to right, transparent, rgba(0,0,0,0.5))",
                animation: sending
                  ? `${contrail} 0.8s linear forwards`
                  : "none",
              },
            }}
          >
            <PlaneIcon />
          </Box>

          <Box sx={{ visibility: sending ? "hidden" : "visible" }}>
            {sending ? (
              <AnimatedLetters
                text={defaultText}
                variant="default-out"
                animateOut
              />
            ) : (
              defaultLetters
            )}
          </Box>

          {sending && (
            <Box sx={{ position: "absolute", left: "29px" }}>
              <AnimatedLetters
                text={defaultText}
                variant="default-hide"
                animateOut
              />
            </Box>
          )}
        </Box>

        {/* Sent state */}
        <Box
          sx={{
            display: sent ? "flex" : "none",
            alignItems: "center",
            zIndex: 3,
            pl: 0,
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 1,
              color: "#111",
              transform: "scale(1.25)",
              opacity: 0,
              animation: sent ? `${appear} 1.2s ease forwards 0.8s` : "none",
            }}
          >
            <CheckIcon />
          </Box>

          {sentLetters}
        </Box>
      </StateWrap>
    </Root>
  );
}