import { toast } from "react-toastify";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "../authHooks/useAuth";

function useCreateAdmin() {
 const queryClient = useQueryClient();

 const {serverErrors,setServerErrors,authMutation} = useAuth('/Identity/Users/create-admin',null);

   useEffect(() => {
      if (authMutation.isSuccess) {
        //  مسحنا الأخطاء
        setServerErrors('');
        toast.success("Admin created successfully");
      }
    }, [authMutation.isSuccess]);

    queryClient.invalidateQueries(["users"]);

  return {serverErrors,authMutation}
}

export default useCreateAdmin;