import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://brainova.runasp.net/api'
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
export default axiosInstance;
// تصدير axiosInstance حتى نستطيع استخدامه في أي ملف داخل المشروع