import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInstance";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify"; //التوستس الي بتظهر عند تأكيد الايمل من مكتبة react toastify
import { useEffect } from "react";

export default function useConfirmEmail(){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const userId = searchParams.get("userId");

    const confirmEmailMutation = useMutation({
        mutationFn: async () => {
          const response = await axiosInstance.get(
            "/Identity/Auths/confirm-email",
            {
              params: { token, userId },
            }
          );
          console.log(response);
          return response.data;
        },
    
        // عند النجاح
        onSuccess: () => {
          toast.success("Email confirmed successfully",{autoClose: 2500});
          // إعادة توجيه بعد 4 ثواني
          setTimeout(() => {
            navigate("/auth/login");
          }, 4000);
        },
    
        // عند الفشل
        onError: (error) => {
          toast.error("Email confirmation failed",{autoClose: 2500});
          setTimeout(() => {
            navigate("/auth/register");
          }, 4000);
        },
      });

      useEffect(() => {
        if (!token || !userId) {
          toast.error("Invalid confirmation link");
          navigate("/auth/register");
          return;
        }
    
        confirmEmailMutation.mutate();
      }, [token, userId]);

}