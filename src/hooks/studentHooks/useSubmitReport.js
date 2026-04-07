import usePost from "../generalHooks/usePost";

export default function useSubmitReport() {

  const { serverErrors, usePostMutation } = usePost("/Student/Reports/submit");


  return {
    usePostMutation,
    serverErrors,
    isLoading: usePostMutation.isLoading,
  };
}