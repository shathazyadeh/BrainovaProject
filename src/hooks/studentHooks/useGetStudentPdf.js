import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../Api/axiosInstance";

export default function useGetStudentPdf(reportId) {
  return useQuery({
    queryKey: ['studentPdf', reportId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/Student/Reports/${reportId}/pdf`,
        {
          responseType: 'blob',
        }
      );
      return response.data;
    },
    enabled: false,
  });
}