import useDownloadPDF from "../generalHooks/useDownloadPDF";


export default function useDownloadStudentPDF() {
  return useDownloadPDF(
    (reportId) => `/Student/Reports/${reportId}/pdf`
  );
}