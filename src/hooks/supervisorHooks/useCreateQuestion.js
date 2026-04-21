import usePost from "../generalHooks/usePost";


export const useCreateQuestion = (options = {}) => {
  const { usePostMutation, serverErrors } = usePost( "/Supervisor/ReportQuestions",
    options
    
  );

  return { usePostMutation, serverErrors };
};