import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import useLogout from "../../../hooks/authHooks/useLogout";

function AuthFallback() { // اذا صار خلل بالاند البوينت اوث مي
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const { authMutation } = useLogout();

  const handleBack = () => {
  authMutation.mutate(undefined, { //عملنا لوج اوت من الهوك عشان نتأكد انها انمسحت من الكوكيز
    onError: () => {
      logout(); // بس بحال صار خلل بالاند بوينت للوج اوت بنروح نعمله لوج اوت من الاوث ستور والي بمسح بس بيانات زستند مش الكوكيز
    },
  });

   navigate("/auth/login");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#000",
        color: "#fff",
        gap: 4,
      }}
    >
      <Typography sx={{fontSize: { xs: "20px", sm: "26px" },fontFamily:"var(--primary-font)"}}>
        Session expired or unauthorized
      </Typography>

      <Button className="auth_btn" variant="contained" onClick={handleBack} sx={{bgcolor:"var(--primary-color)",fontFamily:"var(--primary-font)",fontSize: { xs: "12px", sm: "18px" }}}>
        Back to Login
      </Button>
    </Box>
  );
}

export default AuthFallback;