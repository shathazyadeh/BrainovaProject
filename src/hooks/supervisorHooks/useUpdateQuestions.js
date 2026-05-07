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
      const data = err.response?.data;

      let message = "Operation failed. Please try again.";

      if (data?.errors) {
        const firstError = Object.values(data.errors)[0]?.[0];
        message = firstError || message;
      } else if (data?.message) {
        message = data.message;
      }

      setServerErrors(message);
    },
  });

  return { updateQuestionsMutation, serverErrors, setServerErrors };
}