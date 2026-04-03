import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import heroPic from "../../../assets/images/home/hero/BrainHomePic.webp";
import { FaCircle } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { LuBrain } from "react-icons/lu";
import { Link as RouterLink } from "react-router-dom";
import style from "./Hero.module.css";

function Hero() {
  return (
    <Box
      component={"section"}
      className="hero_section"
      sx={{        
        position: "relative",
        paddingY:"80px"
      }}
    >
      <Grid
        container
        spacing={3}
        rowSpacing={10}
        sx={{
          display: "flix",
          alignItems: "center",
        }}
      >
        <Grid item className={style.hero_info} size={{ sm: 12, md: 6 }}>
          <Typography
            component={"p"}
            sx={{
              border: "1px solid var(  --primary-color)",
              width: "fit-content",
              borderRadius: "60px",
              color: "var(--light-red-color)",
              paddingX: "18px",
              paddingY: "10px",
              bgcolor: "rgba(255, 0, 0, 0.1)",
              fontWeight: "500",
            }}
          >
            <Typography
              component={"span"}
              sx={{ marginRight: "10px" }}
              className={style.pulse_wrapper}
            >
              <FaCircle size={13} color="var(--light-red-color)" />
            </Typography>
            AI-Powered Medical Platform
          </Typography>
          <Typography
            component="h1"
            variant="h2"
            sx={{
              color: "white",
              fontWeight: "800",
              fontFamily: "var(--primary-font)",
              marginY: "20px",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              "@media (max-width:470px)": {
              fontSize: "50px",
            },"@media (max-width:426px)": {
              fontSize: "40px",
            },
            "@media (max-width:418px)": {
              fontSize: "30px",
            }
            }}
          >
            Advanced Brain Tumor
            <Typography
              variant="h2"
              sx={{
                color: "var(--primary-color)",
                fontWeight: "800",
                fontFamily: "var(--primary-font)",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                "@media (max-width:470px)": {
              fontSize: "50px",
            },
            "@media (max-width:426px)": {
              fontSize: "40px",
            },
            "@media (max-width:418px)": {
              fontSize: "30px",
            }
              }}
            >
              Detection System
            </Typography>
          </Typography>
          <Typography
            component={"p"}
            sx={{
              color: "var( --secondary-color)",
              fontSize: "16px",
              lineHeight: "25px",
              maxWidth: "468px",
              width:"fit-content"
            }}
          >
            Leverage cutting-edge artificial intelligence for rapid and accurate
            brain tumor diagnosis. Train, analyze, and visualize with
            state-of-the-art deep learning technology.
          </Typography>
          <Box className="hero_btn" sx={{ marginTop: "30px", display:"flex",gap:"10px"}}>
            <Button
              component={RouterLink}
              to="/predict-tumor"
              className={`${style.upload_btn} upper_case`}
              sx={{
                color: "white",
                bgcolor: "rgb(190, 7, 7)",
                paddingX: "15px",
                paddingY: "8px",
                borderRadius: "15px",
                boxShadow: "0 0 15px rgba(255, 0, 0, 0.6)",
              }}
            >
              <Typography component={"span"} sx={{ marginRight: "5px" }}>
                <FiUpload size={"15px"} />
              </Typography>
              Upload MRI Scan
            </Button>
            <Button
              className={`${style.learn_btn} upper_case`}
              sx={{
                color: "white",
                bgcolor: "rgba(61, 59, 59, 0.9)",
                border: "1px solid rgba(115, 114, 114, 0.9)",
                paddingX: "15px",
                paddingY: "10px",
                borderRadius: "15px",
                boxShadow: "0 0 15px rgba(82, 81, 81, 0.6)",
              }}
            >
              <Typography component={"span"} sx={{ marginRight: "5px" }}>
                <LuBrain size={"15px"} />
              </Typography>
              Learn More
            </Button>
          </Box>
        </Grid>

        <Grid
          item
          className={style.hero_img}
          size={{ sm: 12, md: 6 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={heroPic}
            className={`${style.animatedImage} ${style.drop_shadow}`}
            style={{ width: "100%", maxWidth: "600px", height: "auto" }}
            alt="Hero Brain"
          ></img>
        </Grid>
      </Grid>
      <Typography sx={{ color: "white" }}></Typography>
    </Box>
  );
}

export default Hero;