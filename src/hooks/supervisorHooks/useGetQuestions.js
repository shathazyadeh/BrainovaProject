import useFetch from "../generalHooks/useFetch";

export default function useGetQuestions(){
  return useFetch('/Supervisor/ReportQuestions', ['reportQuestions']); 
}