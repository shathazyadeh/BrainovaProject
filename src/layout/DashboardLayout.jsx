import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

function DashboardLayout() {
  return (
    <Box sx={{bgcolor:'var(--navy-color)',padding:'40px'}}>
      <Outlet/>
    </Box>
  )
}

export default DashboardLayout