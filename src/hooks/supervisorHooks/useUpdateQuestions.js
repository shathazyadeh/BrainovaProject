import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../Api/axiosInstance";
import { useState } from "react";

export default function useUpdateQuestions(options = {}) {
  const queryClient = useQueryClient();
  const [serverErrors, setServerErrors] = useState("");

  const updateQuestionsMutation = useMutation({
    mutationFn: async ({ reportId, data }) => {
      const response = await axiosInstance.put(
        `/Supervisor/ReportQuestions/${reportId}`,
        data,
      );
      return response.data;
    },
    onSuccess: (response) => {
      setServerErrors("");
      toast.success("Question updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["reportQuestions"] });
    },
    onError: (err) => {
      const errors = err.response?.data?.errors;

      if (errors) {
        // جمع كل الرسائل (لأنه ممكن يكون في أكثر من field)
        const firstError = Object.values(errors)[0][0];
        setServerErrors(firstError);
      } else {
        setServerErrors("Operation failed. Please try again.");
      }
    },
  });

  return { updateQuestionsMutation, serverErrors };
}