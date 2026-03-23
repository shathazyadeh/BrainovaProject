import { toast } from "react-toastify";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function useCreateSupervisor() {
  // تعريف custom hook اسمه useRegister
  const queryClient = useQueryClient();

  const { serverErrors, setServerErrors, authMutation } = useAuth(
    "/Identity/Users/create-supervisor",
    null,
  );

  useEffect(() => {
    if (authMutation.isSuccess) {
      //  مسحنا الأخطاء
      setServerErrors("");
      toast.success("Supervisor created successfully");
    }
  }, [authMutation.isSuccess]);

  queryClient.invalidateQueries(["users"]);

  return { serverErrors, authMutation }; // نرجع القيم اللي بدنا نستخدمها بالكومبوننت
}