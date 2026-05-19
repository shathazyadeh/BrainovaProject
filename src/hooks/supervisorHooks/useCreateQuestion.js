import usePost from "../generalHooks/usePost";

export default function useCreateQuestion(options = {}) {

  const { usePostMutation, serverErrors } = usePost(
       "/Supervisor/ReportQuestions",
    {
      onSuccess: (data) => {
        // أول إشي نفذ onSuccess اللي جاي من برّا (اذا موجود)
        if (options.onSuccess) {
          options.onSuccess(data);
        }
      },
    }
  );

  return { usePostMutation, serverErrors };
}