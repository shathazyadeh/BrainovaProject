import useFetch from "../generalHooks/useFetch";

export default function useGetMyStudentsInfo(){
  return useFetch('/Supervisor/Students', ['users']); 
}