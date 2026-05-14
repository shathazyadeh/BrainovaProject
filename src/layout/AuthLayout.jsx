import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../components/scrollToTop/ScrollToTop'

function AuthLayout() {
  return (
    <Box>
      <ScrollToTop />
      <Outlet/>
    </Box>
  )
}

export default AuthLayout