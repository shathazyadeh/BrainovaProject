import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../Api/axiosInstance";

export default function useDeleteFeedback(reportId){
    const queryClient = useQueryClient();

    const deleteFeedbackMutation = useMutation({
        mutationFn: async(feedbackId)=>{
            const response = await axiosInstance.delete(`/Supervisor/Feedbacks/${feedbackId}`);
            return response.data;
        }, 
        onSuccess: (data) => {
           toast.success("Feedback deleted successfully.");
           queryClient.setQueryData(['reportFeedback', reportId], null); // لحذف الفيدباك بشكل فوري من الصفحة
        },   
        onError: (error) => {
            toast.error("Operation failed. Please try again.");
        }
    })

    return {deleteFeedbackMutation};
}