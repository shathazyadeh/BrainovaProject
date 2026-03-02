import useAuth from "./useAuth";

export default function useResetPassword(){
    const {serverErrors,authMutation} = useAuth('Identity/Auths/reset-password','/auth/login');
    return {serverErrors,authMutation};
}