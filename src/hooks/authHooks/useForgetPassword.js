import useAuth from "./useAuth";

export default function useForgetPassword(){
    const {serverErrors,authMutation} = useAuth('Identity/Auths/forgot-password','/auth/reset-password');
    return {serverErrors,authMutation};
}