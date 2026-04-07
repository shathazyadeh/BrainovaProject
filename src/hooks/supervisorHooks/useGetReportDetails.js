import useFetch from "../generalHooks/useFetch";

export default function useGetReportDetails(reportId){
  return useFetch(`/Supervisor/Reports/${reportId}/details`, ['reportDetails',reportId]); 
}