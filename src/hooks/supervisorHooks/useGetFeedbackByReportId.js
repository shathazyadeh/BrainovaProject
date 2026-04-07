import useFetch from "../generalHooks/useFetch";

export default function useGetFeedbackByReportId(reportId){
  return useFetch(`/Supervisor/Feedbacks/report/${reportId}`, ['reportFeedback',reportId]); 
}
