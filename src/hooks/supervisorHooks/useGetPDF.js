import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../Api/axiosInstance";

export default function useGetPDF(reportId) {
  return useQuery({
    queryKey: ['pdf', reportId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/Supervisor/Reports/${reportId}/pdf`,
        {
          responseType: 'blob',
        }
      );
      return response.data;
    },
    enabled: false,
  });
}