import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInstance";
import { Bounce, toast } from "react-toastify";
import useGetSupervisors from "./useGetSupervisors";
import useAuthStore from "../store/useAuthStore";

export default function useUpdateUserInfo(){
        const queryClient = useQueryClient();
        const currentUser = useAuthStore((state) => state.user); //المستخدم الي فاتح وبعدل اي الي معلوماته في اللوكال ستوريج
        const updateUser = useAuthStore((state) => state.updateUser);
        

        const updateUserInfoMutation = useMutation({
            mutationFn : async({userId, userInfo})=>{
                console.log(userId);
                console.log("info : " , userInfo);
                const response = await axiosInstance.put(`/Identity/Users/update/${userId}`,userInfo);
                console.log("response from udate : ", response.data.userId);
                return response;
            },
            onSuccess:(data, variables)=>{ //رياكت كويري بترجعلي المتغيرات الي استخدمتها في الميوتيشين فوق تحت اسم فاريابلز
                console.log("currentUser id ", currentUser.id);
                console.log("data?.data?.userId : ", data?.data?.userId);
                if(currentUser?.id === data?.data?.userId)
                updateUser(variables.userInfo);   // يحدث Zustand + localStorage
                console.log('update :' , variables.userInfo);
                queryClient.invalidateQueries(["users"]); //update users table
                toast.success('User information updated successfully', {
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


            //  useQuery لجلب الدكاترة
         const{supervisors,supervisorsLoading}=useGetSupervisors();
        

        return {updateUserInfoMutation,supervisors,supervisorsLoading}
    
}