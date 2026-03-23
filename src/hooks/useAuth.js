import { useMutation } from "@tanstack/react-query"; // استيراد useMutation من react-query عشان نتعامل مع عمليات POST / PUT / DELETE
import { useState } from "react";// استيراد useState لتخزين أخطاء السيرفر
import { useNavigate } from "react-router-dom"; // استيراد useNavigate عشان نعمل redirect بعد التسجيل
import axiosInstance from "../Api/axiosInstance";
import { toast } from "react-toastify";

export default function useAuth(url,navigateUrl,onSuccessCallback){
    const [serverErrors, setServerErrors] = useState(''); //useState لتخزين أخطاء السيرفر لو الرجستر فشل
    const navigate = useNavigate(); // hook من react-router للتنقل بين الصفحات

    const authMutation = useMutation({ // إنشاء mutation مسؤولة عن عملية التسجيل
            mutationFn:async({userInfo})=>{ // الدالة اللي رح تنفذ عملية التسجيل (API Call)
                console.log('values',userInfo);
                const response = await axiosInstance.post(url,userInfo)
                console.log(response);
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
              const message =
                err.response?.data?.message || "Something went wrong";

              if (err.response?.data?.errors) {
                setServerErrors(message);
              } else {
                toast.error(message);
              }
            }
        });

        return {serverErrors,authMutation,setServerErrors};
}