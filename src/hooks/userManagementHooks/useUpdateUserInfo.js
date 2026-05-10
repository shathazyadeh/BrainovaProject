import { useMutation } from "@tanstack/react-query";
import { Bounce, toast } from "react-toastify";
import useGetSupervisors from "../getUsersHooks/useGetSupervisors";
import axiosInstance from "../../Api/axiosInstance";
import useAuthStore from "../../store/useAuthStore";

export default function useUpdateUserInfo(){
        const currentUser = useAuthStore((state) => state.user); //المستخدم الي فاتح وبعدل اي الي معلوماته في اللوكال ستوريج
        const updateUser = useAuthStore((state) => state.updateUser);
        
        //  update user info
        const updateUserInfoMutation = useMutation({
            mutationFn : async({userId, userInfo})=>{
                const response = await axiosInstance.put(`/Identity/Users/update/${userId}`,userInfo);
                return response;
            },
            onSuccess:(data, variables)=>{ //رياكت كويري بترجعلي المتغيرات الي استخدمتها في الميوتيشين فوق تحت اسم فاريابلز
                if(currentUser?.id === data?.data?.userId)
                updateUser(variables.userInfo);   // يحدث Zustand + localStorage
            },
            onError: (error)=>{
                toast.error(`Operation failed, ${ error.response?.data?.message }. Please try again.`)
            } 
        });

        // change password
        const changePasswordMutation = useMutation({
          mutationFn: async ({ userId, newPassword }) => {
            return axiosInstance.patch(
              `/Identity/Users/change-password/${userId}`,
              {
                newPassword,
              },
            );
          },
          onError: (error) => {
            toast.error(`Operation failed, ${ error.response?.data?.message }. Please try again.`)
          },
        });

        // change role
        const changeRoleMutation = useMutation({
          mutationFn: async ({ userId, roleName }) => {
            return axiosInstance.put(`/Identity/Users/change-role`, {
              userId,
              roleName,
            });
          },
          onError: (error) => {
             toast.error(`Operation failed, ${ error.response?.data?.message }. Please try again.`)
          },
        });


            //  useQuery لجلب الدكاترة
         const{supervisors,supervisorsLoading}=useGetSupervisors();
    

        return {
          updateUserInfoMutation,
          changePasswordMutation,
          changeRoleMutation,
          supervisors,
          supervisorsLoading
        };
    
}