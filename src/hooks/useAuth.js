import { useMutation } from "@tanstack/react-query"; // استيراد useMutation من react-query عشان نتعامل مع عمليات POST / PUT / DELETE
import { useState } from "react";// استيراد useState لتخزين أخطاء السيرفر
import { useNavigate } from "react-router-dom"; // استيراد useNavigate عشان نعمل redirect بعد التسجيل
import axiosInstance from "../Api/axiosInstance";

export default function useAuth(url,navigateUrl,onSuccessCallback){
    const [serverErrors, setServerErrors] = useState(''); //useState لتخزين أخطاء السيرفر لو الرجستر فشل
    const navigate = useNavigate(); // hook من react-router للتنقل بين الصفحات

    const authMutation = useMutation({ // إنشاء mutation مسؤولة عن عملية التسجيل
            mutationFn:async(values)=>{ // الدالة اللي رح تنفذ عملية التسجيل (API Call)
                const response = await axiosInstance.post(url,values)
                console.log(response);
                return response; // إرسال POST request للرابط مع البيانات المدخلة من الفورم
            },
            onSuccess:(response)=>{ // في حال نجحت العملية
                 // لو في callback خاص (زي login)
                 if (onSuccessCallback) onSuccessCallback(response);
                 navigate(navigateUrl); //نقله للرابط المبعوث
            },
            onError: (err)=>{ // في حال فشلت العملية
            console.log(err);
                setServerErrors(err.response.data.message)} // نخزن أخطاء السيرفر داخل ال state عشان نعرضهم بالفورم
        });

        return {serverErrors,authMutation};
}