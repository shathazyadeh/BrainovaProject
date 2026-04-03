import useFetch from "../../generalHooks/useFetch";

export default function useGetQuestions() {
  return useFetch("/Student/Reports/questions", ["questions"], {
    refetchInterval: false,
  });
}