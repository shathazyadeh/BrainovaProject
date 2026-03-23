
import { toast } from "react-toastify";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
function useCreateAdmin() {


 const {serverErrors,setServerErrors,authMutation} = useAuth('/Identity/Users/create-admin',null);
  const queryClient = useQueryClient();

   useEffect(() => {
      if (authMutation.isSuccess) {
        //  مسحنا الأخطاء
        setServerErrors('');
        toast.success("Admin created successfully");
      }
    }, [authMutation.isSuccess]);

     queryClient.invalidateQueries(["users"]);
  return {serverErrors,
           authMutation
        }
}

export default useCreateAdmin
