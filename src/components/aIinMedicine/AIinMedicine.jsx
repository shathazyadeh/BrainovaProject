import { Box, Grid, Typography } from "@mui/material";
import doctorsPic from "../../assets/images/home/aIInMedicine/doctorsImg.webp";
import style from "./AIinMedicine.module.css";
function AIinMedicine() {
  return (
    <Box
      component={"section"}
      className="aIinMedicine"
      sx={{ paddingTop: "30px", paddingBottom:'113px' }}
    >
      <Grid container spacing={3}>
        <Grid
          item
          size={{ sm: 12, md: 6 }}
          sx={{ justifyContent: "center", gap: "50px"}}
          className="flex_column"
        >
          <Typography
            component={"h2"}
            variant="h2"
            sx={{ color: "white", fontWeight: "500" }}
          >
            AI in Modern
            <Typography
              component={"p"}
              variant="h2"
              sx={{ color: "var( --primary-color)", fontWeight: "500" }}
            >
              {" "}
              Healthcare{" "}
            </Typography>{" "}
          </Typography>
          <Typography
            component={"p"}
            sx={{ color: "var(  --secondary-color)", fontSize: "20px" }}
          >
            Artificial intelligence is transforming medicine in a big way.
            Today, smart systems help doctors analyze medical images and tests
            faster and more accurately, detecting details that may be hard for
            the human eye to see. Visual explanation tools also make it easier
            to understand results and build greater trust between doctors and
            patients. All of this makes healthcare smarter and safer, thanks to
            the power of data and technology.
          </Typography>
        </Grid>
        <Grid item size={{ sm: 12, md: 6 }}>
          <img
            src={doctorsPic}
            width="100%"
            className={style.drop_shadow}
            draggable={false}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AIinMedicine;