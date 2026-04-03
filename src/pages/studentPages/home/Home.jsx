import { Box, Container } from "@mui/material"
import Hero from "../../../components/homeComponents/hero/Hero"
import CoreFeature from "../../../components/homeComponents/coreFeatures/CoreFeatures"
import AIinMedicine from "../../../components/homeComponents/aIinMedicine/AIinMedicine";
import ChromaGrid from "../../../components/reactBitsComponents/chromaGrid/ChromaGrid";
import style from "./Home.module.css";

function Home() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          bgcolor: "#0a0a0a",
          backgroundImage: `
    linear-gradient(rgba(255, 0, 0, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 0, 0, 0.08) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      >
        <Container maxWidth="lg">
          <Hero />
        </Container>
      </Box>

      <Box sx={{ bgcolor: "var(--navy-color)" }}>
        <Box
          className={style.rotate_gray_layer}
          sx={{ position: "absolute", bgcolor: "#2a2a2a" }}
        ></Box>
        <Box
          className={style.rotate_red_layer}
          sx={{ position: "absolute", bgcolor: "var(--primary-color)" }}
        ></Box>

        <Container maxWidth="lg">
          <CoreFeature />
        </Container>

        <ChromaGrid />

        <Container maxWidth="lg">
          <AIinMedicine />
        </Container>
      </Box>
    </>
  );
}

export default Home