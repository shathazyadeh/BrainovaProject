import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../Api/axiosInstance";

export default function useUpdateQuestions(options = {}) {
  const queryClient = useQueryClient();
  const updateQuestionsMutation = useMutation({
    mutationFn: async ({reportId,data}) => {
      const response = await axiosInstance.put(
        `/Supervisor/ReportQuestions/${reportId}`,data
      );
      return response.data;
    },
    onSuccess: (response) => {
      toast.success("Question updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["reportQuestions"] });
    },
    onError: (error) => {
      toast.error( error?.response?.data?.message||"Operation failed. Please try again.");
    },
  });

  return { updateQuestionsMutation };
}