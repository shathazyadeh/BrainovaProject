import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInstance";
import { useState } from "react";

export default function usePredictMRI(){
    const [preview,setPreview] = useState(null);

    const handelImagePreview = (e)=>{
        setPreview(URL.createObjectURL(e.target.files[0]));
    }

    const predictMRIMutation = useMutation({
        mutationFn: async(caseId)=>{
            const response = await axiosInstance.post(`/Student/AIResults/${caseId}/predict`);
            const gradCamUrl = response.data.gradcamUrl; //الجراد كام
            const tumorResult = response.data.prediction; // نتيجة المودل
            const tumorProbabilitiesArray = response.data.probabilities; //جبنا المصفوفة
            const tumorProbability = Math.max(...tumorProbabilitiesArray); //بدون ثلاث نقاط برجع nan فلأنها مصفوفة بحط ثلاث نقاط بفككها هو
            const percentage = parseFloat((tumorProbability * 100).toFixed(2)); 
            return { gradCamUrl, tumorResult, tumorProbability,percentage };
        }
        });

        return{predictMRIMutation};
}