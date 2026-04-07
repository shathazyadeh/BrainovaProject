import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../Api/axiosInstance";

export default function useDownloadPDF(reportId) {
  const downloadMutation = useMutation({
  mutationFn: (reportId) =>
    axiosInstance.get(`/Supervisor/Reports/${reportId}/pdf`, {
      responseType: "blob",
    }),
  onSuccess: (response, reportId) => {
    const url = window.URL.createObjectURL(response.data);

    const link = document.createElement("a");
    link.href = url;
    link.download = `report-${reportId}.pdf`;
    link.click();

    window.URL.revokeObjectURL(url);
  },
});

return downloadMutation;
}