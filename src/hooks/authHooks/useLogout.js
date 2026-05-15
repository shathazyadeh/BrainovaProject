import useAuthStore from "../../store/useAuthStore";
import useAuth from "./useAuth";

export default function useLogout() {

    const logout = useAuthStore((state) => state.logout);

    const handleLogoutSuccess = () => {
        logout();
    };

    const { serverErrors, authMutation } = useAuth('Identity/Auths/logout','/auth/login',handleLogoutSuccess);
    
    return { serverErrors, authMutation };
}