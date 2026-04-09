import useFetch from "../generalHooks/useFetch";

export default function useGetAllOfMyStudentsCases(studentId) {
  
  const url =  studentId  ? `/Supervisor/MriCases?studentId=${studentId}`: '/Supervisor/MriCases';

  return useFetch(url, ['mriCases']);
}