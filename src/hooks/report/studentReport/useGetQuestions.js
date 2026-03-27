import useFetch from "../../useFetch";

export default function useGetQuestions() {
  return useFetch("/Student/Reports/questions", ["questions"], {
    refetchInterval: false,
  });
}