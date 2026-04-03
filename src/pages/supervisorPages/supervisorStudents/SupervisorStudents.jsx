import { Box, Container, Grid } from '@mui/system'
import Avatar from '@mui/material/Avatar';
import { Button, Typography } from '@mui/material';
import { TfiEmail } from "react-icons/tfi";
import { Link as RouterLink } from "react-router-dom";
import { useState } from 'react';
import useGetMyStudentsInfo from '../../../hooks/supervisorHooks/useGetMyStudentsInfo';
import UsersSearch from '../../../components/usersSearch/UsersSearch';
import Loader from '../../../components/uiVerseComponents/loader/Loader';
import DashboardNavbar from '../../../components/muiComponents/dashboardNavbar/DashboardNavbar';


function SupervisorStudents() {
  const { isError, error, isLoading, data } = useGetMyStudentsInfo();
  console.log("students info:", data);
  const [search, setSearch] = useState("");


  if (isError) {
    //server errors
    return (
      <Box
        component={"section"}
        className="server_error_section flex_column"
        sx={{
          bgcolor: "var(--navy-color)",
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Typography
          component={"h1"}
          variant="h5"
          sx={{ color: "white", fontWeight: "700", textAlign: "center" }}
        >
          {error?.message}
        </Typography>
      </Box>
    );
  }
  return (

    <Box sx={{ bgcolor: 'var(--navy-color)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}> {/*لون الخلفية للصفحة كلهاا */}
      <DashboardNavbar />
      <Box component={'section'} sx={{
        paddingTop: '10px',
        paddingBottom: "50px",
        flexGrow: 1,
        alignItems: 'flex-start',
        display: 'block',
        minHeight: '100vh'
      }}>
        <Container maxWidth="lg">
      {isLoading && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                left:"200px",
                bgcolor: 'var(--navy-color)',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 10,
                "@media (max-width:899px)": {
                left:"0px",
            }
              }}
            >
              <Loader />
            </Box>
          )}
          <Box className='search' >
            <UsersSearch search={search} setSearch={setSearch} />
          </Box>
          <Grid container spacing={2}>


            {data?.filter((student) =>  //لفتلترة الداتا حسب السيرش
              student.fullName?.toLowerCase().includes(search.toLowerCase()) ||
              student.userName?.toLowerCase().includes(search.toLowerCase())
            ).map((student) => (
              <Grid item size={{ xs: 12, sm: 6, md: 4 }} >
                <Box className='student_info' sx={{
                  bgcolor: "#5655554c", padding: '25px', borderRadius: '10px', height: '250px', border: '1px solid #5f5c5c', transition: 'all 0.3s ease',
                  '&:hover': {
                    border: '1px solid  #e204049f',
                    transform: 'scale(1.03)'
                  },
                  '&:hover .MuiAvatar-root': {
                    boxShadow: "0 0 15px rgba(207, 25, 25, 0.81)"
                  }
                }}>

                  <Box className='avatar' sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Avatar sx={{ bgcolor: '#e20404', }}>{student.userName?.charAt(0).toUpperCase()}</Avatar>
                    <Typography sx={{ color: '#fff' }}>{student.fullName}</Typography>
                  </Box>

                  <Box className='email' component={'span'} sx={{ paddingY: '17px', display: 'flex', gap: '7px', borderBottom: '1px solid #5f5c5c76', }}>
                    <TfiEmail color='#aaa' />
                    <Typography sx={{ color: '#aaa', fontSize: '12px', overflowWrap: 'break-word', wordBreak: 'break-all' }}>{student.email}</Typography>

                  </Box>
                  <Box className='flex_column' sx={{ color: '#aaa', marginTop: '10px', }}>
                    Reports
                    <Typography sx={{ color: '#fff', fontWeight: '600' }}>{student?.reportsCount}</Typography>
                  </Box>
                  <Button component={RouterLink}
                    to="/dashboard/supervisor/reports"
                    sx={{
                      borderRadius: '15px', bgcolor: '#6f6e6e3b', color: '#ffffff', paddingX: '30px', textAlign: 'center', width: '100%', marginTop: '10px', fontSize: '12px', textTransform: 'none', '&:hover': {
                        bgcolor: " #ff00009f",
                        boxShadow: "0 0 15px rgba(207, 25, 25, 0.51)"
                      },
                    }}>View Reports</Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

      </Box>


      <Box className="lower_footer" sx={{ borderTop: "1px solid rgba(53, 53, 53, 0.93)", width: 'fit-content', margin: 'auto', paddingX: { xs: '0px', md: '200px' }, textAlign: 'center', marginTop: { xs: '60px', md: '0px' } }}>
        <Typography
          component={"p"}
          sx={{ color: "var(--mid-gray-color)", paddingY: "30px" }}
        >
          © 2026 <Typography component={'span'} sx={{ color: 'var(--dark-red-color)' }}>Brainova</Typography>. All rights reserved. | Built for medical education
          and research purposes.
        </Typography>
      </Box>
    </Box>
  )
}

export default SupervisorStudents