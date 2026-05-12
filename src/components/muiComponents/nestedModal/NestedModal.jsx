import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import RegisterForm from "../../registerForm/RegisterForm";
import { FaPlus } from "react-icons/fa";
import { CreateStudentSchema } from "../../../validations/CreateStudentSchema";
import useCreateStudent from "../../../hooks/createHooks/useCreateStudent";
import useCreateSupervisor from "../../../hooks/createHooks/useCreateSupervisor";
import { CreateSupervisorSchema } from "../../../validations/CreateSupervisorSchema";
import { AiFillCloseCircle } from "react-icons/ai";
import useCreateAdmin from "../../../hooks/createHooks/useCreateAdmin";
import { CreateAdminSchema } from "../../../validations/CreateAdminSchema";
import useAuthStore from "../../../store/useAuthStore";
import { useMediaQuery } from "@mui/material";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal({ role, onCloseParent }) {
  //  استقبلنا قيمة الاختيار من متعدد عشان نحدد الي بده ينعرض بناءا عليها
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    if (onCloseParent) onCloseParent();
  };
  const handleSuccess = () => {
    //بتنادلى بس لما الفورم ينجح وحطيته هون عشان يظهر قبل ما المودل يتسكر
    toast.success(
      role === "student"
        ? "Student created successfully"
        : role === "supervisor"
          ? "Supervisor created successfully"
          : "Admin created successfully",
    );
    //ننتظر 150ms عشان التوست يلحق يظهر قبل إغلاق المودل
    setTimeout(() => {
      setOpen(false);
      if (onCloseParent) onCloseParent();
    }, 150);
  };

  const isCustomScreen = useMediaQuery("(max-width:500px)");

  return (
    <React.Fragment>
      <Button
        className="create_user_btn upper_case"
        sx={{ bgcolor: "var(--dark-red-color)", color: "#fff" }}
        onClick={handleOpen}
      >
        Continue
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(0,0,0,0.4)",
            },
          },
        }}
      >
        <Box
          sx={{
            ...style,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "600px",
            bgcolor: "#040404",
            border: "1px solid #131212",
            color: "#fff",
            borderRadius: "10px",
            paddingX: "25px",
            paddingBottom: "50px",
            paddingTop: "20px",
            boxShadow: "0 0 80px rgba(76, 77, 91, 0.7)",
          }}
        >
          <AiFillCloseCircle
            size={30}
            fill={"var(--primary-color)"}
            style={{ cursor: "pointer", marginBottom: "40px" }}
            onClick={handleClose}
          />{" "}
          {/*ايقونة الاكس لتسكير المودل الصغير */}
          {role === "student" ? (
            <>
              <RegisterForm
                schema={CreateStudentSchema}
                useHook={useCreateStudent}
                showPassword={false}
                textfieldColor={"textfield_black"}
                fullWidthInput={isCustomScreen ? true : false}
                onSuccess={handleSuccess}
              />
            </>
          ) : role === "supervisor" ? (
            // else role is supervisor
            <>
              <RegisterForm
                schema={CreateSupervisorSchema}
                useHook={useCreateSupervisor}
                showPassword={false}
                showSupervisors={false}
                textfieldColor={"textfield_black"}
                onSuccess={handleSuccess}
                fullWidthInput={isCustomScreen ? true : false}
              />
            </>
          ) : // else role is admin
          role === "admin" ? (
            <>
              <RegisterForm
                schema={CreateAdminSchema}
                useHook={useCreateAdmin}
                showPassword={false}
                showSupervisors={false}
                textfieldColor={"textfield_black"}
                onSuccess={handleSuccess}
                fullWidthInput={isCustomScreen ? true : false}
              />
            </>
          ) : (
            ""
          )}
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal() {
  const currentUser = useAuthStore((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState("student"); //للاختيار من متعدد

  const handleChange = (event) => {
    //للاختيار من متعدد
    setValue(event.target.value);
  };

  return (
    <Box>
      <Button
        onClick={handleOpen}
        className="create_user_btn upper_case auth_btn"
        sx={{
          backgroundColor: "var(--primary-color)",
          boxShadow: "0 0 15px rgba(255, 1, 1, 0.76)",
          color: "#fff",
          borderRadius: "30px",
          height: "55px",
          paddingX: "40px",
          fontSize: "18px",
          "@media (max-width:1280px)": {
            fontSize: "14px",
            paddingX: "20px",
          },
          "@media (max-width:600px)": {
            fontSize: "0px",
            borderRadius: "50%",
            minWidth: "55px",
            height: "55px",
            padding: 0,
          },
        }}
      >
        <Box
          component={FaPlus}
          sx={{
            fontSize: "19px",
            paddingRight: "6px",
            "@media (max-width:1280px)": {
              fontSize: "16px",
            },
            "@media (max-width:600px)": {
              fontSize: "19px",
            },
          }}
        />
        Add User
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(0,0,0,0.4)",
            },
          },
        }}
      >
        <Box
          sx={{
            ...style,
            width: "90%",
            maxWidth: "400px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            bgcolor: "#040404",
            border: "1px solid #131212",
            color: "#fff",
            boxShadow: "0 0 80px rgba(76, 77, 91, 0.7)",
          }}
        >
          <Box
            component={"h2"}
            id="parent-modal-title"
            sx={{ fontSize: { xs: "19px", sm: "22px" } }}
          >
            Select the role for the new user
          </Box>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="student"
                sx={{ width: "fit-content" }}
                control={
                  <Radio
                    sx={{
                      color: "#b71c1c",
                      "&.Mui-checked": {
                        color: "#d32f2f",
                      },
                    }}
                  />
                }
                label="Student"
              />
              <FormControlLabel
                value="supervisor"
                sx={{ width: "fit-content" }}
                control={
                  <Radio
                    sx={{
                      color: "#b71c1c",
                      "&.Mui-checked": {
                        color: "#d32f2f",
                      },
                    }}
                  />
                }
                label="Supervisor"
              />
              {currentUser.role === "SuperAdmin" ? (
                <FormControlLabel
                  value="admin"
                  sx={{ width: "fit-content" }}
                  control={
                    <Radio
                      sx={{
                        color: "#b71c1c",
                        "&.Mui-checked": {
                          color: "#d32f2f",
                        },
                      }}
                    />
                  }
                  label="Admin"
                />
              ) : (
                ""
              )}
            </RadioGroup>
          </FormControl>
          <ChildModal role={value} onCloseParent={handleClose} />{" "}
          {/*مررنا قيمة الكنترول فورم - الاختيار من متعدد - للمودل الصغير */}
        </Box>
      </Modal>
    </Box>
  );
}