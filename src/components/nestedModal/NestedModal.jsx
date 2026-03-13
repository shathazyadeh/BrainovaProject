import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RegisterComp from '../registerComp/RegisterComp';
import { IoClose } from "react-icons/io5";
import { CreateStudentSchema } from '../../validations/CreateStudentSchema';
import useCreateStudent from '../../hooks/useCreateStudent';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal( {role} ) { //  استقبلنا قيمة الاختيار من متعدد عشان نحدد الي بده ينعرض بناءا عليها
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <React.Fragment>
      <Button className="create_user_btn upper_case" sx={{bgcolor:'var(--dark-red-color)',color:'#fff'}} onClick={handleOpen}>Continue</Button>
      <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        slotProps={{
    backdrop: {
      sx: {
        backdropFilter: "blur(8px)", // درجة التغبيش
        backgroundColor: "rgba(0,0,0,0.4)", // تعتيم الخلفية
      },
    },
  }}
      >
        <Box sx={{ ...style }}>
        <IoClose size={30} style={{color:'red',cursor:'pointer',marginBottom:'20px'}} onClick={handleClose}/> {/*ايقونة الاكس لتسكير المودل الصغير */}
         {

          role==='student'?
          <>
          <RegisterComp schema={CreateStudentSchema} useHook={useCreateStudent} showPassword={false}/>
          
          </>
          :
          <>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">supervisor</p> 
          </>
          }
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

  const [value, setValue] = React.useState('female'); //للاختيار من متعدد

  const handleChange = (event) => { //للاختيار من متعدد
    setValue(event.target.value);
  };

  return (
    <div>
      <Button onClick={handleOpen} className="create_user_btn upper_case" sx={{bgcolor:'var(--dark-red-color)',color:'#fff'}}>Create new User</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        slotProps={{
    backdrop: {
      sx: {
        backdropFilter: "blur(8px)", // درجة التغبيش
        backgroundColor: "rgba(0,0,0,0.4)", // تعتيم الخلفية
      },
    },
  }}
      >
        <Box sx={{ ...style, width: 400 ,borderRadius:'10px',display:'flex',flexDirection:'column',gap:3}}>
          <h2 id="parent-modal-title">Select the role for the new user</h2>
          <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="student" sx={{width:'fit-content'}} control={
            <Radio sx={{
            color: '#b71c1c', // اللون قبل الاختيار
            '&.Mui-checked': {
              color: '#d32f2f', // اللون بعد الاختيار
            },
          }}
           />} 
          label="Student" />
        <FormControlLabel value="supervisor" sx={{width:'fit-content'}} control={
            <Radio sx={{
            color: '#b71c1c', // اللون قبل الاختيار
            '&.Mui-checked': {
              color: '#d32f2f', // اللون بعد الاختيار
            },
          }}/>} 
          label="Supervisor" />
      </RadioGroup>
    </FormControl>
          <ChildModal role={value} /> {/*مررنا قيمة الكنترول فورم - الاختيار من متعدد - للمودل الصغير */}
        </Box>
      </Modal>
    </div>
  );
}