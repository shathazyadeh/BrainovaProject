import RegisterForm from '../../components/registerForm/RegisterForm'
import { Box,  Grid,Container,  Link, Typography } from '@mui/material'
import { Link as RouterLink } from "react-router-dom";
import useUpdateUserInfo from '../../hooks/useUpdateUserInfo';
import { UpdateUserInfoSchema } from '../../validations/UpdateUserInfoSchema';
import useAuthStore from '../../store/useAuthStore';
import FlipClock from '../../components/flipClock/FlipClock';
import studentImg from './../../assets/images/profile/studentImg.webp'
import useGetUserById from '../../hooks/useGetUserById';
function StudentProfile() {
    const user = useAuthStore(state=>state.user);
    const {data} =useGetUserById();
    const userId = user?.id;
    
    return (


        <Box component={'section'} className="profile" sx={{height:"100vh",paddingTop:"50px"}}>
      <Container maxWidth="lg">
        <Box className="user_info" sx={{color:"#fff", bgcolor:"#000", borderRadius:"20px",paddingY:"30px",paddingRight:"10px",display:"flex",boxShadow: "0 0 10px 0 rgb(249, 10, 10)"}}>
         <Grid container spacing={5}>
          <Grid item size={{xs:12,md:3}} sx={{"@media (max-width:900px)": {
        display:"none",
      }}}>
            <Box className="image" sx={{ width: "300px", position: "relative", filter: "drop-shadow(0 0 15px rgba(255,0,0,0.6))"}}>
  <Box
    component="img"
    src={studentImg}
    sx={{
      width: "160px",
      position: "absolute",
      top: "-85px",
      left: "50px",
      "@media (max-width:1116px)": {
        top: "-24px",
      },
    }}
  />
</Box>
          </Grid>
          <Grid item size={{xs:12,md:6}} >
            <Box className="informations">
            <Typography variant='h5' sx={{fontFamily: "var(--secondary-font)",marginBottom:"14px"}}>Hello, {user?.fullName}</Typography>
            <Grid container spacing={4}>
            <Grid item>
                <Typography component={'span'} sx={{color:"var(--secondary-color)"}}>User Name</Typography>
                <Typography sx={{fontFamily: "var(--secondary-font)",fontSize:"20px"}}>{user?.userName}</Typography>
            </Grid>
            <Grid item>
                 <Typography component={'span'} sx={{color:"var(--secondary-color)"}}>Supervisor </Typography>
                 <Typography sx={{fontFamily: "var(--secondary-font)",fontSize:"20px"}}>{data?.supervisorName}</Typography>
            </Grid>
            <Grid item>
                 <Typography component={'span'} sx={{color:"var(--secondary-color)"}}>Phone Number</Typography>
                 <Typography sx={{fontFamily: "var(--secondary-font)",fontSize:"20px"}}>{user?.phoneNumber}</Typography>
            </Grid>
            <Grid item>
                 <Typography component={'span'} sx={{color:"var(--secondary-color)"}}>Account Status</Typography>
                 <Typography sx={{fontFamily: "var(--secondary-font)",fontSize:"20px"}}>{data?.isBlocked? "Inactive":"Active"}</Typography>
            </Grid>
            </Grid>
        </Box>
          </Grid>
          <Grid item size={{xs:12,md:3}} sx={{display:"flex",alignItems:'flex-start',justifyContent:"center"}}>
            <FlipClock/>
          </Grid>
         </Grid>
         
         

      </Box>
          <Box className='student_info' sx={{padding:'80px'}}>
            <Grid container spacing={3} >
              <Grid item size={{md:8}}>
                <Box
                    className="edit_student_info_form flex_column"
                    sx={{
                        borderTopRightRadius: "40px",
                        borderBottomRightRadius: "40px",
                        paddingBottom: "0px",
                        gap: "40px",
                        padding:'60px',
                        bgcolor:'#000'
                    }}
                >
                    <RegisterForm
                        useHook={useUpdateUserInfo}
                        userId={userId}
                        schema={UpdateUserInfoSchema}
                        showPassword={false}
                        showSupervisors={false}
                        btnLabel="Update Profile"
                        fullWidthInput={true}
                        textfieldColor={"textfield_black"}
                        defaultValues={{
                            fullName: user.fullName,
                            userName: user.userName,
                            email: user.email,
                            phoneNumber: user.phoneNumber,
                        }}
                    />
                    <Link
                        component={RouterLink}
                        to={"/auth/security-verification"}
                        sx={{
                            color: "var(--primary-color)",
                            fontFamily: "sans-serif",
                            fontSize: "15px",
                            fontWeight: "600",
                            width: "fit-content",
                        }}
                        className="auth_link"
                    >
                        Reset Password?
                    </Link>
                </Box>
         
              </Grid>

                <Grid item size={{md:4}}>
                <Box sx={{ bgcolor: '#000',padding:'20px' }}>
                    <Typography> hii</Typography>
                     
                </Box>
                </Grid>
            </Grid> 
</Box>
      </Container>
      
    </Box>
    
    )
}

export default StudentProfile





