import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import notFoundImg from "./../../../assets/images/notFound/notFoundImg.webp";
import useAuthStore from "../../../store/useAuthStore";

function NotFound() {
  const user = useAuthStore((state) => state.user);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
  if (isAuthLoading) return null;

  return (
    <Box
      className="not_found flex_column"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
        height: "100vh",
      }}
    >
      <Box
        component={"img"}
        src={notFoundImg}
        sx={{ width: { xs: "120px", sm: "250px", md: "400px" } }}
        alt="404 page not found illustration with ghost inside number zero"
      />
      <Typography
        component={"h1"}
        sx={{
          fontSize: { xs: "15px", sm: "20px", md: "30px" },
          fontWeight: "600",
          fontFamily: "var(--primary-font)",
        }}
      >
        Page not found
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "10px", sm: "15px", md: "20px" },
          fontWeight: "500",
          fontFamily: "var(--primary-font)",
          maxWidth: { xs: "200px", sm: "330px", md: "430px" },
          textAlign: "center",
        }}
      >
        The Page you are looking for doesn’t exist. Go back, or head over to{" "}
        <Typography
          component={RouterLink}
          to={
            user?.roles[0] === "Student"
              ? "/home"
              : user?.roles[0] === "Supervisor"
                ? "/dashboard/supervisor"
                : user?.roles[0] === "SuperAdmin"
                  ? "/dashboard/super-admin"
                  : "/dashboard/admin"
          }
          sx={{
            color: "var(--primary-color)",
            fontSize: { xs: "10px", sm: "15px", md: "20px" },
            fontWeight: "500",
            fontFamily: "var(--primary-font)",
            transition: "0.3s",
            "&:hover": {
              color: "#000",
            },
          }}
        >
          {user?.roles[0] === "Student" ? "Home" : "Dashboard"}
        </Typography>
      </Typography>
    </Box>
  );
}
export default NotFound;