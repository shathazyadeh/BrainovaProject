import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore.js";
import useAuth from "./useAuth.js";
import axiosInstance from "../../Api/axiosInstance.js";

export default function useLogin() {

  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);

 const handleLoginSuccess = async () => {

  try {
    const res = await axiosInstance.get("Identity/Auths/me");

    const user = res.data;

    setUser(user);

    const role = user.roles?.[0];

    if (role === "Student") navigate('/home');
    else if (role === "Supervisor") navigate('/dashboard/supervisor');
    else if (role === "Admin") navigate('/dashboard/admin');
    else if (role === "SuperAdmin") navigate('/dashboard/super-admin');

  } catch (error) {
    console.log(error);
  }
};

  const { serverErrors, authMutation } = useAuth('Identity/Auths/cookie-login', null, handleLoginSuccess);

  return { serverErrors, authMutation };
}