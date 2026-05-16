import useFetch from "../generalHooks/useFetch";

export default function useGetUnseenFeedbacks() {
  return useFetch("/Student/Feedbacks/unseen", ["studentUnseenFeedbacks"], );
}