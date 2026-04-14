import useFetch from "../generalHooks/useFetch";

export default function useGetSummary() {
  return useFetch("Student/DashboardSummary", ["studentSummary"], {
    refetchInterval: false,
  });
}