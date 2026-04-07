import usePost from "../generalHooks/usePost";

export default function useSubmitFeedback(reportId, options = {}) {

  const { serverErrors, usePostMutation } = usePost(`/Supervisor/Feedbacks/report/${reportId}`,options);


  return {
    usePostMutation,
    serverErrors,
    isLoading: usePostMutation.isLoading,
  };
}