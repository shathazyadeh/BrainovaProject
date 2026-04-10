import { Box } from '@mui/material'
import React from 'react'
import useGetAllMyCases from '../../../hooks/studentHooks/useGetAllMyCases';

function MyCases() {
    const{isError,isLoading,error,data}=useGetAllMyCases();
    console.log('data5:',data);
  return (
    <Box sx={{hight:'100vh',bgcolor:'red'}}>
      
    </Box>
  )
}

export default MyCases
