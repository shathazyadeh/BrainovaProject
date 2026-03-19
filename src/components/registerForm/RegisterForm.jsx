import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup"; // @hookform/resolvers: بتربط yup مع react-hook-form عشان الفورم يستخدم قواعد الفاليديشين
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuthStore from "../../store/useAuthStore";

function RegisterForm({
  schema,
  useHook,
  userId,
  showPassword = true,
  showSupervisors = true,
  showRoleSelect = false,
  formMethods,
  btnLabel = "Create Account",
  fullWidthInput = "false",
  defaultValues = {},
  textfieldColor = "textfield_dark",
  rowUser,
}) {
  const form =
    formMethods ||
    useForm({ resolver: yupResolver(schema), mode: "onBlur", defaultValues }); //def values من رياكت هوك فورم بتعبي الفورم بالفيم التلقائية الي استقبلتها فوق
  const {
    register,
    handleSubmit,
    watch, // نستخدم watch لمراقبة قيمة الحقول داخل الفورم
    formState: { errors, isSubmitting },
  } = form;

  const hookData = useHook();
  const { serverErrors, supervisors, supervisorsLoading } = hookData;

  // نراقب قيمة supervisorUserId الموجودة داخل الفورم
  const supervisorValue = watch("supervisorUserId");

  let displaySupervisorField;
  let watchedRole;

  if (showRoleSelect === true) {
    // نراقب قيمة الـ role داخل الفورم
    watchedRole = watch("roleName");

    // نحدد الرول الحالي: إما من الفورم (إذا تم تغييره) أو من البيانات الأصلية (في وضع التعديل)
    // نستخدم rowUser?.roleName فقط إذا كان موجود (في وضع التعديل) ولم يتم تغييره بعد
    const currentRole = watchedRole || rowUser?.roleName || "";

    // نقرر هل نظهر حقل supervisor:
    // 1. showSupervisors يجب أن يكون true
    // 2. currentRole يجب أن يكون "Student"
    displaySupervisorField = showSupervisors && currentRole === "Student";
  } else {
    //يعني اذا ما في حقل رول اصلا خلص بنغلف حقل السوبرفايزرس نيم بالبروب الي وصلني وهو شو سوبرفايزرز
    displaySupervisorField = showSupervisors;
  }

  const currentUser = useAuthStore((state) => state.user); //المستخدم الحالي عشان نفحص هل الميوتيشين هيكون لرجستر اي يوز اوث ولا ابديت ... حسب الرول

  const handleUser = async (values) => {
    if (!rowUser) {
      // 🔵 REGISTER
      await hookData.authMutation.mutateAsync({
        userId: userId,
        userInfo: values,
      });
    } else {
      // مصفوفة رح نحط فيها كل الطلبات (API calls)
      const promises = [];
      const { password, roleName, ...userInfo } = values; //الفاليوز تحوي كل قيم الفورم ففصلنا عنهن الباس والرول وخزنا الباقي في اليوزر انفو

      // -------- تحديث البيانات العادية فقط إذا تغيّرت عن بيانات الرو يوزر --------
      const hasUserInfoChanged =
        userInfo.fullName !== rowUser.fullName ||
        userInfo.email !== rowUser.email ||
        userInfo.phoneNumber !== rowUser.phoneNumber ||
        userInfo.userName !== rowUser.userName ||
        userInfo.supervisorUserId !== rowUser.supervisorId;

      if (hasUserInfoChanged) {
        promises.push(
          hookData.updateUserInfoMutation.mutateAsync({
            userId,
            userInfo,
          }),
        );
      }

      // -------- اذا السوبر ادمن كتب قيمة داخل الباس معناها عدل فبنبعث طلب على api change pass--------
      if (password) {
        promises.push(
          hookData.changePasswordMutation.mutateAsync({
            userId,
            newPassword: password,
          }),
        );
      }

      // -------- تغيير الرول إذا تغيّر --------
      if (roleName && roleName !== rowUser.roleName) {
        promises.push(
          hookData.changeRoleMutation.mutateAsync({
            userId,
            roleName,
          }),
        );
      }

      // -------- تنفيذ كل العمليات مع بعض --------
      await Promise.all(promises);
    }
  };

  const [showPass, setShowPass] = useState(false);

  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };
  return (
    <Box>
      {serverErrors?.length > 0 ? (
        <Typography
          sx={{ color: "var(--primary-color)", marginBottom: "20px" }}
        >
          {serverErrors}
        </Typography>
      ) : (
        ""
      )}
      <Box
        className="register_form flex_column"
        component={"form"}
        onSubmit={handleSubmit(handleUser)}
        sx={{ gap: "23px" }}
      >
        {fullWidthInput === "false" ? (
          <Box sx={{ display: "flex", gap: "10px" }}>
            <TextField
              {...register("fullName")}
              label="Full Name"
              variant="outlined"
              fullWidth
              error={errors.fullName}
              helperText={errors.fullName?.message}
              className={textfieldColor}
              spellCheck={false}
            />
            <TextField
              {...register("userName")}
              label="Username"
              variant="outlined"
              fullWidth
              error={errors.userName}
              helperText={errors.userName?.message}
              className={textfieldColor}
              spellCheck={false}
            />
          </Box>
        ) : (
          <>
            <TextField
              {...register("fullName")}
              label="Full Name"
              variant="outlined"
              fullWidth
              error={errors.fullName}
              helperText={errors.fullName?.message}
              className={textfieldColor}
              spellCheck={false}
            />
            <TextField
              {...register("userName")}
              label="Username"
              variant="outlined"
              fullWidth
              error={errors.userName}
              helperText={errors.userName?.message}
              className={textfieldColor}
              spellCheck={false}
            />
          </>
        )}

        {fullWidthInput === "false" ? (
          <Box sx={{ display: "flex", gap: "10px" }}>
            <TextField
              {...register("email")}
              label="Email"
              variant="outlined"
              fullWidth
              error={errors.email}
              helperText={errors.email?.message}
              className={textfieldColor}
              spellCheck={false}
            />
            <TextField
              {...register("phoneNumber")}
              label="Phone Number"
              variant="outlined"
              fullWidth
              error={errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              className={textfieldColor}
              spellCheck={false}
            />
          </Box>
        ) : (
          <>
            <TextField
              {...register("email")}
              label="Email"
              variant="outlined"
              fullWidth
              error={errors.email}
              helperText={errors.email?.message}
              className={textfieldColor}
              spellCheck={false}
            />
            <TextField
              {...register("phoneNumber")}
              label="Phone Number"
              variant="outlined"
              fullWidth
              error={errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              className={textfieldColor}
              spellCheck={false}
            />
          </>
        )}

        {showPassword && (
          <TextField
            {...register("password")}
            label="Password"
            variant="outlined"
            fullWidth
            error={errors.password}
            helperText={errors.password?.message}
            type={showPass ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPass ? (
                      <VisibilityOff sx={{ color: "var(--secondary-color)" }} />
                    ) : (
                      <Visibility sx={{ color: "var(--secondary-color)" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            className={textfieldColor}
            spellCheck={false}
          />
        )}
        {/* Dropdown للدكاترة */}
        {displaySupervisorField && (
          <TextField
            {...register("supervisorUserId")}
            value={supervisorValue || ""} // نجعل القيمة تأتي دائماً من الفورم (حتى تظهر بعد reset)
            label="Supervisor Name"
            fullWidth
            select
            error={errors.supervisorUserId}
            helperText={errors.supervisorUserId?.message}
            sx={{
              "& .MuiSelect-icon": { color: "var(--secondary-color)" },
            }}
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
            className={textfieldColor}
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
        )}

        {showRoleSelect && (
          <TextField
            {...register("roleName")}
            value={watchedRole || rowUser?.roleName || ""}
            label="Role"
            fullWidth
            select
            error={!!errors.roleName}
            helperText={errors.roleName?.message}
            className={textfieldColor}
            sx={{
              "& .MuiSelect-icon": {
                color: "var(--secondary-color)", // 👈 لون السهم
              },
            }}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    backgroundColor: "rgb(8,13,22)",
                    color: "var(--secondary-color)",
                  },
                },
              },
            }}
          >
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Supervisor">Supervisor</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>
        )}

        <Button
          type="submit"
          className="auth_btn"
          variant="contained"
          disabled={isSubmitting || (showSupervisors && supervisorsLoading)} // نعطل الزر لو لسا البيانات بتيجي
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
            btnLabel
          )}
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterForm;