
import useAuth from "./useAuth";

export default function useSetPassword(){
    const {serverErrors,authMutation} = useAuth('Identity/Auths/set-password','/auth/login');
    return {serverErrors,authMutation};
}