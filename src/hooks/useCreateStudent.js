import { toast } from "react-toastify";
import useAuth from "./useAuth";
import useGetSupervisors from "./useGetSupervisors";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function useCreateStudent() {
  // تعريف custom hook اسمه useRegister
  const queryClient = useQueryClient();

  const { serverErrors, setServerErrors, authMutation } = useAuth(
    "/Identity/Users/create-student",
    null,
  );

  //  useQuery لجلب الدكاترة
  const { supervisors, supervisorsLoading } = useGetSupervisors();

  useEffect(() => {
    if (authMutation.isSuccess) {
      //  امسح الأخطاء
      setServerErrors("");
      toast.success("Student created successfully");
    }
  }, [authMutation.isSuccess]);

  queryClient.invalidateQueries(["users"]);

  return {
    serverErrors,
    authMutation,
    supervisors, // نرجع الدكاترة (لو لسا ما وصلوا نرجع array فاضي)
    supervisorsLoading, // حالة اللودينج
  }; // نرجع القيم اللي بدنا نستخدمها بالكومبوننت
}