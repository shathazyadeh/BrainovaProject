import { Box, Typography } from '@mui/material'
import React from 'react'

function DashboardFooter() {
  return (
        <Box
          className="lower_footer"
          sx={{
            borderTop: "1px solid rgba(53, 53, 53, 0.93)",
            width: "fit-content",
            margin: "auto",
            paddingX: { xs: "0px", md: "200px" },
            textAlign: "center",
            marginTop: "60px",
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
  )
}

export default DashboardFooter
