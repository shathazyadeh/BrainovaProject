import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../Api/axiosInstance";

export default function useChangeFeedback(options = {}) {
  const queryClient = useQueryClient();
  const changeFeedbackMutation = useMutation({
    mutationFn: async ({feedbackId,comment}) => {
      const response = await axiosInstance.put(
        `/Supervisor/Feedbacks/${feedbackId}`,{comment},
      );
      return response.data;
    },
    onSuccess: (response) => {
      toast.success("Feedback updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["studentFeedbacks"] });
      queryClient.invalidateQueries({ queryKey: ["studentUnseenFeedbacks"] });
      if (options?.onSuccess) {
        options.onSuccess(response);
        toast.success(response);
      }
    },
    onError: (error) => {
      toast.error("Operation failed. Please try again.");
    },
  });

  return { changeFeedbackMutation };
}