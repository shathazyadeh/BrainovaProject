import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore.js";
import useAuth from "./useAuth.js";

export default function useLogin() {

  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);

  const handleLoginSuccess = async (response) => { // لما نعمل لوج ان الباك برجع اليوزر بالرسبونس
    const user = response.data.user;
    setUser(user);
    const role = user.roles?.[0];

    if (role === "Student") navigate('/home');
    else if (role === "Supervisor") navigate('/dashboard/supervisor');
    else if (role === "Admin") navigate('/dashboard/admin');
    else if (role === "SuperAdmin") navigate('/dashboard/super-admin');
  };

  const { serverErrors, authMutation } = useAuth('Identity/Auths/cookie-login',null,handleLoginSuccess);

  return { serverErrors, authMutation };
}