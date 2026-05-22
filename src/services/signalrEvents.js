import useAuthStore from "../store/useAuthStore";
import connection from "./signalr";

export const registerSignalREvents = (queryClient) => {
  connection.off("NewFeedback");
  connection.off("FeedbackUpdated");
  connection.off("FeedbackDeleted");
  connection.off("UnseenCountChanged");
  connection.off("SupervisorFeedbackChanged");
  connection.off("FeedbackSeenByStudent");
  connection.off("NewReport");
  connection.off("QuestionsChanged");
  connection.off("StudentsChanged");
  connection.off("UserUpdated");
  connection.off("UserListChanged");

  connection.on("NewFeedback", (data) => {
    queryClient.invalidateQueries({ queryKey: ["studentFeedbacks"] });
    queryClient.invalidateQueries({ queryKey: ["studentUnseenFeedbacks"] });
    queryClient.invalidateQueries({ queryKey: ["myCases"] });
  });

  connection.on("FeedbackUpdated", (data) => {
    queryClient.invalidateQueries({ queryKey: ["studentFeedbacks"] });
    queryClient.invalidateQueries({ queryKey: ["studentUnseenFeedbacks"] });
    queryClient.invalidateQueries({ queryKey: ["myCases"] });
  });

  connection.on("FeedbackDeleted", (data) => {
    queryClient.invalidateQueries({ queryKey: ["studentFeedbacks"] });
    queryClient.invalidateQueries({ queryKey: ["studentUnseenFeedbacks"] });
    queryClient.invalidateQueries({ queryKey: ["myCases"] });
  });

  connection.on("UnseenCountChanged", (data) => {
    queryClient.invalidateQueries({ queryKey: ["studentFeedbacks"] });
    queryClient.invalidateQueries({ queryKey: ["studentUnseenFeedbacks"] });
  });

  connection.on("SupervisorFeedbackChanged", (data) => {
    queryClient.invalidateQueries({ queryKey: ["mriCases"] });
    queryClient.invalidateQueries({ queryKey: ["feedback"] });
    if (data.kind === "Deleted")
      queryClient.removeQueries({
        queryKey: ["reportFeedback", data.reportId],
      });
    else
      queryClient.invalidateQueries({
        queryKey: ["reportFeedback", data.reportId],
      });
  });

  connection.on("FeedbackSeenByStudent", (data) => {
    queryClient.invalidateQueries({ queryKey: ["feedback"] });
  });

  connection.on("NewReport", (data) => {
    queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    queryClient.invalidateQueries({ queryKey: ["newReports"] });
    queryClient.refetchQueries({ queryKey: ["mriCases", "all"] });
    queryClient.refetchQueries({
      queryKey: ["mriCases", "student", data.report.studentId],
    });
    queryClient.invalidateQueries({ queryKey: ["students"] });
  });

  connection.on("QuestionsChanged", (data) => {
    queryClient.invalidateQueries({ queryKey: ["questions"] });
    queryClient.invalidateQueries({ queryKey: ["reportQuestions"] });
  });

  connection.on("StudentsChanged", (data) => {
    queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    queryClient.invalidateQueries({ queryKey: ["mriCases"] });
    queryClient.invalidateQueries({ queryKey: ["newReports"] });
    queryClient.invalidateQueries({ queryKey: ["students"] });
    queryClient.invalidateQueries({ queryKey: ["feedback"] });
    queryClient.invalidateQueries({ queryKey: ["reportDetails"] });
  });

  connection.on("UserUpdated", (data) => {
    //لما المستخدم يعدل معلوماته
    const currentUserId = useAuthStore.getState().user?.id;
    if (currentUserId === data.userId) {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      queryClient.invalidateQueries({ queryKey: ["userInfo", currentUserId] });
    }
  });

  connection.on("UserListChanged", (data) => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
    queryClient.invalidateQueries({ queryKey: ["mriCases"] });
    queryClient.invalidateQueries({ queryKey: ["newReports"] });
    queryClient.invalidateQueries({ queryKey: ["students"] });
    queryClient.invalidateQueries({ queryKey: ["feedback"] });
    queryClient.invalidateQueries({ queryKey: ["reportDetails"] });
    queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
  });
};