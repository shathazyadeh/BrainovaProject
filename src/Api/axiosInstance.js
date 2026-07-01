import axios from "axios";
import useAuthStore from "../store/useAuthStore";
//الاكسيوس هي مكتبة في جافا سكريبت بتستخدم عشان تبعت وتستقبل طلبات من السيرفر
// بنعمل instance مخصص من axios عشان نوحد كل ال requests
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, //عنوان الموقع الرئيسي للسيرفر كل الطلبات بتروح عليه 
  withCredentials: true,
});



// response interceptor
//اي ريسبونس برجع من المباك بمر هون اذا كان ناجح بنستقبله  اذا فشل بنجيب الستاتس تبعته
// هذا بيشتغل بعد ما يرجع الرد من السيرفر
axiosInstance.interceptors.response.use(
  // اذا الرد ناجح، رجعيه زي ما هو
  (response) => response,

  // اذا في error
  (error) => {
    // بنجيب status code اذا موجود
    const status = error.response?.status;
    const publicRoutes = ["/home"]; // لانه عادي مايكون فيها يوزر

    // اذا المستخدم مش مصرح (401)
    if (status === 401) {
      if (!publicRoutes.includes(window.location.pathname)) {
        // غالبا التوكن منتهي أو مش صحيح
        useAuthStore.getState().logout();
        window.location.href = "/auth/login";
      }
    }

    // لازم نرجع ال error عشان ينمسك بالمكان اللي استدعى ال request
    return Promise.reject(error);
  },
);

// بنصدر ال instance عشان نستخدمه بكل المشروع بدل axios العادي
export default axiosInstance;