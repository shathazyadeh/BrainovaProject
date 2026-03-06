import React from 'react'
import useGetUsers from '../../hooks/useGetUsers'
import { Box, CircularProgress, Typography } from '@mui/material';
import EnhancedTable from '../../components/enhancedTabel/EnhancedTabel';

function AdminDashboard() {

     const {isError,isLoading,data} = useGetUsers(); //ممنوع نغير اسمها هاي ديستراكتينج للكويري الي بترجع من يوس كويري
     if(isLoading) return <CircularProgress></CircularProgress>
     if(isError) return <Typography>error...</Typography>
  return (
    <Box component={'section'} className='admin_dashboard' sx={{bgcolor:'rgba(163, 155, 155, 0.2)', height:'100vh',borderRadius:'25px'}}>
      <EnhancedTable rows={data}/>
    </Box>
  )
}

export default AdminDashboard