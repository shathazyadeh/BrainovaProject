import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bounce, toast } from "react-toastify";
import useGetSupervisors from "../getUsersHooks/useGetSupervisors";
import axiosInstance from "../../Api/axiosInstance";
import useAuthStore from "../../store/useAuthStore";

export default function useUpdateUserInfo(){
        const queryClient = useQueryClient();
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
                toast.error(`Operation failed, ${ error.response?.data?.message }. Please try again.`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
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
            toast.error(`Operation failed, ${ error.response?.data?.message }. Please try again.`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
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
             toast.error(`Operation failed, ${ error.response?.data?.message }. Please try again.`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
          },
        });

        queryClient.invalidateQueries(["users"]);

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