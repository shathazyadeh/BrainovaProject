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
            "@media (max-width:1087px)": {
              paddingX: "100px",
            }
          }}
        >
          <Typography
            component={"p"}
            sx={{ color: "var(--mid-gray-color)", paddingY: "30px","@media (max-width:700px)": {
              fontSize: "14px",
            },"@media (max-width:430px)": {
              fontSize: "12px",
            } }}
          >
            © 2026{" "}
            <Typography
              component={"span"}
              sx={{ color: "var(--dark-red-color)","@media (max-width:700px)": {
              fontSize: "14px",
            },"@media (max-width:430px)": {
                fontSize: "12px",
              }, }}
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