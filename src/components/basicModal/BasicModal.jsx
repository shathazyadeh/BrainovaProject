import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useUpdateUserInfo from "../../hooks/useUpdateUserInfo";
import { UpdateUserInfoSchema } from "../../validations/UpdateUserInfoSchema";
import RegisterForm from "../registerForm/RegisterForm";
import { AiFillCloseCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";

export default function BasicModal({ open, handleClose, user }) {
  //من رياكت هوك فورم بتعمل ريسيت لقيم الفورم
  const formMethods = useForm({
    resolver: yupResolver(UpdateUserInfoSchema),
    mode: "onBlur",
  });

  const { reset } = formMethods;

  // نعمل reset لقيم الفورم عند فتح المودال حتى ترجع القيم الأصلية للمستخدم
  // لأن react-hook-form يحتفظ بالقيم التي كتبها المستخدم حتى لو أغلق المودال بدون حفظ
  useEffect(() => {
    if (user && open) {
      reset({
        fullName: user?.fullName,
        userName: user?.userName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        supervisorUserId: user?.supervisorId,
        password: "",
      });
    }
  }, [user, open, reset]);

  return (
    <Modal
      open={open} // يتحكم بفتح واغلاق المودال
      onClose={handleClose} // يغلق المودال عند الضغط خارجها
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(10px)", // درجة التغبيش
            backgroundColor: "rgba(17, 17, 17, 0.4)", // تعتيم الخلفية
          },
        },
      }}
    >
      <Box
        className="flex_column"
        sx={{
          position: "absolute", // لجعل المودال فوق الصفحة
          top: "50%", // منتصف الشاشة عمودياً
          left: "50%", // منتصف الشاشة أفقياً
          transform: "translate(-50%, -50%)", // توسيط العنصر تماماً
          width: 800, // عرض المودال
          bgcolor: "#040404", // لون الخلفية
          border: "1px solid #131212",
          boxShadow: "0 0 80px rgba(76, 77, 91, 0.7)",
          px: 4,
          paddingTop: "30px",
          paddingBottom: "50px",
          borderRadius: "20px", // حواف دائرية
          alignItems: "stretch", // ← وهذا
          justifyContent: "center",
        }}
      >
        <AiFillCloseCircle
          size={30}
          fill={"var(--primary-color)"}
          style={{ cursor: "pointer", marginBottom: "40px" }}
          onClick={handleClose}
        />{" "}
        {/*ايقونة الاكس لتسكير المودل الصغير */}
        <RegisterForm
          useHook={useUpdateUserInfo}
          userId={user?.id}
          formMethods={formMethods}
          mutationName="updateUserInfoMutation"
          schema={UpdateUserInfoSchema}
          showSupervisors={user?.roleName === "Supervisor" ? false : true}
          showPassword={false}
          btnLabel="Update Profile"
          textfieldColor={"textfield_black"}
        />
      </Box>
    </Modal>
  );
}