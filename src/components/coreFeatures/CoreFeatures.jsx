import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { LuBrain } from "react-icons/lu";
import { PiPulseBold } from "react-icons/pi";
import { SlEnergy } from "react-icons/sl";
import { LuBrainCircuit } from "react-icons/lu";
import style from "./CoreFeatures.module.css";

function CoreFeature() {
  return (
    <Box
      component={"section"}
      className="Core_Features"
      sx={{ paddingY: "110px" }}
    >
      <Typography
        component={"h2"}
        variant="h3"
        sx={{ color: "white", fontWeight: "500", textAlign: "center" }}
      >
        Clinical-Grade AI Technology
      </Typography>
      <Typography
        component={"p"}
        sx={{
          color: "var(--secondary-color)",
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "60px",
        }}
      >
        Our platform combines advanced deep learning with medical expertise to
        deliver accurate,
        <br /> explainable diagnostics for healthcare professionals.
      </Typography>
      <Grid spacing={5} container sx={{justifyContent: "center"}}>
        <Grid
          item
          size={{sm:12 , md : 6 , lg : 3}}
          className={style.featuers}
          sx={{
            minWidth: "250px",
            background:
              " linear-gradient(160deg, rgba(255, 100, 70, 0.06), rgba(255, 60, 40, 0.02) ), rgba(10, 10, 15, 0.85) ",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255, 160, 140, 0.12)",
            borderRadius: "15px",
            paddingX: "30px",
            paddingY:'40px',
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <Typography
            component={"span"}
            sx={{
              bgcolor: "rgba(43, 25, 25)",
              padding: "10px",
              borderRadius: "15px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LuBrain size={"30"} color="var(--light-red-color)" />
          </Typography>

          <Typography
            component={"h3"}
            sx={{ color: "white", fontWeight: "500" , marginTop:'20px'}}
          >
            AI-Powered Analysis
          </Typography>
          <Typography
            component={"p"}
            sx={{ color: "var( --secondary-color)", fontSize: "12px" }}
          >
            Advanced deep learning models for
            <br /> accurate tumor detection
          </Typography>
        </Grid>

        <Grid
          item
          size={{sm:12 , md : 6 , lg : 3}}
          className={style.featuers}
          sx={{
            minWidth: "250px",
            background:
              " linear-gradient(160deg, rgba(255, 100, 70, 0.06), rgba(255, 60, 40, 0.02) ), rgba(10, 10, 15, 0.85) ",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255, 160, 140, 0.12)",
            borderRadius: "15px",
            paddingX: "30px",
            paddingY:'40px',
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <Typography
            component={"span"}
            sx={{
              bgcolor: "rgba(43, 25, 25)",
              padding: "10px",
              borderRadius: "15px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PiPulseBold size={"30"} color="var(--light-red-color)" />
          </Typography>

          <Typography
            component={"h3"}
            sx={{ color: "white", fontWeight: "500" , marginTop:'20px' }}
          >
            Real-time Processing
          </Typography>
          <Typography
            component={"p"}
            sx={{ color: "var( --secondary-color)", fontSize: "12px" }}
          >
            Get diagnostic results in seconds with <br />
            instant visualization
          </Typography>
        </Grid>

        <Grid
          item
          size={{sm:12 , md : 6 , lg : 3}}
          className={style.featuers}
          sx={{
            minWidth: "250px",
            background:
              " linear-gradient(160deg, rgba(255, 100, 70, 0.06), rgba(255, 60, 40, 0.02) ), rgba(10, 10, 15, 0.85) ",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255, 160, 140, 0.12)",
            borderRadius: "15px",
            paddingX: "30px",
            paddingY:'40px',
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <Typography
            component={"span"}
            sx={{
              bgcolor: "rgba(43, 25, 25)",
              padding: "10px",
              borderRadius: "15px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SlEnergy size={"30"} color="var(--light-red-color)" />
          </Typography>

          <Typography
            component={"h3"}
            sx={{ color: "white", fontWeight: "500" , marginTop:'20px' }}
          >
            Grad-CAM Heatmaps
          </Typography>
          <Typography
            component={"p"}
            sx={{ color: "var( --secondary-color)", fontSize: "12px" }}
          >
            Visual explanations explaining AI
            <br />
            decisions in MRI analysis
          </Typography>
        </Grid>

        <Grid
          item
          size={{sm:12 , md : 6 , lg : 3}}
          className={style.featuers}
          sx={{
            minWidth: "250px",
            background:
              " linear-gradient(160deg, rgba(255, 100, 70, 0.06), rgba(255, 60, 40, 0.02) ), rgba(10, 10, 15, 0.85) ",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255, 160, 140, 0.12)",
            borderRadius: "15px",
            paddingX: "30px",
            paddingY:'40px',
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <Typography
            component={"span"}
            sx={{
              bgcolor: "rgba(43, 25, 25)",
              padding: "10px",
              borderRadius: "15px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LuBrainCircuit size={"30"} color="var(--light-red-color)" />
          </Typography>

          <Typography
            component={"h3"}
            sx={{ color: "white", fontWeight: "500" , marginTop:'20px' }}
          >
            Interactive 3D Brain
          </Typography>
          <Typography
            component={"p"}
            sx={{ color: "var( --secondary-color)", fontSize: "12px" }}
          >
            Interactive 3D model to explore brain
            <br /> anatomy and tumor locations.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CoreFeature;