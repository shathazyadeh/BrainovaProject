////import { useState } from "react";
import axiosInstance from "../../Api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

export default function usePost(url, options = {}) {
  const [serverErrors, setServerErrors] = useState("");

  const usePostMutation = useMutation({
    mutationFn: async (payload) => {
      //  إذا في url جاي مع mutate استخدمه
      if (payload?.url) {
        const response = await axiosInstance.post(
          payload.url,
          payload.data || {}
        );
        return response.data;
      }

      //  غير هيك استخدم الـ url الأساسي (القديم)
      const response = await axiosInstance.post(url, payload);
      return response.data;
    },

    onSuccess: (response) => {
      setServerErrors("");
      if (options?.onSuccess) {
        options.onSuccess(response);
        toast.success(response?.message || "Success");
      }
    },

    onError: (err) => {
      setServerErrors(err.response?.data?.message || "Something went wrong");
    },
  });

  return { serverErrors, usePostMutation };
}