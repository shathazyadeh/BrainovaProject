import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../Api/axiosInstance";
import { toast } from "react-toastify";

export default function useDownloadPDF() {
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

      toast.success("PDF downloaded successfully");
    },

    onError: (error) => {
      const status = error?.response?.status;
      if (status === 404) {
        toast.error("Report not found");
      } else if (status === 403) {
        toast.error("You don't have permission to download this report");
      } else {
        toast.error("Failed to download PDF");
      }
    },
  });

  return downloadMutation;
}