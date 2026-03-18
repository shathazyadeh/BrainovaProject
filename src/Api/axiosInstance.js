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

// إضافة interceptor جديد للردود (responses)
axiosInstance.interceptors.response.use(
  (response) => {
    // إذا كان الرد ناجح (status 2xx)
    return response;
  },
  (error) => {
    // إذا كان هناك خطأ في الرد
    if (error.response?.status === 403 || error.response?.status === 401) {
      // تحقق من صلاحية التوكن
      const token = localStorage.getItem("accessToken");
      
      if (token) {
        try {
          // فك تشفير التوكن للتحقق من صلاحيته
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          
          // إذا انتهى التوكن
          if (decoded.exp < currentTime) {
            console.log("Token expired - logging out");
            useAuthStore.getState().logout();
          } else {
            // التوكن صالح لكنه لا يملك صلاحية الوصول
            console.log("Access forbidden - insufficient permissions");
            // يمكنك هنا إظهار رسالة للمستخدم إذا أردت
          }
        } catch (e) {
          // التوكن غير صالح (مشوه أو غير قابل للفك)
          console.log("Invalid token - logging out");
          useAuthStore.getState().logout();
        }
      } else {
        // لا يوجد توكن أساساً
        console.log("No token found - redirecting to login");
        useAuthStore.getState().logout();
      }
    }
    
    // إرجاع الخطأ حتى تتم معالجته في المكان الذي استدعي الطلب منه
    return Promise.reject(error);
  }
);
export default axiosInstance;
// تصدير axiosInstance حتى نستطيع استخدامه في أي ملف داخل المشروع