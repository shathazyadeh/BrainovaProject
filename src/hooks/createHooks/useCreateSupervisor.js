import { toast } from "react-toastify";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "../authHooks/useAuth";

export default function useCreateSupervisor() {
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