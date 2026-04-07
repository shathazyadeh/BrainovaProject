import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "../../Api/axiosInstance";
import { toast } from "react-toastify";

export default function usePost(url,options = {}) {
  const [serverErrors, setServerErrors] = useState("");

  const usePostMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(url,data);
      return response.data;
    },
    onSuccess: (response) => {
      setServerErrors("");
      if (options?.onSuccess) {
        options.onSuccess(response);
        toast.success(response);
      }
    },
    onError: (err) => {
      setServerErrors(err.response?.data?.message);
    },
  });

  return { serverErrors, usePostMutation };
}