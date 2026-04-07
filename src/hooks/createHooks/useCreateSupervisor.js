import { toast } from "react-toastify";
import { useEffect } from "react";
import useAuth from "../authHooks/useAuth";

export default function useCreateSupervisor() {

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


  return { serverErrors, authMutation }; // نرجع القيم اللي بدنا نستخدمها بالكومبوننت
}