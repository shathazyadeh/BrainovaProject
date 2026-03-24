import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInstance";

 export default function useFetch(url,queryKey){

    const query = useQuery({
        queryKey:queryKey,
        staleTime:2 * 60 * 1000, //كل 2 دقائق بعمل بحكي للكويري انه الرداتا بطلت فرش و اذا المستخدمم طلع من التاب ورجع بعمل ريكويست
        refetchInterval:1* 60 * 1000, //كل 1 دقائق بعمل ريكويست عالباك
        queryFn: async()=>{
            const response = await axiosInstance.get(url);
            return response.data;
        }
    });

    return query;
 }