import usePost from "../generalHooks/usePost";

export default function useMarksAsSeen() {
  const { serverErrors, usePostMutation } = usePost();

  const markAsSeen = (feedbackId) => {
  return usePostMutation.mutateAsync({
    url: `/Student/Feedbacks/${feedbackId}/mark-seen`
});
};

  return {
    markAsSeen,
    serverErrors,
    isLoading: usePostMutation.isLoading,
  };
}