import useFetch from "../generalHooks/useFetch";

export default function useGetMyallFeedbacks(){
  return useFetch('/Supervisor/Feedbacks', ['feedback']); 
}