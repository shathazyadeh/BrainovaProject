import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://brainova-backend-grb6egdgg2d8epdw.israelcentral-01.azurewebsites.net/api"
});
// استيراد مكتبة axios لإرسال الطلبات (requests) إلى الـ API

// إنشاء نسخة خاصة من axios
// baseURL يعني أن كل الطلبات ستبدأ تلقائيًا بهذا الرابط
// مثال:
// axiosInstance.get("Identity/Users/all")
// سيصبح الرابط الكامل:
// http://brainova.runasp.net/api/Identity/Users/all

axiosInstance.interceptors.request.use((config) => {
  // interceptor يعني اعتراض الطلب قبل إرساله للسيرفر
  // نستخدمه غالبًا لإضافة الـ token أو أي headers لكل الطلبات تلقائيًا

  const token = localStorage.getItem("accessToken");
  // جلب الـ token المخزن في localStorage
  // هذا الـ token عادة نحصل عليه بعد تسجيل الدخول

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // إذا كان الـ token موجود
    // نقوم بإضافته داخل headers الطلب
    // بالشكل الذي يتوقعه السيرفر:
    // Authorization: Bearer token
  }

  return config;
  // إرجاع config بعد التعديل عليه
  // حتى يتم إرسال الطلب للسيرفر مع الـ token
});

// إضافة interceptor جديد للردود (responses)
axiosInstance.interceptors.response.use(
  (response) => { return response; },
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.log("Unauthorized - logging out");
      useAuthStore.getState().logout();
    }

    if (status === 403) {
      console.log("Forbidden - maybe blocked user");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
// تصدير axiosInstance حتى نستطيع استخدامه في أي ملف داخل المشروع