import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInstance";
import { Bounce, toast } from "react-toastify";

export default function useUpdateUserInfo(){
        const queryClient = useQueryClient();
        

        const updateUserInfoMutation = useMutation({
            mutationFn : async({userId, userInfo})=>{
                console.log(userId);
                console.log("info : " , userInfo);
                const response = await axiosInstance.put(`/Identity/Users/update/${userId}`,userInfo);
                console.log(response);
                return response;
            },
            onSuccess:()=>{
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
            onError: ()=>{
                toast.error('Operation failed. Please try again.', {
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

        queryClient.invalidateQueries(["users"]); //update users table

        

        return {updateUserInfoMutation}
    
}