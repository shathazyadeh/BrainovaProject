import useAuth from "./useAuth";
import useGetSupervisors from "./useGetSupervisors";

export default function useRegister(){ // تعريف custom hook اسمه useRegister

  const {serverErrors,authMutation} = useAuth('/Identity/Auths/register-student','/auth/login');

    //  useQuery لجلب الدكاترة
 const{supervisors,supervisorsLoading}=useGetSupervisors();
  return { serverErrors,
           authMutation,
           supervisors, // نرجع الدكاترة (لو لسا ما وصلوا نرجع array فاضي)
           supervisorsLoading // حالة اللودينج
    }; // نرجع القيم اللي بدنا نستخدمها بالكومبوننت
}