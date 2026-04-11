   import useFetch from "../generalHooks/useFetch";

export default function useGetSupervisorFeedbackByReportid(reportId) {
  return useFetch( `/Student/Feedbacks/report/${reportId}` , ['feedbackById', reportId],
    {
       refetchInterval: false,}

  );
}
