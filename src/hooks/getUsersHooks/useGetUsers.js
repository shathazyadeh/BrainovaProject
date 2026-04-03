import useFetch from "../generalHooks/useFetch.js";

export default function useGetUsers(){
  return useFetch('/Identity/Users/all', ['users']);
}