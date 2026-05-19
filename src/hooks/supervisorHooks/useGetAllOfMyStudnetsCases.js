import useFetch from "../generalHooks/useFetch";

export default function useGetAllOfMyStudentsCases(studentId) {
  const url = studentId
    ? `/Supervisor/MriCases?studentId=${studentId}`
    : '/Supervisor/MriCases';

  const queryKey = studentId
    ? ['mriCases', 'student', studentId]
    : ['mriCases', 'all'];

  return useFetch(url, queryKey);
}