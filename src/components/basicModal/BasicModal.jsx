import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, MenuItem, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import useRegister from "../../hooks/useRegister";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useUpdateUserInfo from "../../hooks/useUpdateUserInfo";
import { UpdateUserInfoSchema } from "../../validations/UpdateUserInfoSchema";


export default function BasicModal({ open, handleClose, user }) {
    const {
        register,
        handleSubmit,
        reset, //من رياكت هوك فورم بتعمل ريسيت لقيم الفورم 
        formState: { errors, isSubmitting },
      } = useForm({
        resolver: yupResolver(UpdateUserInfoSchema),
        mode: "onBlur",
      });

      const { updateUserInfoMutation } =useUpdateUserInfo();
      const {supervisors, supervisorsLoading } =useRegister();

      const editUser = async (values) => {
        console.log('values : ',values);
        await updateUserInfoMutation.mutateAsync({userId: user.id,userInfo: values});
      };

      useEffect(()=>{
        if(user){
            console.log(user);
            reset({
                fullName: user?.fullName,
                userName: user?.userName,
                email: user?.email,
                phoneNumber: user?.phoneNumber,
                supervisorUserId: user?.supervisorId,
                password: ""

            })
        }
      },[user,reset]);

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
        <Box
                      className="edit_user_info_form flex_column"
                      component={"form"}
                      onSubmit={handleSubmit(editUser)}
                      sx={{ gap: "23px" }}
                    >
                        
                      <Box sx={{ display: "flex", gap: "10px" }}>
                        <TextField
                          {...register("fullName")}
                          label="Full Name"
                          variant="outlined"
                          fullWidth
                          error={errors.fullName}
                          helperText={errors.fullName?.message}
                          className="textfield_dark"
                          spellCheck={false}
                        />
                        <TextField
                          {...register("userName")}
                          label="Username"
                          variant="outlined"
                          fullWidth
                          error={errors.userName}
                          helperText={errors.userName?.message}
                          className="textfield_dark"
                          spellCheck={false}
                        />
                      </Box>
                      <Box sx={{ display: "flex", gap: "10px" }}>
                        <TextField
                          {...register("email")}
                          label="Email"
                          variant="outlined"
                          fullWidth
                          error={errors.email}
                          helperText={errors.email?.message}
                          className="textfield_dark"
                          spellCheck={false}
                        />
                        <TextField
                          {...register("phoneNumber")}
                          label="Phone Number"
                          variant="outlined"
                          fullWidth
                          error={errors.phoneNumber}
                          helperText={errors.phoneNumber?.message}
                          className="textfield_dark"
                          spellCheck={false}
                        />
                      </Box>
                      <TextField
                        {...register("password")}
                        label="Password"
                        variant="outlined"
                        fullWidth
                        error={errors.password}
                        helperText={errors.password?.message}
                        className="textfield_dark"
                        spellCheck={false}
                      />
                      {/* Dropdown للدكاترة */}
                      <TextField
                        {...register("supervisorUserId")}
                        defaultValue=""
                        label="Supervisor Name"
                        fullWidth
                        select
                        error={errors.supervisorUserId}
                        helperText={errors.supervisorUserId?.message}
                        SelectProps={{
                          MenuProps: {
                            PaperProps: {
                              sx: {
                                backgroundColor: "rgb(8,13,22)", // لون خلفية القائمة
                                color: "var(--secondary-color)", // لون النص
                              },
                            },
                          },
                        }}
                        className="textfield_dark"
                        spellCheck={false}
                      >
                        {/* نحوله لدروب داون*/}
                        {supervisors.map(
                          (
                            sup, // نلف على الدكاترة
                          ) => (
                            <MenuItem
                              key={sup.id}
                              value={sup.id}
                              sx={{
                                "&:hover": {
                                  backgroundColor: "#3a3f47", // لون سكني عند الهوفر
                                  color: "#ffffff",
                                },
                              }}
                            >
                              {sup.fullName} {/* الاسم اللي يظهر */}
                            </MenuItem>
                          ),
                        )}
                      </TextField>
                      <Button
                        type="submit"
                        className="auth_btn"
                        variant="contained"
                        disabled={isSubmitting || supervisorsLoading} // نعطل الزر لو لسا البيانات بتيجي
                        sx={{ bgcolor: "var(--primary-color)", fontWeight: "600" }}
                      >
                        {isSubmitting ? (
                          <CircularProgress
                            sx={{
                              "& .MuiCircularProgress-circle": {
                                stroke: "white",
                              },
                            }}
                          />
                        ) : (
                          "Update"
                        )}
                      </Button>
                      
                    </Box>
      </Box>
    </Modal>
  );
}