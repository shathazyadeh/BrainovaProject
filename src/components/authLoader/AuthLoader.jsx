import { useEffect } from "react";
import axiosInstance from "../../Api/axiosInstance";
import useAuthStore from "../../store/useAuthStore";

function AuthLoader({ children }) {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axiosInstance.get("Identity/Auths/me");
        setUser(res.data);
      } catch (err) {
        logout();
      }
    };

    loadUser();
  }, []);

  return children;
}

export default AuthLoader;