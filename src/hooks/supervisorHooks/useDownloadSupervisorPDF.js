import useDownloadPDF from "../generalHooks/useDownloadPDF";


export default function useDownloadSupervisorPDF() {
  return useDownloadPDF( (reportId) =>
     `/Supervisor/Reports/${reportId}/pdf`
  );
}