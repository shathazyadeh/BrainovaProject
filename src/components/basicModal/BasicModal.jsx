import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, MenuItem, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import useRegister from "../../hooks/useRegister";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useUpdateUserInfo from "../../hooks/useUpdateUserInfo";
import { UpdateUserInfoSchema } from "../../validations/UpdateUserInfoSchema";
import RegisterForm from "../registerForm/RegisterForm";


export default function BasicModal({ open, handleClose, user }) {
  console.log('userr:',user);
    //من رياكت هوك فورم بتعمل ريسيت لقيم الفورم 
const formMethods = useForm({
    resolver: yupResolver(UpdateUserInfoSchema),
    mode: "onBlur",
  });

  const { reset } = formMethods;

  useEffect(() => {
    if (user) {
      reset({
        fullName: user?.fullName,
        userName: user?.userName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        supervisorUserId: user?.supervisorId,
        password: "",
      });
    }
  }, [user, reset]);

  return (
    <Modal
      open={open} // يتحكم بفتح واغلاق المودال
      onClose={handleClose} // يغلق المودال عند الضغط خارجها
      slotProps={{
    backdrop: {
      sx: {
        backdropFilter: "blur(8px)", // درجة التغبيش
        backgroundColor: "rgba(0,0,0,0.4)", // تعتيم الخلفية
      },
    },
  }}
    >
      <Box
        sx={{
          position: "absolute", // لجعل المودال فوق الصفحة
          top: "50%", // منتصف الشاشة عمودياً
          left: "50%", // منتصف الشاشة أفقياً
          transform: "translate(-50%, -50%)", // توسيط العنصر تماماً
          width: 400, // عرض المودال
          bgcolor: "background.paper", // لون الخلفية
          border: "2px solid #000", // حدود
          boxShadow: 24, // ظل
          p: 4, // padding
          borderRadius: "10px", // حواف دائرية
        }}
      >
        <RegisterForm useHook={useUpdateUserInfo} userId={user?.id} formMethods={formMethods} mutationName="updateUserInfoMutation" schema={UpdateUserInfoSchema} showSupervisors={user?.roleName==="Supervisor"?false:true} showPassword={false} btnLabel="Update Profile"/>
      </Box>
    </Modal>
  );
}