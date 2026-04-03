import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../Api/axiosInstance";

export default function useUploadMRI(){
   
    const uploadMRIMutation = useMutation({
        mutationFn: async(value)=>{
            const formData = new FormData();
            formData.append("File", value);
            const response = await axiosInstance.post('/Student/MriCases/upload',formData);
            return response.data;
        }
        });

          return { uploadMRIMutation };
}