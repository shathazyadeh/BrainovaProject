import {  Box, Button, Drawer, TextField, Typography} from "@mui/material";
import React from 'react'
import { IoMdClose } from "react-icons/io";
import { Switch } from '@mui/material';
import { FiPlus } from "react-icons/fi";
function RightDrawer({open ,setOpen}) {
  return (
   <>
    <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          sx={{
            width: 450,
            height: "100%",
            backgroundColor: "var(--navy-color)",
            border:'1px solid #66636347',
            color: "#fff",
            paddingY:'40px',
            paddingX:'30px'
          }}
        >
      




<Box className='drawer_titel flex_column'>
   <Box sx={{display:'flex' , justifyContent:'space-between'}}>
     <Typography component={'h1'}  sx={{color:'#fff',fontSize:'30px',fontWeight:'600',fontFamily:'var(--primary-font)'}}>New Question</Typography>
      <Box sx={{ alignItems: 'center', display: 'flex' }}>
        <IoMdClose onClick={()=>setOpen(false)} size={22} color="var(--secondary-color)" style={{cursor:'pointer', flexShrink: 0 }} />
      </Box>
   </Box>
  <Typography sx={{color:"var(--secondary-color)",fontSize:'15px',fontWeight:'200'}}>Add a question to the supervisor review form.</Typography>   
</Box>
<Box sx={{marginTop:'40px'}}>
    <Typography sx={{color:"var(--secondary-color)",fontSize:'15px',fontWeight:'200',marginBottom:'10px',fontFamily:'var(--secondary-font)'}}>Question text</Typography>
    
      <Box component={"form"} >
        <TextField
         placeholder={
           " What should students answer?"
          }
          fullWidth
          multiline
          rows={3}
          
            sx={{
                "& input::placeholder, & textarea::placeholder": {
               color: "var(--secondary-color)", 
               opacity: 1,
               fontWeight:'400'
        },
        "& .MuiInputBase-root": {
  padding: 0,
},

"& .MuiInputBase-input": {
  padding: 0,
},
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      backgroundColor: "var(--navy-color)",

     
      "&:hover fieldset": {
        borderBottom: "1px solid #5958588b",
      },

      
      "& fieldset": {
        border: "none",
        borderBottom: "1px solid #5958588b",
        borderRadius: 0, 
      },

      
      "&.Mui-focused fieldset": {
        borderBottom: "1px solid red",
      },
    },

    "& textarea": {
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "var(--primary-color)",
        cursor: "grab",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "var(--navy-color)",
      },
    },
  }}
        />
        <Box sx={{display:'flex',gap:"25px",marginTop:'50px'}}>
            
             <TextField
  label="CODE"
  fullWidth
  multiline
  rows={2}

  InputLabelProps={{ shrink: true }}
  sx={{
    "& .MuiInputLabel-root": {
      color: "var(--secondary-color)",
      top: "-6px",
       left: 0,
     transform: "translate(0, -6px) scale(0.75)", 
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "var(--secondary-color)", 
    },

    "& .MuiInputBase-root": {
      padding: 0,
      marginTop: "5px", 
    },

    "& .MuiInputBase-input": {
      padding: 0,
    },

    "& .MuiOutlinedInput-root": {
      color: "#fff",
      backgroundColor: "var(--navy-color)",

      "&:hover fieldset": {
        borderBottom: "1px solid #5958588b",
      },

      "& fieldset": {
        border: "none",
        borderBottom: "1px solid #5958588b",
        borderRadius: 0,
      },

      "&.Mui-focused fieldset": {
        borderBottom: "1px solid red",
      },
    },
  }}
/>
         <TextField
  label="ORDER"
  fullWidth
  multiline
  rows={2}

  InputLabelProps={{ shrink: true }}
  sx={{
    "& .MuiInputLabel-root": {
      color: "var(--secondary-color)",
      top: "-6px", 
       left: 0,
     transform: "translate(0, -6px) scale(0.75)",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "var(--secondary-color)", 
    },

    "& .MuiInputBase-root": {
      padding: 0,
      marginTop: "5px", 
    },

    "& .MuiInputBase-input": {
      padding: 0,
    },

    "& .MuiOutlinedInput-root": {
      color: "#fff",
      backgroundColor: "var(--navy-color)",

      "&:hover fieldset": {
        borderBottom: "1px solid #5958588b",
      },

      "& fieldset": {
        border: "none",
        borderBottom: "1px solid #5958588b",
        borderRadius: 0,
      },

      "&.Mui-focused fieldset": {
        borderBottom: "1px solid red",
      },
    },
  }}
/>
        </Box>
     </Box>
    </Box>


    <Box className='question_type flex_column'sx={{marginTop:'20px',gap:'10px'}}>
       <Typography sx={{color: "var(--secondary-color)" ,fontSize:'13px'}}>Type</Typography>
     <Box sx={{display:'flex',gap:'10px'}}>
         <Button sx={{color:"#fff",textTransform:'capitalize',fontSize:"13px",bgcolor:'var(--primary-color)',paddingY:'4px',paddingX:'9px',borderRadius:'15px',textAlign:'center',}}>Free Text</Button>
         <Button sx={{color:"var(--secondary-color)",textTransform:'capitalize',fontSize:"13px",bgcolor:'#242424',paddingY:'4px',paddingX:'9px',borderRadius:'15px',textAlign:'center',}}>Multi Choice</Button>
     </Box>  
    </Box>

    <Box sx={{marginTop:'30px'}}>
         <TextField
  label="Options"
  fullWidth
  multiline
  rows={2}

  InputLabelProps={{ shrink: true }}
  sx={{
    "& .MuiInputLabel-root": {
      color: "var(--secondary-color)",
      top: "-6px", 
      left: 0,
     transform: "translate(0, -6px) scale(0.75)",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "var(--secondary-color)", 
    },

    "& .MuiInputBase-root": {
      padding: 0,
      marginTop: "5px", 
    },

    "& .MuiInputBase-input": {
      padding: 0,
    },

    "& .MuiOutlinedInput-root": {
      color: "#fff",
      backgroundColor: "var(--navy-color)",

      "&:hover fieldset": {
        borderBottom: "1px solid #5958588b",
      },

      "& fieldset": {
        border: "none",
        borderBottom: "1px solid #5958588b",
        borderRadius: 0,
      },

      "&.Mui-focused fieldset": {
        borderBottom: "1px solid red",
      },
    },
  }}
/>
    </Box>

    <Box className='active' sx={{display:"flex",justifyContent:'space-between',marginTop:'30px',paddingTop:'20px',borderTop:'1px solid #55555582'}}>
        
        <Typography sx={{color: "var(--secondary-color)", fontSize:"15px",}}>Active immediately</Typography>
        <Switch
                   disableRipple
                   sx={{
                     width: 42,
                     height: 24,
                     padding: 0,
       
                     '& .MuiSwitch-switchBase': {
                       padding: '3px',
                       transition: '0.3s',
       
                       '&:hover': {
                         backgroundColor: 'rgba(81, 81, 81, 0.22) !important',
                       },
       
                       '&.Mui-checked': {
                         transform: 'translateX(18px)',
                       },
       
                       '&.Mui-checked + .MuiSwitch-track': {
                         backgroundColor: 'var(--primary-color) !important',
                         opacity: 1,
                       },
                     },
       
                     '& .MuiSwitch-thumb': {
                       width: 18,
                       height: 18,
                       borderRadius: '50%',
                       backgroundColor: 'var(--navy-color)',
                     },
       
                     '& .MuiSwitch-track': {
                       borderRadius: 12,
                       backgroundColor: '#575656 !important',
                       opacity: 1,
                     },
                   }}
                 />
    </Box>


    <Box className='buttons'sx={{display:'flex',justifyContent:'flex-end',gap:'10px',marginTop:'70px'}}>
        <Button  onClick={()=>setOpen(false)}sx={{color: "var(--secondary-color)", fontSize:"15px",textTransform:'capitalize',paddingY:'4px',paddingX:'9px',borderRadius:'15px',textAlign:'center',transition: "all 0.3s", "&:hover": { color: "#fff" }}}>Cancel</Button>
          <Button
                           onClick={()=>setOpen(true)}
                                            sx={{
                                              bgcolor:"#ed2c2c",
                                              color: "#f0f2f5",
                                              display: "flex",
                                              paddingX:'15px',
                                              paddingY:'8px',
                                              gap: '3px',
                                              justifyContent: "center",
                                              textAlign: "center",
                                              borderRadius: "25px",
                                              whiteSpace: "nowrap",
                                              boxShadow: "0 0 15px rgba(207, 25, 25, 0.81)",
                                            }}
                                          > <Box sx={{ alignItems: 'center', display: 'flex' }}>
                                              <FiPlus size={20} style={{ flexShrink: 0 }} />
                                            </Box>
                                            <Typography sx={{ fontSize: { xs: "14px", md: "11px", lg: "14px" }, justifyContent: "flex-start", display: 'flex' ,textTransform: "capitalize",fontWeight:"500",fontSize:'17px'}}>Create </Typography>
                                          </Button>
    </Box>
        </Box>
      </Drawer>
   </>
  )
}

export default RightDrawer

