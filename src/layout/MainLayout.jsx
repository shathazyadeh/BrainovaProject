import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar.jsx'
import { Box } from '@mui/material'
import Footer from '../components/footer/Footer.jsx'



function MainLayout() {
  return (
    <Box sx={{bgcolor:'var(--navy-color)',paddingTop:'20px'}}>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </Box>
  )
}

export default MainLayout
