import useAuthStore from "../../store/useAuthStore";
import useAuth from "./useAuth";
import { useQueryClient } from "@tanstack/react-query";

export default function useLogout() {

    const logout = useAuthStore((state) => state.logout);
    const queryClient = useQueryClient();

    const handleLogoutSuccess = () => {
        logout();
        queryClient.clear(); //بنمسح الكاش
    };

    const { serverErrors, authMutation } = useAuth("Identity/Auths/logout","/auth/login",handleLogoutSuccess);

    return { serverErrors, authMutation };
}