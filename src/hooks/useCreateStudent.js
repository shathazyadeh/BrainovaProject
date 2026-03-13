import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInstance"; // استيراد axiosInstance (اللي فيه baseURL و interceptors جاهزين)
import useAuth from "./useAuth";

export default function useCreateStudent(){ // تعريف custom hook اسمه useRegister

  const {serverErrors,authMutation} = useAuth('/Identity/Users/create-student',null);

    //  useQuery لجلب الدكاترة
  const supervisorsQuery = useQuery({ //useQuery بترجع اوبجيكت كبير فيه معلومات عن الطلب
    queryKey: ["supervisors"], // مفتاح فريد للكاش
    queryFn: async () => { // الدالة اللي بتجيب البيانات
      const response = await axiosInstance.get("/Identity/Users/supervisors"); // طلب GET للدكاترة
      return response.data; // نرجع البيانات فقط
    }
  });
   console.log(supervisorsQuery);

  return { serverErrors,
           authMutation,
           supervisors: supervisorsQuery.data || [], // نرجع الدكاترة (لو لسا ما وصلوا نرجع array فاضي)
           supervisorsLoading: supervisorsQuery.isLoading // حالة اللودينج
    }; // نرجع القيم اللي بدنا نستخدمها بالكومبوننت
}