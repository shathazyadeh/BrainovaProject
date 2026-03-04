import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import heroPic from "../../assets/images/home/hero/BrainHomePic.webp";
import { FaCircle } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { LuBrain } from "react-icons/lu";
import style from "./Hero.module.css";
function Hero() {
  return (
      <Box component={'section'} className='hero_section' sx={{
      //لعمل الباكجراوند مربعات 
      
      bgcolor: '#0a0a0a',
      backgroundImage: `
      linear-gradient(rgba(255, 0, 0, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 0, 0, 0.08) 1px, transparent 1px)`,
      backgroundSize: '40px 40px',
      padding: '80px',

    }}
    >
      <Grid container spacing={3} sx={{
        display: 'flix',
        alignItems: 'center',
      }} >

        <Grid item className='hero_info' size={{ sm: 12, lg: 6 }}>
          <Typography component={'p'} sx={{ border: '1px solid var(  --primary-color)', width: 'fit-content', borderRadius: '60px', color: 'var(--light-red-color)', paddingX: '18px', paddingY: '10px', bgcolor: 'rgba(255, 0, 0, 0.1)', fontWeight: '500' }}>
            <Typography component={'span'} sx={{ marginRight: '10px' }} className={style.pulse_wrapper}>
              <FaCircle size={13} color="var(--light-red-color)" />
            </Typography>
            AI-Powered Medical Platform</Typography>
          <Typography component={'h1'} variant='h2' sx={{ color: 'white', fontWeight: '800', marginY: '20px' }}>Advanced Brain Tumor<br />
            <Typography component={'span'} variant='h2' sx={{ color: 'var(--primary-color)', fontWeight: '800' }}>Detection System</Typography>
          </Typography>
          <Typography component={'p'} sx={{ color: 'var( --secondary-color)', fontSize: '16px', lineHeight: '25px', paddingRight: '100px' }}>Leverage cutting-edge artificial intelligence for rapid and accurate brain tumor diagnosis.
            Train, analyze, and visualize with state-of-the-art deep learning technology.</Typography>
          <Box className='hero_btn' sx={{ marginTop: '30px' }}>
            <Button className={`${style.upload_btn} upper_case`} sx={{ color: 'white', bgcolor: 'rgb(190, 7, 7)', marginRight: '20px', paddingX: '15px', paddingY: '8px', borderRadius: '15px' }}>
              <Typography component={'span'} sx={{ marginRight: '5px' }}><FiUpload size={'15px'} /></Typography>
              Upload MRI Scan</Button>
            <Button className={`${style.learn_btn} upper_case`} sx={{ color: 'white', bgcolor: 'rgba(61, 59, 59, 0.9)', border: '1px solid rgba(115, 114, 114, 0.9)', paddingX: '15px', paddingY: '8px', borderRadius: '15px' }}>
              <Typography component={'span'} sx={{ marginRight: '5px' }}><LuBrain size={'15px'} /></Typography>
              Learn More</Button>
          </Box>
        </Grid>

        < Grid item className='hero_img' size={{ sm: 12, lg: 6 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          <img src={heroPic} className={style.drop_shadow} style={{ paddingRight: '20px', maxWidth: '800px' }} ></img>
        </Grid>



      </Grid>

    </Box>
  )
}

export default Hero
