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
      sx={{ paddingY: "150px" }}
    >
      <Typography
        component={"h2"}
        variant="h3"
        sx={{ color: "white", fontWeight: "500",fontWeight: "800",fontFamily: "var(--primary-font)", textAlign: "center",
          "@media (max-width:470px)": {
              fontSize: "50px",
            },"@media (max-width:426px)": {
              fontSize: "40px",
            }}}
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
          size={{sm:12 , md : 6 , lg : 6}}
         className={`${style.featuers} ${style.card}`}
          sx={{
            minWidth: "250px",
            boxShadow: "0 0 15px rgba(130, 0, 0, 0.71)",
            borderRadius: "15px",
            paddingX: "30px",
            paddingY:'40px',
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
              <Box className='card_header' sx={{display:'flex',gap:'10px'}}>
           <Typography
            component={"span"}
            sx={{
              bgcolor: " #ff0000 ",
              padding: "10px",
              borderRadius: "15px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              color:"#fff",
              boxShadow: "0 0 15px rgba(255, 0, 0, 0.6)",
            }}
          >
            <LuBrain size={"35"}  />
          </Typography>

          <Typography
            component={"h3"}
            sx={{ color: "#fff", fontWeight: "800" , marginTop:'20px',fontSize:'20px'}}
          >
            AI-Powered Analysis
          </Typography>
         </Box>
          <Typography
            component={"p"}
            sx={{ color: "#757575", fontSize: "16px", fontWeight: "800"  }}
          >Advanced deep learning models designed to deliver highly accurate and reliable brain tumor detection, 
          enabling faster diagnosis and supporting medical professionals with intelligent analysis and visual insights.
          </Typography>
        </Grid>

        <Grid
          item
          size={{sm:12 , md : 6 , lg : 6}}
          className={`${style.featuers} ${style.card}`}
          sx={{
            minWidth: "250px",
            boxShadow: "0 0 15px rgba(130, 0, 0, 0.71)",
            borderRadius: "15px",
            paddingX: "30px",
            paddingY:'40px',
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <Box className='card_header' sx={{display:'flex',gap:'10px'}}>
          <Typography
            component={"span"}
            sx={{
              bgcolor: " #ff0000 ",
              padding: "10px",
              borderRadius: "15px",
              display: "inline-flex",
              justifyContent: "center",
              color:"#fff",
              alignItems: "center",
             boxShadow: "0 0 15px rgba(255, 0, 0, 0.6)",
            }}
          >
            <PiPulseBold size={"35"} />
          </Typography>

          <Typography
            component={"h3"}
            sx={{ color: "white", fontWeight: "800" , marginTop:'20px',fontSize:'20px' }}
          >
            Real-time Processing
          </Typography>
          </Box>
          <Typography
            component={"p"}
            sx={{ color: "var( --secondary-color)", fontSize: "16px" }}
          >
           Get accurate diagnostic results in seconds with instant visualization, enabling quick analysis and clear insights 
           to support faster and more informed medical decisions.
          </Typography>
        </Grid>

        <Grid
          item
          size={{sm:12 , md : 6 , lg : 6}}
          className={`${style.featuers} ${style.card}`}
          sx={{
            minWidth: "250px",
            boxShadow: "0 0 15px rgba(130, 0, 0, 0.71)",
            borderRadius: "15px",
            paddingX: "30px",
            paddingTop:'40px',
            paddingBottom:'50px',
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
           <Box className='card_header' sx={{display:'flex',gap:'10px'}}>
          <Typography
            component={"span"}
            sx={{
                            bgcolor: " #ff0000 ",
              padding: "10px",
              borderRadius: "15px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              color:"#fff",
              boxShadow: "0 0 15px rgba(255, 0, 0, 0.6)",
            }}
          >
            <SlEnergy size={"35"}  />
          </Typography>

          <Typography
            component={"h3"}
            sx={{ color: "white", fontWeight: "800" , marginTop:'20px' ,fontSize:'20px'}}
          >
            Grad-CAM Heatmaps
          </Typography>
          </Box>
          <Typography
            component={"p"}
            sx={{ color: "var( --secondary-color)", fontSize: "16px" }}
          >
           Clear visual explanations that illustrate how AI models interpret MRI scans, providing transparency into decision-making processes and 
           helping users better understand diagnostic results.
          </Typography>
        </Grid>

        <Grid
          item
          size={{sm:12 , md : 6 , lg : 6}}
          className={`${style.featuers} ${style.card}`}
          sx={{
            minWidth: "250px",
            boxShadow: "0 0 15px rgba(130, 0, 0, 0.71)",
            borderRadius: "15px",
            paddingX: "30px",
            paddingY:'40px',
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
           <Box className='card_header' sx={{display:'flex',gap:'10px'}}>
          <Typography
            component={"span"}
            sx={{
              bgcolor: " #ff0000 ",
              padding: "10px",
              borderRadius: "15px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              color:"#fff",
              boxShadow: "0 0 15px rgba(255, 0, 0, 0.6)",
            }}
          >
            <LuBrainCircuit size={"35"}  />
          </Typography>
 


          <Typography
            component={"h3"}
            sx={{ color: "white", fontWeight: "800" , marginTop:'20px',fontSize:'20px' }}
          >
            Interactive 3D Brain
          </Typography>
          </Box>
          <Typography
            component={"p"}
            sx={{ color: "#fffdfd", fontSize: "16px" }}
          >
           An interactive 3D model that allows users to explore brain anatomy in detail and accurately visualize tumor locations, enhancing understanding and
            supporting more effective analysis.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CoreFeature;