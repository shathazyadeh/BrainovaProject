import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../Api/axiosInstance";

 export default function useFetch(url,queryKey, options = {}){ //اوبشينز هي اعدادات بستقبلها من برا

    const query = useQuery({
        queryKey:queryKey,
        staleTime:0,
        queryFn: async()=>{
            const response = await axiosInstance.get(url);
            return response.data;
        },
        ...options // بتخلي أي قيمة بنبعتها من برا تستبدل القيمة الأصلية
    });


    return query;
 }