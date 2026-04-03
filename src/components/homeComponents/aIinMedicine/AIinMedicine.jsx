import { Box, Grid, Typography } from "@mui/material";
import doctorsPic from "../../../assets/images/home/aIInMedicine/doctorsImg.webp";
import style from "./AIinMedicine.module.css";
import { RiDoubleQuotesR } from "react-icons/ri";

function AIinMedicine() {
  return (
    <Box
      component={"section"}
      className="aIinMedicine"
      sx={{ paddingTop: "80px", paddingBottom:'113px' }}
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
            sx={{ color: "white", fontWeight: "800",fontFamily: "var(--primary-font)",
              "@media (max-width:470px)": {
              fontSize: "50px",
            },"@media (max-width:426px)": {
              fontSize: "40px",
            }}}
          >
            AI in Modern
            <Typography
              component={"p"}
              variant="h2"
              sx={{ color: "var( --primary-color)", fontWeight: "800",fontFamily: "var(--primary-font)",
                "@media (max-width:470px)": {
              fontSize: "50px",
            },"@media (max-width:426px)": {
              fontSize: "40px",
            }}}
            >
              {" "}
              Healthcare{" "}
            </Typography>{" "}
          </Typography>
          <Box sx={{bgcolor:'#2827277d',padding:'15px',borderRadius:'10px', boxShadow: "0 0 15px rgba(207, 25, 25, 0.81)"}}>
            <Box sx={{width:'fit-content',marginLeft:'auto'}}>
              <RiDoubleQuotesR size={40} color="#ffffff48"/>
            </Box>
          
          <Typography
            component={"p"}
          
   
   
            sx={{ color: "rgba(250, 248, 243, .95)", fontSize: "20px",fontWeight:'300',fontFamily:"var(--primary-font)",fontStyle:'italic'}}
          >
            Artificial intelligence is transforming medicine in a big way.
            Today, smart systems help doctors analyze medical images and tests
            faster and more accurately, detecting details that may be hard for
            the human eye to see. Visual explanation tools also make it easier
            to understand results and build greater trust between doctors and
            patients. All of this makes healthcare smarter and safer, thanks to
            the power of data and technology.
          </Typography>
          </Box>
        </Grid>
        <Grid item size={{ sm: 12, md: 6 }} sx={{marginTop:{xs:0,md:'80px'}}}>
          <img
            src={doctorsPic}
            width="100%"
            className={style.drop_shadow}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AIinMedicine;