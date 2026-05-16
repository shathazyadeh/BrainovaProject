import useAuthStore from "../store/useAuthStore";
import connection from "./signalr";

export const registerSignalREvents = (queryClient) => {

  connection.on("NewFeedback", (data) => {
    queryClient.invalidateQueries({ queryKey: ["studentFeedbacks"] });
    queryClient.invalidateQueries({ queryKey: ["studentUnseenFeedbacks"] });
    queryClient.invalidateQueries({ queryKey: ["myCases"] });
  });

  connection.on("FeedbackDeleted", (data) => {
    queryClient.invalidateQueries({ queryKey: ["studentFeedbacks"] });
    queryClient.invalidateQueries({ queryKey: ["studentUnseenFeedbacks"] });
    queryClient.invalidateQueries({ queryKey: ["myCases"] });
  });

};