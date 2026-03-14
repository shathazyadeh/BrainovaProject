import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import useAuthStore from '../../store/useAuthStore';
import SecondNavbar from '../../components/secondNavbar/SecondNavbar';
import useUpdateUserInfo from '../../hooks/useUpdateUserInfo';
import RegisterForm from '../../components/registerForm/RegisterForm';
import { UpdateUserInfoSchema } from '../../validations/UpdateUserInfoSchema';

function Profile() {
     const user = useAuthStore((state) => state.user);
     const userId=user.id;
     console.log('userId',userId);
  return (
    <>
     <SecondNavbar/>
    <Box component={'section'} className='profile'  sx={{height:'100vh',bgcolor:'rgb(36, 35, 35)',display:'flex',justifyContent:'center',alignItems:'center'}}>
      
    <Box className='profile-info' sx={{border:'1px solid var(--secondary-color)',borderRadius:'10px'}}>

   
      <Avatar sx={{ bgcolor: 'var(--secondary-color)', fontSize: '30px', width: 50, height: 50 }}>{user.name.charAt(0).toUpperCase()}</Avatar>
      <Typography sx={{color:'#fff'}}>{user.name}</Typography>
      <RegisterForm useHook={useUpdateUserInfo } userId={userId} mutationName="updateUserInfoMutation" schema={UpdateUserInfoSchema} showPassword={false} showSupervisors={false} btnLabel="Update Profile"/>

    </Box>
      
    </Box>
    </>
  )
}

export default Profile