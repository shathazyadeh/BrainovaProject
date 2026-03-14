import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInstance"; // استيراد axiosInstance (اللي فيه baseURL و interceptors جاهزين)
import useAuth from "./useAuth";

export default function useCreateStudent(){ // تعريف custom hook اسمه useRegister

  const {serverErrors,authMutation} = useAuth('/Identity/Users/create-student',null);

      //  useQuery لجلب الدكاترة
   const{supervisors,supervisorsLoading}=useGetSupervisors();

  return { serverErrors,
           authMutation,
           supervisors, // نرجع الدكاترة (لو لسا ما وصلوا نرجع array فاضي)
           supervisorsLoading // حالة اللودينج
    }; // نرجع القيم اللي بدنا نستخدمها بالكومبوننت
}