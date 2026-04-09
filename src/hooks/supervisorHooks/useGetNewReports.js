import useFetch from "../generalHooks/useFetch";

export default function useGetNewReports(){
  return useFetch('/Supervisor/Reports/new', ['newReports']); 
}