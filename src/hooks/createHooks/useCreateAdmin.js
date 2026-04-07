import { toast } from "react-toastify";
import { useEffect } from "react";
import useAuth from "../authHooks/useAuth";

function useCreateAdmin() {

 const {serverErrors,setServerErrors,authMutation} = useAuth('/Identity/Users/create-admin',null);

   useEffect(() => {
      if (authMutation.isSuccess) {
        //  مسحنا الأخطاء
        setServerErrors('');
        toast.success("Admin created successfully");
      }
    }, [authMutation.isSuccess]);


  return {serverErrors,authMutation}
}

export default useCreateAdmin;