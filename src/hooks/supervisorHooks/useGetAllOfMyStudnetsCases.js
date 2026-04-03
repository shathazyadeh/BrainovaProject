import useFetch from "../generalHooks/useFetch";

export default function useGetAllOfMyStudnetsCases(){
  return useFetch('/Supervisor/MriCases', ['mriCases']); 
}