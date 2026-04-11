import usePost from "../generalHooks/usePost";

export default function useMarkAllAsSeen() {

  const { serverErrors, usePostMutation } = usePost("/Student/Feedbacks/mark-all-seen");


  return {
    usePostMutation,
    serverErrors,
    isLoading: usePostMutation.isLoading,
  };
}