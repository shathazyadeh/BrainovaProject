import { Box, Container, Typography } from "@mui/material";
import BrainModel from "../../../components/brainModelComponents/brainModel/BrainModel";
import style from "./LearningHub.module.css";
import wavePic from "./../../../assets/images/learningHub/redWaves.webp";

function LearningHub() {
  return (
    <Box
      sx={{
        paddingTop: "50px",
        paddingBottom: "100px",
        backgroundImage: `url(${wavePic})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="lg" sx={{}}>
        <Box
          className="title flex_column"
          sx={{
            color: "#fff",
            textAlign: "center",
            paddingBottom: "60px",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontFamily: "var(--primary-font)",
              color: "var(--navy-color)",
              fontSize: "70px",
              fontWeight: "800",
              "@media (max-width:974px)": { fontSize: "45px" },
              "@media (max-width:642px)": { fontSize: "30px" },
            }}
          >
            {"Explore the Human Brain".split(" ").map((word, i) => (
              <Box
                component={"span"}
                key={i}
                style={{ marginRight: "10px", display: "inline-block" }}
              >
                {word.split("").map((char, j) => (
                  <Box
                    component={"span"}
                    key={j}
                    className={style.char}
                    style={{ animationDelay: `${(i * 5 + j) * 0.05}s` }}
                  >
                    {char}
                  </Box>
                ))}
              </Box>
            ))}
          </Typography>
          <Typography
            className={style.animate_title}
            sx={{
              fontFamily: "var(--primary-font)",
              fontSize: "20px",
              color: "#800e0e",
              width: { xs: "auto", md: "745px" },
              paddingTop: "10px",
              "@media (max-width:974px)": {
                fontSize: "17px",
              },
              "@media (max-width:642px)": {
                fontSize: "14px",
              },
            }}
          >
            {"Interactively explore how different brain tumors affect brain regions and their functions, and understand their impact on cognition, behavior, and neurological processes."
              .split("")
              .map((char, i) => (
                <Box
                  component={"span"}
                  key={i}
                  className={style.char}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {char === " " ? "\u00A0" : char}
                </Box>
              ))}
          </Typography>
        </Box>
      </Container>
      <BrainModel />
    </Box>
  );
}

export default LearningHub;