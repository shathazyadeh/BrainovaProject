import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import RegisterForm from "../../registerForm/RegisterForm";
import useAuthStore from "../../../store/useAuthStore";
import useUpdateUserInfo from "../../../hooks/userManagementHooks/useUpdateUserInfo";
import { UpdateUserInfoSchema } from "../../../validations/UpdateUserInfoSchema";
import usePost from "../../../hooks/generalHooks/usePost";
import FeedbackForm from "../../feedbackForm/FeedbackForm";

export default function BasicModal({
  open,
  handleClose,
  user,
  reportId,
  type,
}) {
  //من رياكت هوك فورم بتعمل ريسيت لقيم الفورم
  const formMethods = useForm({
    resolver: yupResolver(UpdateUserInfoSchema),
    mode: "onBlur",
  });

  const { reset } = formMethods;
  const currentUser = useAuthStore((state) => state.user); // المستخدم الحالي ادمن او سوبر ادمن

  // نعمل reset لقيم الفورم عند فتح المودال حتى ترجع القيم الأصلية للمستخدم
  // لأن react-hook-form يحتفظ بالقيم التي كتبها المستخدم حتى لو أغلق المودال بدون حفظ
  useEffect(() => {
    if (type === "editUser" && user && open) {
      reset({
        fullName: user?.fullName,
        userName: user?.userName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        supervisorUserId: user?.supervisorId,
        password: "",
        roleName: user?.roleName,
      });
    }
  }, [user, open, reset]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(17, 17, 17, 0.4)",
          },
        },
      }}
    >
      <Box
        className="flex_column"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "800px",
          bgcolor: "var(--navy-color)",
          border: "1px solid #131212",
          boxShadow: "0 0 80px rgba(76, 77, 91, 0.7)",
          px: { xs: 2, md: 4 },
          paddingTop: "30px",
          paddingBottom: "50px",
          borderRadius: "20px",
          alignItems: "stretch",
          justifyContent: "center",
        }}
      >
        {type === "editUser" && (
          <>
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
              schema={UpdateUserInfoSchema}
              showRoleSelect={currentUser?.role === "SuperAdmin"}
              showPassword={currentUser?.role === "SuperAdmin"}
              btnLabel="Update Profile"
              textfieldColor={"textfield_black"}
              rowUser={user}
              onSuccess={handleClose} // بس ينجح الفورم ينادي هاندل كلوز عشان يسكر البيسك مودل
            />
          </>
        )}

        {type === "feedback" && reportId && (
          <FeedbackForm reportId={reportId} handleClose={handleClose} />
        )}
      </Box>
    </Modal>
  );
}