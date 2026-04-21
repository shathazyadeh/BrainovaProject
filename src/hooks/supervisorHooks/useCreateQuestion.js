import usePost from "../generalHooks/usePost";

export const useCreateQuestion = () => {
  const { usePostMutation, serverErrors } = usePost( "/Supervisor/ReportQuestions");

  return { usePostMutation, serverErrors };
};