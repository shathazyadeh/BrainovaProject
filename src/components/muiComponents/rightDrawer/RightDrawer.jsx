import { Box, Button, Drawer, TextField, Typography } from "@mui/material";
import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { Switch } from '@mui/material';
import { FiPlus } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { CreateQuestionSchema } from "../../../validations/CreateQuestionsSchema";
import { useCreateQuestion } from "../../../hooks/supervisorHooks/useCreateQuestion";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Chip } from "@mui/material";


function RightDrawer({ open, setOpen }) {
  const [questionType, setQuestionType] = useState(1);//لانهم مش فيلد عادي استعملت اليوزستيت 
  const [isActive, setIsActive] = useState(true);// 
  const [optionInput, setOptionInput] = useState(""); //القيمة اللي بكتبها في الانبوت 
  const [optionsList, setOptionsList] = useState([]);//اريه جواها كل الاوبشين اللي انضافت 

  const handleAddOption = (e) => { //عشان بس يكبس انتر ينضاف الاوبشين
    if (e.key === "Enter" && optionInput.trim()) { //تأكدت انه كبس انتر
      e.preventDefault(); // عشان امنع الفورم يسبميت لما اكبس اينتر 
      setOptionsList([...optionsList, optionInput.trim()]); // القيمة اللي كتبها ضفتها جوا الاريه وعملت الاوبشين ليست سيباريت عشان نحافظ عالقيمة القديمة ونضيف الجديدة 
      setOptionInput(""); //فرغت الانبوت 
    }
  };

  const handleDeleteOption = (index) => { // بتحذف العنصر حسب الانديكس
    setOptionsList(optionsList.filter((item, i) => i !== index));
  };
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(CreateQuestionSchema),
  });

  const { usePostMutation, serverErrors } = useCreateQuestion({
    onSuccess: () => {
      reset();
      setOpen(false);
      toast.success("Question created successfully!");
    },
  });
  const onSubmit = (data) => {
    usePostMutation.mutate(
      {
        code: data.code,
        text: data.text,
        type: questionType,
        order: Number(data.order),
        isActive: isActive,
        isRequired: true,
        options: optionsList.length > 0 ? optionsList : [""],
      },
      {
        onError: (err) => {
          toast.error(err.response?.data?.message); 
        },
      }
    );
  };
  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          sx={{
            width: 450,
            height: "100%",
            backgroundColor: "var(--navy-color)",
            border: '1px solid #66636347',
            color: "#fff",
            paddingY: '40px',
            paddingX: '30px'
          }}
        >



          <Box className='drawer_titel flex_column' sx={{ marginBottom: '40px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
              <Typography component={'h1'} sx={{ color: '#fff', fontSize: '30px', fontWeight: '600', fontFamily: 'var(--primary-font)' }}>New Question</Typography>
              <Box sx={{ alignItems: 'center', display: 'flex' }}>
                <IoMdClose onClick={() => setOpen(false)} size={22} color="var(--secondary-color)" style={{ cursor: 'pointer', flexShrink: 0 }} />
              </Box>
            </Box>
            <Typography sx={{ color: "var(--secondary-color)", fontSize: '15px', fontWeight: '200' }}>Add a question to the supervisor review form.</Typography>
          </Box>


          <Box component={"form"} onSubmit={handleSubmit(onSubmit)}
          >
            <Typography sx={{ color: "var(--secondary-color)", fontSize: '15px', fontWeight: '200', marginBottom: '10px', fontFamily: 'var(--secondary-font)' }}>Question text</Typography>

            <TextField

              placeholder={
                " What should students answer?"
              }
              fullWidth
              multiline
              rows={3}
              {...register("text")}
              sx={{
                "& input::placeholder, & textarea::placeholder": {
                  color: "var(--secondary-color)",
                  opacity: 1,
                  fontWeight: '400'
                },
                "& .MuiInputBase-root": {
                  padding: 0,
                },

                "& .MuiInputBase-input": {
                  padding: 0,
                },
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  backgroundColor: "var(--navy-color)",


                  "&:hover fieldset": {
                    borderBottom: "1px solid #5958588b",
                  },


                  "& fieldset": {
                    border: "none",
                    borderBottom: "1px solid #5958588b",
                    borderRadius: 0,
                  },


                  "&.Mui-focused fieldset": {
                    borderBottom: "1px solid red",
                  },
                },

                "& textarea": {
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "var(--primary-color)",
                    cursor: "grab",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "var(--navy-color)",
                  },
                },
              }}
            />
            {errors.text && (
              <Typography sx={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                {errors.text.message}
              </Typography>
            )}
            <Box sx={{ display: 'flex', gap: "25px", marginTop: '50px' }}>

              <TextField
                label="CODE"
                fullWidth
                multiline
           
                {...register("code")}
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "var(--secondary-color)",
                    top: "-6px",
                    left: 0,
                    transform: "translate(0, -6px) scale(0.75)",
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "var(--secondary-color)",
                  },

                  "& .MuiInputBase-root": {
                    padding: 0,
                    marginTop: "5px",
                  },

                  "& .MuiInputBase-input": {
                    padding: 0,
                  },

                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    backgroundColor: "var(--navy-color)",

                    "&:hover fieldset": {
                      borderBottom: "1px solid #5958588b",
                    },

                    "& fieldset": {
                      border: "none",
                      borderBottom: "1px solid #5958588b",
                      borderRadius: 0,
                    },

                    "&.Mui-focused fieldset": {
                      borderBottom: "1px solid red",
                    },
                  },
                }}
              />


              <TextField
                label="ORDER"
                fullWidth
                multiline
                
                {...register("order")}
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "var(--secondary-color)",
                    top: "-6px",
                    left: 0,
                    transform: "translate(0, -6px) scale(0.75)",
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "var(--secondary-color)",
                  },

                  "& .MuiInputBase-root": {
                    padding: 0,
                    marginTop: "5px",
                  },

                  "& .MuiInputBase-input": {
                    padding: 0,
                  },

                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    backgroundColor: "var(--navy-color)",

                    "&:hover fieldset": {
                      borderBottom: "1px solid #5958588b",
                    },

                    "& fieldset": {
                      border: "none",
                      borderBottom: "1px solid #5958588b",
                      borderRadius: 0,
                    },

                    "&.Mui-focused fieldset": {
                      borderBottom: "1px solid red",
                    },
                  },
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: "25px" }}>
              <Box sx={{ flex: 1 }}>
                {errors.code && (
                  <Typography sx={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                    {errors.code.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ flex: 1 }}>
                {errors.order && (
                  <Typography sx={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                    {errors.order.message}
                  </Typography>
                )}
              </Box>
            </Box>

            <Box className='question_type flex_column' sx={{ marginTop: '30px', gap: '10px' }}>
              <Typography sx={{ color: "var(--secondary-color)", fontSize: '13px' }}>Type</Typography>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <Button onClick={() => setQuestionType(1)} sx={{ color: questionType === 1 ? "#fff" : "var(--secondary-color)", textTransform: 'capitalize', fontSize: "13px", bgcolor: questionType === 1 ? "var(--primary-color)" : "#242424", paddingY: '4px', paddingX: '9px', borderRadius: '15px', textAlign: 'center', }}>Free Text</Button>
                <Button onClick={() => setQuestionType(2)} sx={{ color: questionType === 2 ? "#fff" : "var(--secondary-color)", textTransform: 'capitalize', fontSize: "13px", bgcolor: questionType === 2 ? "var(--primary-color)" : "#242424", paddingY: '4px', paddingX: '9px', borderRadius: '15px', textAlign: 'center', }}>Single Choice</Button>
              </Box>
            </Box>
            {questionType !== 1 && (
              <Box>
               <Typography sx={{ color: "var(--secondary-color)", fontSize: '14px', fontWeight: '200', marginBottom: '10px', fontFamily: 'var(--secondary-font)' ,marginTop:'20px'}}>Options</Typography>

              <Box sx={{
                border: "none",
                borderBottom: "1px solid #5958588b",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                padding: "8px 0",
                marginTop: "15px",
                alignItems: "center",
              }}>
                {optionsList.map((option, index) => ( // بنلف ع العنصار الاريه عشان نعرض الاوبشين 
                 
                 <Chip // مربوط فيه الانديكس
                    key={index}
                    label={option}
                    onDelete={() => handleDeleteOption(index)}
                    sx={{
                      bgcolor: "#242424",
                      color: "#eee7e7",
                      "& .MuiChip-deleteIcon": {
                        fontSize: "20px",
                        color: '#6c6c6c',

                      },
                    }}
                  />
                ))}
                <input
                  value={optionInput}
                  onChange={(e) => setOptionInput(e.target.value)} // القيمة اللي بكتبها 
                  onKeyDown={handleAddOption}
                  placeholder="Type and press Enter..."
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#fff",
                    fontSize: "14px",
                    flex: 1,
                    minWidth: "150px",
                  }}
                />
              </Box>
              </Box>
            )}


            <Box className='active' sx={{ display: "flex", justifyContent: 'space-between', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #55555582' }}>

              <Typography sx={{ color: "var(--secondary-color)", fontSize: "15px", }}>Active immediately</Typography>
              <Switch checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                disableRipple
                sx={{
                  width: 42,
                  height: 24,
                  padding: 0,

                  '& .MuiSwitch-switchBase': {
                    padding: '3px',
                    transition: '0.3s',

                    '&:hover': {
                      backgroundColor: 'rgba(81, 81, 81, 0.22) !important',
                    },

                    '&.Mui-checked': {
                      transform: 'translateX(18px)',
                    },

                    '&.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: 'var(--primary-color) !important',
                      opacity: 1,
                    },
                  },

                  '& .MuiSwitch-thumb': {
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    backgroundColor: 'var(--navy-color)',
                  },

                  '& .MuiSwitch-track': {
                    borderRadius: 12,
                    backgroundColor: '#575656 !important',
                    opacity: 1,
                  },
                }}
              />
            </Box>

            <Box className='buttons' sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '70px' }}>
              <Button onClick={() => setOpen(false)} sx={{ color: "var(--secondary-color)", fontSize: "15px", textTransform: 'capitalize', paddingY: '4px', paddingX: '9px', borderRadius: '15px', textAlign: 'center', transition: "all 0.3s", "&:hover": { color: "#fff" } }}>Cancel</Button>
              <Button type="submit"
                disabled={usePostMutation?.isPending}
                sx={{
                  bgcolor: "#ed2c2c",
                  color: "#f0f2f5",
                  display: "flex",
                  paddingX: '11px',
                  paddingY: '5px',
                  gap: '3px',
                  justifyContent: "center",
                  textAlign: "center",
                  borderRadius: "25px",
                  whiteSpace: "nowrap",
                  boxShadow: "0 0 15px rgba(207, 25, 25, 0.81)",
                }}
              > <Box sx={{ alignItems: 'center', display: 'flex' }}>
                  <FiPlus size={20} style={{ flexShrink: 0 }} />
                </Box>
                <Typography sx={{ fontSize: { xs: "14px", md: "11px", lg: "14px" }, justifyContent: "flex-start", display: 'flex', textTransform: "capitalize", fontWeight: "500", fontSize: '17px' }}>Create </Typography>
              </Button>
            </Box>



          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default RightDrawer

