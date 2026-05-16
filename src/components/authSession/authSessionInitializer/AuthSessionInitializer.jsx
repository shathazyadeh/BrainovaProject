import { useEffect } from "react";
import useAuthStore from "../../../store/useAuthStore";
import useFetch from "../../../hooks/generalHooks/useFetch";
import { useQueryClient } from "@tanstack/react-query";
import connection from "../../../services/signalr";
import { registerSignalREvents } from "../../../services/signalrEvents";

function AuthSessionInitializer({ children }) {

  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const currentPath = window.location.pathname;
  const shouldFetch = !currentPath.startsWith("/auth");
  const { data, error } = useFetch("Identity/Auths/me",["authUser"], // data = المستخدم الحالي اذا نجح الفيتش
    {
      enabled: shouldFetch, //شغل الكويري بس إذا shouldFetch = true
      retry: false, // باي ديفولت رياكت كويري اذا فشلت بتعيد الريكويست بس هون ما بدنا اذا فشلت خلص انت التوكين تاعتك انتهت
    }
  );

  useEffect(() => { // بتشتغل بس اذا رفرشنا الصفحة و أول ما يفتح الموقع
    if (data) {
      setUser(data);
    }

    if (error) { // الكوكيز منتهية او اليوزر مش مسجل دخول
      logout();
    }
  }, [data, error]);


  /************   SignalR ************/

  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  useEffect(() => {
  if (!user) return; // اذا ما في يوزر (مش مسجل دخول) لا تشغل الاتصال أصلاً

  connection
    .start() // بنفتح الاتصال مع السيرفر (SignalR)
    .then(() => {
      // بعد ما يتصل بنجاح
      registerSignalREvents(queryClient); // بنربط الايفينتس عشان نسمع التحديثات
    })
    .catch((err) => console.log(err)); // لو صار خطأ بالاتصال اطبعه

  return () => {
    connection.stop(); // لما اليوزر يعمل logout او يتغير → سكّر الاتصال
  };
}, [user]); // كل ما اليوزر يتغير (login / logout) الكود بنعاد



  return children; // كمل عرض باقي التطبيق
}

export default AuthSessionInitializer;