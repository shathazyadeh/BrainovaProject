import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import heroPic from "../../../assets/images/home/hero/BrainHomePic.webp";
import { FaCircle } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { LuBrain } from "react-icons/lu";
import { Link as RouterLink } from "react-router-dom";
import style from "./Hero.module.css";
import useAuthStore from "../../../store/useAuthStore";

function Hero() {
  const user = useAuthStore((state) => state.user);
  return (
    <Box
      component={"section"}
      className="hero_section"
      sx={{
        position: "relative",
        paddingY: { xs: "47px", sm: "60px", md: "80px" },
      }}
    >
      <Grid
        container
        spacing={3}
        rowSpacing={10}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid item className={style.hero_info} size={{ sm: 12, md: 6 }}>
          <Typography
            component={"p"}
            sx={{
              border: "1px solid var(--primary-color)",
              width: "fit-content",
              borderRadius: "60px",
              color: "var(--light-red-color)",
              paddingX: "18px",
              paddingY: "10px",
              bgcolor: "rgba(255, 0, 0, 0.1)",
              fontWeight: "500",
              "@media (max-width:700px)": {
                fontSize: "14px",
              },
              "@media (max-width:430px)": {
                fontSize: "12px",
              },
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
              "@media (max-width:700px)": {
                fontSize: "40px",
              },
              "@media (max-width:430px)": {
                fontSize: "30px",
              },
            }}
          >
            Advanced Brain Tumor
            <Typography
              component="span"
              variant="h2"
              sx={{
                color: "var(--primary-color)",
                fontWeight: "800",
                fontFamily: "var(--primary-font)",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                "@media (max-width:700px)": {
                  fontSize: "40px",
                },
                "@media (max-width:430px)": {
                  fontSize: "30px",
                },
              }}
            >
              {" "}
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
              width: "fit-content",
              "@media (max-width:430px)": {
                fontSize: "13px",
              },
            }}
          >
            Leverage cutting-edge artificial intelligence for rapid and accurate
            brain tumor diagnosis. Train, analyze, and visualize with
            state-of-the-art deep learning technology.
          </Typography>
          <Box
            className="hero_btn"
            sx={{ marginTop: "30px", display: "flex", gap: "10px" }}
          >
            <Button
              component={user ? RouterLink : "button"}  // اذا اليوزر مسجل دخول الراوتر لينك بنقلني عصفحة البريديكس اذا مش مسجل دخول بتتصرف كبوتون مابنقلني ع اشي
               to={user ? "/predict-tumor" : undefined}
              className={`${style.upload_btn} upper_case`}
              sx={{
                cursor: !user ? "not-allowed" : "pointer",
                color: "white",
                bgcolor: "rgb(190, 7, 7)",
                paddingX: "15px",
                paddingY: "8px",
                borderRadius: "15px",
                boxShadow: "0 0 15px rgba(255, 0, 0, 0.6)",
                display: "flex",
                whiteSpace: "nowrap",
                "@media (max-width:430px)": {
                  fontSize: "13px",
                  paddingX: "7px",
                  paddingY: "6px",
                },
              }}
            >
              <Typography component={"span"} sx={{ marginRight: "5px" }}>
                <FiUpload size={"15px"} />
              </Typography>
              Upload MRI Scan
            </Button>
            <Button
              component={user ? RouterLink : "button"}
              to={user ? "/learning-hub" : undefined}
              className={`${style.learn_btn} upper_case`}
              sx={{
                cursor: !user ? "not-allowed" : "pointer",
                color: "white",
                bgcolor: "rgba(61, 59, 59, 0.9)",
                border: "1px solid rgba(115, 114, 114, 0.9)",
                paddingX: "15px",
                paddingY: "10px",
                borderRadius: "15px",
                boxShadow: "0 0 15px rgba(82, 81, 81, 0.6)",
                display: "flex",
                whiteSpace: "nowrap",
                "@media (max-width:430px)": {
                  fontSize: "13px",
                  paddingX: "7px",
                  paddingY: "6px",
                },
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
            flexGrow: { xs: "1", md: "0" },
          }}
        >
          <Box
            component="img"
            src={heroPic}
            alt="Half human brain and half mechanical AI brain"
            className={`${style.animatedImage} ${style.drop_shadow}`}
            sx={{
              width: "100%",
              maxWidth: { xs: "300px", sm: "400px", md: "600px" },
              height: "auto",
            }}
          />
        </Grid>
      </Grid>
      <Typography sx={{ color: "white" }}></Typography>
    </Box>
  );
}

export default Hero;