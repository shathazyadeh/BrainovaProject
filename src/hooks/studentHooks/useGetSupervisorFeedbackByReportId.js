   import useFetch from "../generalHooks/useFetch";

export default function useGetSupervisorFeedbackByReportId(reportId) {
  return useFetch( `/Student/Feedbacks/report/${reportId}` , ['feedbackById', reportId],
    {
      enabled: !!reportId , // حتى الفيتش يشتغل بس اذا الاي دي موجود 
       }

  );
}
