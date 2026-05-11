import DashboardNavbar from "../../components/muiComponents/dashboardNavbar/DashboardNavbar";
import EnhancedTable from "../../components/muiComponents/enhancedTabel/EnhancedTable";
import useFilteredArray from "../../hooks/getUsersHooks/useFilteredArray";
import useGetUsers from "../../hooks/getUsersHooks/useGetUsers";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import NestedModal from "../../components/muiComponents/nestedModal/NestedModal";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import UsersSearch from "../../components/filterSearch/usersSearch/UsersSearch";
import UsersFilters from "../../components/filterInputs/usersFilters/UsersFilters";
import BasicModal from "../../components/muiComponents/basicModal/BasicModal";
import Loader from "../../components/uiVerseComponents/loader/Loader";

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
    filteredByRole = filteredArr.filter((user) => user.roleName === roleFilter);
  }

  let finalFiltered = filteredByRole;
  if (supervisorFilter) {
    finalFiltered = filteredByRole.filter(
      (user) => user.supervisorId === supervisorFilter,
    );
  }

    if (isLoading) {
      return (
        <>
          <DashboardNavbar />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height:"100vh",
            }}
          >
            <Box sx={{ marginTop: "290px" }}>
                  <Loader />
                </Box>
          </Box>
        </>
      );
    }
  
    if (isError) {
      return (
        <>
          <DashboardNavbar />
          <Box
                component={"section"}
                className="server_error_section flex_column"
                sx={{
              height:"100vh"
            }}
              >
                <Typography
                  component={"h1"}
                  variant="h5"
                  sx={{
                    marginTop: "290px",
                    color: "white",
                    fontWeight: "700",
                    textAlign: "center",
                    "@media (max-width:456px)": {
                      fontSize: "20px",
                    },
                  }}
                >
                  {error?.message || "Something went wrong"}
                </Typography>
              </Box>
        </>
      );
    }

  return (
    <Box
      sx={{
        bgcolor: "var(--navy-color)",
      }}
    >
      <DashboardNavbar />

      <Box
        component={"section"}
        className="manage_user_table"
        sx={{ minHeight: "100vh", paddingBottom: "50px" }}
      >
        <Container maxWidth="lg">
          <Box className="section_titel" sx={{ marginBottom: "40px" }}>
            <Typography
              component={"h1"}
              variant="h4"
              sx={{
                color: "#fff",
                fontFamily: "var(--primary-font)",
                fontWeight: "600",
                display: "inline",
                marginRight: "10px",
                "@media (max-width:700px)": {
                  fontSize: "22px",
                },
              }}
            >
              User Management
            </Typography>
            <Typography sx={{ color: "var(--secondary-color)" }}>
              Manage users, control access, and keep everything organized.
            </Typography>
          </Box>
          <Grid container rowSpacing={0.1} columnSpacing={1}>
            <Grid item>
              <UsersFilters
                sx={{ bgcolor: "white" }}
                roleFilter={roleFilter}
                setRoleFilter={setRoleFilter}
                supervisorFilter={supervisorFilter}
                setSupervisorFilter={setSupervisorFilter}
                supervisorsList={data?.filter(
                  (u) => u.roleName === "Supervisor",
                )}
              />
            </Grid>
            <Grid item sx={{ flexGrow: "1" }}>
              <UsersSearch search={search} setSearch={setSearch} />
            </Grid>
            <Grid item>
              <NestedModal
                open={open} // حالة فتح المودال
                handleClose={handleClose} // فنكشن الاغلاق
              />
            </Grid>
          </Grid>

          <Box className="users_table" sx={{ marginTop: "20px" }}>
            <EnhancedTable
              rows={finalFiltered}
              handleOpen={handleOpen} // نرسل فنكشن فتح المودال للجدول
              defaultRowsPerPage={10}
              search={search}
            />
          </Box>

          <BasicModal //for update users info
            open={open} // حالة فتح المودال
            handleClose={handleClose} // فنكشن الاغلاق
            user={selectedUser} // بيانات المستخدم المختار
            type="editUser"
          />
        </Container>
      </Box>

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
  );
}

export default UserManagement;