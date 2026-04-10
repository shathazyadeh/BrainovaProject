import useFetch from "../generalHooks/useFetch";

export default function useGetDashboardSummary(){
  return useFetch("/Supervisor/DashboardSummary", ['dashboardSummary']); 
}