import useAuth from "./useAuth";
import useAuthStore from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function useLogin(){

  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state)=>state.setAccessToken); // دالة لتخزين التوكن
  const setUser = useAuthStore((state)=>state.setUser); // دالة لتخزين بيانات المستخدم

  const handleLoginSuccess = (response) => {

    const accessToken = response.data.token;
    console.log(accessToken);
    setAccessToken(accessToken);
    const decoded = jwtDecode(accessToken);
    console.log(decoded);
    const user = {
      name: decoded.Name,
      fullName:decoded.FullName,
      role: decoded.Role,
      email: decoded.Email,
      phoneNumber:decoded.PhoneNumber,
      id: decoded.Id
    };
    setUser(user);
    if (user.role === "Student") navigate('/home');
    else if(user.role === "Supervisor") navigate('/dashboard/supervisor');
    else if(user.role === "Admin") navigate('/dashboard/admin')
  };

    const {serverErrors,authMutation} = useAuth('Identity/Auths/login',null // ما بدنا navigate من useAuth
    ,handleLoginSuccess); //handleLoginSuccess = الدالة اللي رح تنفذ بعد ما login ينجح
    return {serverErrors,authMutation};
}