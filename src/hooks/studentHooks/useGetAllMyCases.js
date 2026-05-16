import useFetch from "../generalHooks/useFetch";

export default function useGetAllMyCases(){
  return useFetch('/Student/MriCases/my-cases', ['myCases'], );
}

