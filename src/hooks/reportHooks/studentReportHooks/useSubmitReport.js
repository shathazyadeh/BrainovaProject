import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "../../../Api/axiosInstance";

export default function useSubmitReport() {
  const [serverErrors, setServerErrors] = useState("");
  const queryClient = useQueryClient();

  const submitReportMutation = useMutation({
    mutationFn: async (reportAnswers) => {
      console.log("reportAnswers ", reportAnswers);
      const response = await axiosInstance.post(
        "/Student/Reports/submit",
        reportAnswers,
      );
      console.log("res ", response);
      return response;
    },
    onSuccess: (response) => {
      setServerErrors("");
      queryClient.invalidateQueries({ queryKey: ["mriCases"] });
      console.log("submitted");
    },
    onError: (err) => {
      setServerErrors(err.response?.data?.message);
    },
  });

  return { serverErrors, submitReportMutation };
}