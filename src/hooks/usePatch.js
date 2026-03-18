import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInstance"
import { Bounce, toast } from "react-toastify";

export default function usePatch(url) {
  const queryClient = useQueryClient();

    const usePatchMutation = useMutation({
        mutationFn: async (userId) => {
            const response = await axiosInstance.patch(`${url}/${userId}`);
            console.log(response);
            return response;
        }
        , onSuccess: () => {
            toast.success('Operation completed successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
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
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
        }
    })
    return { usePatchMutation };
}

