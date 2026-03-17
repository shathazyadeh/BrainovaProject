import { toast } from "react-toastify";
import useAuth from "./useAuth";
import { useEffect } from "react";

export default function useCreateSupervisor(){ // تعريف custom hook اسمه useRegister

  const {serverErrors,setServerErrors,authMutation} = useAuth('/Identity/Users/create-supervisor',null);

   useEffect(() => {
      if (authMutation.isSuccess) {
        //  مسحنا الأخطاء
        setServerErrors('');
        toast.success("Supervisor created successfully");
      }
    }, [authMutation.isSuccess]);

  return { serverErrors,
           authMutation,
    }; // نرجع القيم اللي بدنا نستخدمها بالكومبوننت
}