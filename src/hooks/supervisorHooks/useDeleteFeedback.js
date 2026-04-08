import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../Api/axiosInstance";

export default function useDeleteFeedback(){

    const deleteFeedbackMutation = useMutation({
        mutationFn: async(feedbackId)=>{
            const response = await axiosInstance.delete(`/Supervisor/Feedbacks/${feedbackId}`);
            return response.data;
        }, 
        onSuccess: (data) => {
           toast.success("Feedback deleted successfully.");
        },   
        onError: (error) => {
            toast.success("Operation failed. Please try again.");
        }
    })

    return {deleteFeedbackMutation};
}