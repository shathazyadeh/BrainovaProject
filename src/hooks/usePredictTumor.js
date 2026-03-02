import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInstance";
import { useState } from "react";

export default function usePredictTumor(){
    const [preview,setPreview] = useState(null);

    const handelImagePreview = (e)=>{
        console.log(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
    }

    const predictTumorMutation = useMutation({
        mutationFn: async(value)=>{
            console.log(value);
            const formData = new FormData();
            formData.append("file",value.file[0]);

            const response = await axiosInstance.post('/AiTumors/gradcam',formData);
            const gradCamUrl = response.data.gradcamUrl; //الجراد كام
            const tumorResult = response.data.label; // نتيجة المودل
            const tumorProbabilitiesArray = response.data.probabilities; //جبنا المصفوفة
            const tumorProbability = Math.max(...tumorProbabilitiesArray); //بدون ثلاث نقاط برجع nan فلأنها مصفوفة بحط ثلاث نقاط بفككها هو
            console.log(response);
            return {gradCamUrl,tumorResult,tumorProbability};
        }
        });

        const uploadMRI = async(value)=>{
            await predictTumorMutation.mutateAsync(value);
        }

        return{preview,handelImagePreview,predictTumorMutation,uploadMRI};
}