import { useMutation } from "@tanstack/react-query"; // استيراد useMutation من react-query عشان نتعامل مع عمليات POST / PUT / DELETE
import { useState } from "react";// استيراد useState لتخزين أخطاء السيرفر
import { useNavigate } from "react-router-dom"; // استيراد useNavigate عشان نعمل redirect بعد التسجيل
import axiosInstance from "../Api/axiosInstance";

export default function useAuth(url,navigateUrl,onSuccessCallback){
    const [serverErrors, setServerErrors] = useState(''); //useState لتخزين أخطاء السيرفر لو الرجستر فشل
    const navigate = useNavigate(); // hook من react-router للتنقل بين الصفحات

    const authMutation = useMutation({ // إنشاء mutation مسؤولة عن عملية التسجيل
            mutationFn:async({userInfo})=>{ // الدالة اللي رح تنفذ عملية التسجيل (API Call)
                const response = await axiosInstance.post(url,userInfo)
                return response; // إرسال POST request للرابط مع البيانات المدخلة من الفورم
            },
            onSuccess:(response)=>{ // في حال نجحت العملية
                 // لو في callback خاص (زي login)
                 if (onSuccessCallback) onSuccessCallback(response);
                 if (navigateUrl) {   // فقط لو موجود
                    navigate(navigateUrl);
                }
            },
            onError: (err)=>{// في حال فشلت العملية
              setServerErrors(err.response?.data?.message);
            }
        });

        return {serverErrors,authMutation,setServerErrors};
}