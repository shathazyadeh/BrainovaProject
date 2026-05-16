import useFetch from "../generalHooks/useFetch";

export default function useGetAllFeedbacks() {
  return useFetch("/Student/Feedbacks", ["studentFeedbacks"]);
}