import { Box, Typography } from '@mui/material'
import React from 'react'
import BrainModel from '../../../components/brainModelComponents/brainModel/BrainModel'

function LearningHub() {
  return (
    <Box sx={{paddingTop:"50px",bgcolor:"var(--navy-color)"}}>
      <Box className="title" sx={{color:"#fff",textAlign:"center",paddingBottom:"60px"}}>
        <Typography
  component="h1"
  sx={{
    fontFamily: "var(--primary-font)",
    fontSize:"60px",
    fontWeight: "800",
  }}
>
  {/* السطر الأول */}
  <Box
    component="span"
    sx={{
      background: "linear-gradient(90deg, #ff0d00, #fbff00)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      display: "inline-block",
    }}
  >
    Explore the
  </Box>

  <br />

  {/* السطر الثاني */}
  <Box
    component="span"
    sx={{ 
      background: "linear-gradient(90deg, #00c3ff, #00ff1a)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      display: "inline-block",
    }}
  >
    Human Brain
  </Box>
</Typography>
        <Typography sx={{fontFamily:"var(--primary-font)",fontSize:"30px"}}>Interactively learn brain regions and functions</Typography>
      </Box>
    <BrainModel />
    </Box>
  )
}

export default LearningHub