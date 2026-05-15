import axios from "axios";
import useAuthStore from "../store/useAuthStore";

// بنعمل instance مخصص من axios عشان نوحد كل ال requests
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// request interceptor
// هذا بيشتغل قبل ما أي request يطلع للسيرفر
axiosInstance.interceptors.request.use((config) => {
  return config;
});

// response interceptor
// هذا بيشتغل بعد ما يرجع الرد من السيرفر
axiosInstance.interceptors.response.use(
  // اذا الرد ناجح، رجعيه زي ما هو
  (response) => response,

  // اذا في error
  (error) => {
    // بنجيب status code اذا موجود
    const status = error.response?.status;

    // اذا المستخدم مش مصرح (401)
    if (status === 401) {
      // غالبا التوكن منتهي أو مش صحيح
      useAuthStore.getState().logout();
      window.location.href = "/auth/login";
    }

    // لازم نرجع ال error عشان ينمسك بالمكان اللي استدعى ال request
    return Promise.reject(error);
  }
);

// بنصدر ال instance عشان نستخدمه بكل المشروع بدل axios العادي
export default axiosInstance;