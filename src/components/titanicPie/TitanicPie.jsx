import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function UsersPieChart({students,supervisors}) {
  const data = [
    { id: 0, value: students, label: 'Students',color:'rgb(110, 65, 116)' },
    { id: 1, value: supervisors, label: 'Supervisors',color:'rgb(170, 116, 159)' },
  ];
  return (
    <Box className='flex_column' sx={{ width: '100%', textAlign: 'center',alignItems:'center'}}>
      <Typography variant="h5" sx={{color:'#fff',paddingTop:'20px'}} gutterBottom>
        Users Distribution
      </Typography>

      <PieChart
        series={[
          {
            data,
            arcLabel: (item) => `${item.label} (${item.value})`,
            highlightScope: { fade: 'global', highlight: 'item' },
            cornerRadius: 4,
          },
        ]}
        width={300}
        height={200}
          hideLegend

      />
    </Box>
  );
}