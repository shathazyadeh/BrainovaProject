import { useQueryClient } from "@tanstack/react-query";
import usePost from "../generalHooks/usePost";

export default function useCreateQuestion(options = {}) {
  const queryClient = useQueryClient();

  const { usePostMutation, serverErrors } = usePost(
    "/Supervisor/RportQuestions",
    {
      onSuccess: (data) => {
        // أول إشي نفذ onSuccess اللي جاي من برّا (اذا موجود)
        if (options.onSuccess) {
          options.onSuccess(data);
        }

        // بعدين اعمل invalidate للـ queries
        queryClient.invalidateQueries({ queryKey: ["reportQuestions"] });
      },
    }
  );

  return { usePostMutation, serverErrors };
}