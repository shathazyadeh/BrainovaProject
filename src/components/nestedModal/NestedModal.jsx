import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import RegisterForm from "../registerForm/RegisterForm";
import { FaPlus } from "react-icons/fa";
import { CreateStudentSchema } from "../../validations/CreateStudentSchema";
import useCreateStudent from "../../hooks/useCreateStudent";
import useCreateSupervisor from "../../hooks/useCreateSupervisor";
import { CreateSupervisorSchema } from "../../validations/CreateSupervisorSchema";
import { AiFillCloseCircle } from "react-icons/ai";

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

function ChildModal({ role }) {
  //  استقبلنا قيمة الاختيار من متعدد عشان نحدد الي بده ينعرض بناءا عليها
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
              />
            </>
          ) : (
            // else role is supervisor
            <>
              <RegisterForm
                schema={CreateSupervisorSchema}
                useHook={useCreateSupervisor}
                showPassword={false}
                showSupervisors={false}
                textfieldColor={"textfield_black"}
              />
            </>
          )}
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState("female"); //للاختيار من متعدد

  const handleChange = (event) => {
    //للاختيار من متعدد
    setValue(event.target.value);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        className="create_user_btn upper_case auth_btn"
        sx={{
          border: "1px solid #ef4444",
          backgroundColor: "rgba(27, 7, 7, 0.47)",
          color: "#fff",
          borderRadius: "15px",
          height: "55px",
          paddingX: "40px",
          fontSize: "18px",
        }}
      >
        Create new User
        <FaPlus size={18} style={{ paddingLeft: "5PX" }} />
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
            width: 400,
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
          <h2 id="parent-modal-title">Select the role for the new user</h2>
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
            </RadioGroup>
          </FormControl>
          <ChildModal role={value} />{" "}
          {/*مررنا قيمة الكنترول فورم - الاختيار من متعدد - للمودل الصغير */}
        </Box>
      </Modal>
    </div>
  );
}