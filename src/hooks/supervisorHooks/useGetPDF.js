import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../Api/axiosInstance";

export default function useGetPDF(reportId) {
  return useQuery(['pdf', reportId], async () => {
    const response = await axiosInstance.get(`/Supervisor/Reports/${reportId}/pdf`, {
      responseType: 'blob', //لما بدنا نفتح البي دي اف في ملف تتاب جديد او نحمله لازم نجيب الريسبونس ك blob
    });
    return response.data; 
  });
}