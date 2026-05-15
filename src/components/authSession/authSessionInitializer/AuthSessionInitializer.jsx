import { useEffect } from "react";
import useAuthStore from "../../../store/useAuthStore";
import useFetch from "../../../hooks/generalHooks/useFetch";

function AuthSessionInitializer({ children }) {

  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  const currentPath = window.location.pathname;

  const shouldFetch = !currentPath.startsWith("/auth");

  const { data, error } = useFetch("Identity/Auths/me",["auth-user"], // data = المستخدم الحالي اذا نجح الفيتش
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

  return children;
}

export default AuthSessionInitializer;