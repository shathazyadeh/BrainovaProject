import SecondNavbar from '../../components/secondNavbar/SecondNavbar'
import EnhancedTable from '../../components/enhancedTabel/EnhancedTable'
import useFilteredArray from '../../hooks/useFilteredArray';
import useGetUsers from '../../hooks/useGetUsers';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import NestedModal from '../../components/nestedModal/NestedModal';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom' 
import UsersSearch from '../../components/usersSearch/UsersSearch';
import UsersFilters from '../../components/usersFilters/UsersFilters';
import BasicModal from '../../components/basicModal/BasicModal';

function UserManagement() {
      
      const { isError, error, isLoading, data } = useGetUsers(); //ممنوع نغير اسمها هاي ديستراكتينج للكويري الي بترجع من يوس كويري

      // state للتحكم بفتح واغلاق المودال
        const [open, setOpen] = useState(false);
        // فنكشن فتح المودال
        // نخزن المستخدم الذي ضغطنا عليه

        const [selectedUser, setSelectedUser] = useState(null);
        const handleOpen = (user) => {
          setSelectedUser(user); // حفظ بيانات المستخدم
          setOpen(true); // فتح المودال
        };
        // فنكشن اغلاق المودال
        const handleClose = () => {
          setOpen(false); // اغلاق المودال
        };

        const [search, setSearch] = useState("");
        const [roleFilter, setRoleFilter] = useState("all"); //فلترة حسب الرول 
        const [supervisorFilter, setSupervisorFilter] = useState(""); // فلترة حسب اسم الدكتور "" يعني الكل

         const { filteredArr } = useFilteredArray(data); //هاي عشان فلترة المستخدمين بعد الحصول عالداتا

         
      let filteredByRole = filteredArr;
      if (roleFilter !== "all") {
        filteredByRole = filteredArr.filter(user => user.roleName === roleFilter);
      } 

      let finalFiltered = filteredByRole;
      if (supervisorFilter) {
        finalFiltered = filteredByRole.filter(
          (user) => user.supervisorId === supervisorFilter
        );
        
      }


      if (isLoading) return <Box sx={{position: "fixed",inset: 0,zIndex: 9999,bgcolor:'var(--navy-color)',display:'flex',justifyContent:'center',alignItems:'center'}}><CircularProgress sx={{color:'#fff'}}></CircularProgress></Box>
  if (isError) {
      //server errors
      return (
        <Box
          component={"section"}
          className="server_error_section flex_column"
          sx={{
            bgcolor:"var(--navy-color)",
            position: "fixed",inset: 0,zIndex: 9999,
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
          <Button
            className="auth_btn"
            component={RouterLink}
            to="/auth/login"
            sx={{
              bgcolor: "var(--primary-color)",
              color: "white",
              borderRadius: "6px",
              fontWeight: "600",
              paddingX: "25px",
              paddingY: "10px",
            }}
          >
            Back to Login
          </Button>
        </Box>
      );
    }



  return (
    <Box sx={{bgcolor: "rgb(36, 35, 35)" // تأكد أن الخلفية الداكنة تغطي كامل الشاشة
}}>
      <SecondNavbar/>

      <Box component={'section'} className='manage_user_table' sx={{padding:'40px',minHeight: '100vh'}}>
              <Grid container rowSpacing={0.1} columnSpacing={1}>
                <Grid item size={{}}>
                    <UsersFilters sx={{bgcolor:'white'}}
                  roleFilter={roleFilter}
                  setRoleFilter={setRoleFilter}
                  supervisorFilter={supervisorFilter}
                  setSupervisorFilter={setSupervisorFilter}
                  supervisorsList={data.filter(u => u.roleName === "Supervisor")}
                />
                </Grid>
                <Grid item sx={{flexGrow:'1'}}>
                  <UsersSearch search={search} setSearch={setSearch} />
                </Grid>
                <Grid item></Grid>
                <NestedModal
                open={open} // حالة فتح المودال
                handleClose={handleClose} // فنكشن الاغلاق
               />
              </Grid>            
      

      <Box className="users_table" sx={{marginTop:'20px'}}>
        <EnhancedTable 
              rows={finalFiltered}
              handleOpen={handleOpen} // نرسل فنكشن فتح المودال للجدول
              defaultRowsPerPage={10}
              search={search}
            />
      </Box>
      
      <BasicModal       //for update users info
              open={open} // حالة فتح المودال
              handleClose={handleClose} // فنكشن الاغلاق
              user={selectedUser} // بيانات المستخدم المختار
            />
            
      </Box>

      <Box className="lower_footer" sx={{borderTop: "1px solid rgba(53, 53, 53, 0.93)",width:'fit-content',margin:'auto',paddingX:{xs:'0px' , md:'200px'},textAlign:'center',marginTop:{xs:'60px',md:'0px'}}}>
              <Typography
                component={"p"}
                sx={{ color: "var(--mid-gray-color)", paddingY: "30px" }}
              >
                © 2026 <Typography component={'span'} sx={{color:'var(--dark-red-color)'}}>Brainova</Typography>. All rights reserved. | Built for medical education
                and research purposes.
              </Typography>
            </Box>
      
    </Box>
  )
}

export default UserManagement