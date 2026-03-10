import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInstance";

export default function useDeleteUser(){

    const deleteUserMutation = useMutation({
        mutationFn: async(userId)=>{
            console.log(userId);
            const response = await axiosInstance.delete(`/Identity/Users/${userId}`);
            console.log(response);
            return response;
        }, 
        onSuccess: () => {
            toast.success('Operation completed successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                
            });
            queryClient.invalidateQueries(["users"]);
        },
        onError: (error) => {

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
    })

    return {deleteUserMutation};
}