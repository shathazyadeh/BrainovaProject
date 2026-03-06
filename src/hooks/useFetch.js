import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInstance";

 export default function useFetch(url,queryKey){

    const query = useQuery({
        queryKey:queryKey,
        staleTime:5*60*10000,
        queryFn: async()=>{
            console.log('hi')
            const response = await axiosInstance.get(url);
            console.log(response.data);
            return response.data;
        }
    });

    return query;
 }