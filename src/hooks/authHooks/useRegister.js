import useAuth from "./useAuth.js";
import useGetSupervisors from "../getUsersHooks/useGetSupervisors.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useRegister(){

   const navigate = useNavigate();

  const onSuccessCallback = (response) => {
  toast.success(
    "Account created. Check your email to confirm.",
    {
      position: "top-left",
      autoClose: 3200,
    }
  );

  setTimeout(() => {
    navigate("/auth/login");
  }, 4000);
};

  const { serverErrors, authMutation } = useAuth("/Identity/Auths/register-student",null,onSuccessCallback);

    //  useQuery لجلب الدكاترة
 const{supervisors,supervisorsLoading}=useGetSupervisors();
  return { serverErrors,
           authMutation,
           supervisors, // نرجع الدكاترة (لو لسا ما وصلوا نرجع array فاضي)
           supervisorsLoading // حالة اللودينج
    }; // نرجع القيم اللي بدنا نستخدمها بالكومبوننت
}