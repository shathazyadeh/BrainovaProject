import { Box, Typography } from '@mui/material'
import React from 'react'
import DashboardNavbar from '../../../components/muiComponents/dashboardNavbar/DashboardNavbar'

function SupervisorDashboard() {
  return (
    <Box sx={{
        bgcolor: "var(--navy-color)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}>
<DashboardNavbar />
      <Box
        component={"section"}
        sx={{
          paddingBottom: "50px",
          flexGrow: 1,
          alignItems: "flex-start",
          display: "block",
          minHeight: "100vh",
        }}
      >


        





      </Box>











         {/*footer */}
      <Box
        className="lower_footer"
        sx={{
          borderTop: "1px solid rgba(53, 53, 53, 0.93)",
          width: "fit-content",
          margin: "auto",
          paddingX: { xs: "0px", md: "200px" },
          textAlign: "center",
          marginTop: { xs: "60px", md: "0px" },
        }}
      >
        <Typography
          component={"p"}
          sx={{ color: "var(--mid-gray-color)", paddingY: "30px" }}
        >
          © 2026{" "}
          <Typography
            component={"span"}
            sx={{ color: "var(--dark-red-color)" }}
          >
            Brainova
          </Typography>
          . All rights reserved. | Built for medical education and research
          purposes.
        </Typography>
      </Box>
      
    </Box>
  )
}

export default SupervisorDashboard