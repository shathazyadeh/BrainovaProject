import React from 'react'
import useGetUsers from '../../hooks/useGetUsers'
import { Box, Button, CircularProgress, Typography } from '@mui/material';

import {Link as RouterLink} from 'react-router-dom';
import EnhancedTable from '../../components/enhancedTabel/EnhancedTabel';

function AdminDashboard() {

     const {isError,error,isLoading,data} = useGetUsers(); //ممنوع نغير اسمها هاي ديستراكتينج للكويري الي بترجع من يوس كويري
     if(isLoading) return <CircularProgress></CircularProgress>
     if(isError) {
      if(error?.status === 401){
        return <Box component={'section'} className='server_error_section flex_column' sx={{height:'100vh',justifyContent:'center',alignItems:'center',gap:'20px'}}>
      <Typography component={'h1'} variant='h5' sx={{color:'white',fontWeight:'700',textAlign:'center'}}>Your session has expired due to inactivity.</Typography>
      <Button className='auth_btn' component={RouterLink} to='/auth/login' sx={{bgcolor:'var(--primary-color)',color:'white',borderRadius:'6px' ,fontWeight:'600', paddingX:'25px',paddingY:'10px'}}>Back to Login</Button>
     </Box>
     }
     else{
      return <Box component={'section'} className='server_error_section flex_column' sx={{height:'100vh',justifyContent:'center',alignItems:'center',gap:'20px'}}>
      <Typography component={'h1'} variant='h5' sx={{color:'white',fontWeight:'700',textAlign:'center'}}>{error?.message}</Typography>
      <Button className='auth_btn' component={RouterLink} to='/auth/login' sx={{bgcolor:'var(--primary-color)',color:'white',borderRadius:'6px' ,fontWeight:'600', paddingX:'25px',paddingY:'10px'}}>Back to Login</Button>
     </Box>
     }
    }
  return (
    <Box component={'section'} className='admin_dashboard' sx={{bgcolor:'rgba(163, 155, 155, 0.2)',borderRadius:'25px',padding:'30px'}}>
      <EnhancedTable rows={data}/>
    </Box>
  )
}

export default AdminDashboard