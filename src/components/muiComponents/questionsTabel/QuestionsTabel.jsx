import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { Fragment, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MdArrowForwardIos, MdOutlineEdit, MdClose, MdCheck } from "react-icons/md";
import { Button, Chip, FormControl, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import useActivation from '../../../hooks/supervisorHooks/useActivation';

function Row(props) {
  const { row } = props;
  console.log("row ", row);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(row?.isActive);
  const [openEditForm, setOpenEditForm ] = useState(false);
  const [qsText, setQsText] = useState(row?.text || ""); // for text qs input
  const [code, setCode] = useState(row?.code || "");// for code input
  const [selectedType, setSelectedType] = useState(row?.type); // type input
  const [orderNumber, setOrderNumber] = useState(row?.order || 1); // order input
  const [optionInput, setOptionInput] = useState(""); //for option input
  const [optionsList, setOptionsList] = useState(row?.options || []);;//اريه جواها كل الاوبشين اللي قبل والي هتنضاف
  const { usePatchMutation } = useActivation();
 const handleToggle = (id) => {
  usePatchMutation.mutate(`${id}/toggle`, {
    onSuccess: () => {
      setChecked((prev) => !prev); //عشان اعكس حالة السويتش بس تنجح العملية 
    },
  });
};
const handleQsTextChange = (e) => {
  setQsText(e.target.value);
};
  const handleCodeChange = (e) => {
  setCode(e.target.value);
};
  const handleTypeChange = (e) => {
  setSelectedType(e.target.value);
};
  const handleOrderChange = (e) => {
  const value = e.target.value;
  setOrderNumber(value === "" ? "" : Number(value));
};
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
//ريسيت عشان اذا سكر الفورم ترجع القيم الاصلية
useEffect(() => {
  if (!openEditForm) {
    setQsText(row?.text || "");
    setCode(row?.code || "");
    setSelectedType(row?.type);
    setOrderNumber(row?.order || 1);
    setOptionsList(row?.options || []);
    setOptionInput("");
  }
}, [openEditForm, row]);

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: open ? "none" : "1px solid #1e1d1d" } }}>
        <TableCell align="center" sx={{width: "50px",paddingLeft:"0px"}}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {setOpen(!open);setTimeout(() => {setOpenEditForm(false);}, 300);}}
          >
            {open ? (
              <KeyboardArrowDownIcon sx={{ color: "var(--secondary-color)" }} />
            ) : (
              <MdArrowForwardIos size={"15"} fill={"var(--secondary-color)"} />
            )}
          </IconButton>
        </TableCell>

        <TableCell align="left" sx={{ color: "var(--secondary-color)", fontWeight: "600" }}>
          #{row?.order}
        </TableCell>

        <TableCell component="th" scope="row" sx={{ color: "var(--secondary-color)", fontWeight: "600" }}>
          {row?.code}
        </TableCell>

        <TableCell
          align="left"
          sx={{
            maxWidth: 400,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: checked ? "#fff" : "var(--secondary-color)",
            fontWeight: "600",
            textDecoration: checked ? "none" : "line-through"
          }}
        >
          {row?.text}
        </TableCell>

        <TableCell align="left" sx={{ color: "var(--secondary-color)", fontWeight: "600" }}>
          {row?.type === 1 ? "Free text" : "Multi choice"}
        </TableCell>

        <TableCell align="left" sx={{ color: "var(--secondary-color)", fontWeight: "600" }}>
          {row?.code}
        </TableCell>

        <TableCell
          align="left"
          sx={{
            color: "var(--secondary-color)",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >
          <Switch
            checked={checked}
             onChange={() => handleToggle(row.id)} 
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

          <Box onClick={()=>{setOpen(true);setOpenEditForm(true);}}
            sx={{
              backgroundColor: "var(--navy-color)",
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor:"pointer",
              transition: "all .3s",
              "&:hover": {
                bgcolor: "rgba(229, 226, 226, 0.21)",
              },
            }}
          >
            <MdOutlineEdit size={19} />
          </Box>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
          {!openEditForm?
          <Box className="inner_content" sx={{color:"#fff", paddingBottom:"30px",paddingTop:"10px",paddingLeft:"70px"}}>
            <Box className="options" sx={{display:"flex",gap:"8px",marginBottom:"20px"}}>
                {row?.type===2 ? 
            row?.options?.map(option=>
            <Typography key={option} sx={{width:"fit-content",bgcolor:"rgba(229, 226, 226, 0.21)",borderRadius: "15px",paddingY:"2px",paddingX:"10px",color:"rgb(209, 206, 206)",fontSize:"12px"}}>
                {option}
            </Typography>
            )
            : 
            <Typography sx={{color:"var(--secondary-color)",fontSize:"13px"}}>No options defined.</Typography>
            }
            </Box>
            <Box className="footer" sx={{display:"flex",gap:"20px"}}>
                <Typography sx={{fontSize:"13px",color:"var(--secondary-color)"}}>Status:{" "}
                    {row?.isActive ? 
                    <Typography component={'span'} sx={{color:"#38d479",fontSize:"13px",textShadow: "0 0 6px #38d479"}}>Active</Typography>
                    :
                    <Typography component={'span'} sx={{fontSize:"13px"}}>Inactive</Typography>
                    }
                </Typography>
                <Box onClick={()=>setOpenEditForm(true)} sx={{color: "var(--primary-color)",display: "flex",alignItems: "center",gap: "2px",
                          cursor:"pointer",transition: "all 0.3s ease",borderBottom: "1px solid transparent",
                          '&:hover': {borderBottom: "1px solid var(--primary-color)"}}}>
                  <MdOutlineEdit size={15} style={{ transform: "translateY(-1px)" }} />
                  <Typography sx={{ fontSize: "13px" ,textShadow: "0 0 6px var(--primary-color)"}}>Edit inline</Typography>
                </Box>
            </Box>
          </Box>
          :
          <Box className="edit_question_form"
  sx={{
    paddingBottom:"30px",paddingTop:"10px",paddingLeft:"70px",
    display: "flex",
    flexDirection: "column",
    gap: 3,
  }}
>
  <Box className="question_text">

    <TextField
      fullWidth
      label="QUESTION TEXT"
      variant="standard"
      value={qsText}
      onChange={handleQsTextChange}
      InputLabelProps={{ sx: { color: "var(--mid-gray-color)","&.Mui-focused": {
        color: "var(--primary-color)",
      }, } }}
      InputProps={{
        sx: {
            color: "#fff",
            "& .MuiInput-input": {
       paddingBottom: "10px",
      },
       "&:before": {
        borderBottom: "1px solid var(--mid-gray-color)",
      },
      "&:hover:not(.Mui-disabled):before": {
        borderBottom: "1px solid var(--dark-gray-color)",
      },
      "&:after": {
        borderBottom: "2px solid var(--primary-color)",
      },
        }
      }}
    />
  </Box>

  <Box className="code_type_order" sx={{ display: "flex", justifyContent:"space-between", alignItems: "flex-end", gap: 5, }}>
    <TextField
      label="CODE"
      variant="standard"
      value={code}
      onChange={handleCodeChange}
      sx={{flex: 1}}
      InputLabelProps={{ sx: { color: "var(--mid-gray-color)","&.Mui-focused": {
        color: "var(--primary-color)",
      }, } }}
      InputProps={{ 
        sx: {
            color: "#fff",
            "& .MuiInput-input": {
        paddingBottom: "10px",
      },
       "&:before": {
        borderBottom: "1px solid var(--mid-gray-color)",
      },
      "&:hover:not(.Mui-disabled):before": {
        borderBottom: "1px solid var(--dark-gray-color)",
      },
      "&:after": {
        borderBottom: "2px solid var(--primary-color)",
      },
        }
       }}
    />

    <FormControl variant="standard" sx={{flex: 1, minWidth: 150 }}>
        <InputLabel
    sx={{
      color: "var(--mid-gray-color)",
      "&.Mui-focused": {
        color: "var(--primary-color)",
      },
    }}
  >
    TYPE
  </InputLabel>
  <Select
  fullWidth
  value={selectedType}
  onChange={handleTypeChange}
  IconComponent={KeyboardArrowDownIcon}
  MenuProps={{
    PaperProps: {
      sx: {
        bgcolor: "var(--navy-color)",
        color: "var(--secondary-color)",
        borderBottomLeftRadius:"25px",
        borderBottomRightRadius:"25px",

        "& .MuiMenuItem-root": {
          color: "var(--secondary-color)",
          transition: "0.2s",

          "&:hover": {
            backgroundColor: "rgba(229, 226, 226, 0.08)",
          },

          "&.Mui-selected": {
            backgroundColor: "rgba(229, 226, 226, 0.15)",
            color: "var(--primary-color)",
          },

          "&.Mui-selected:hover": {
            backgroundColor: "rgba(229, 226, 226, 0.2)",
          },
        },
      },
    },
  }}
  sx={{
    color: "#fff",
    "& .MuiSelect-icon": {
      color: "var(--mid-gray-color)",
    },
    "&:before": {
      borderBottom: "1px solid var(--mid-gray-color)",
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: "1px solid var(--dark-gray-color)",
    },
    "&:after": {
      borderBottom: "2px solid var(--primary-color)",
    },
  }}
>
  <MenuItem value={1}>Free text</MenuItem>
  <MenuItem value={2} sx={{borderBottomLeftRadius: "25px",
        borderBottomRightRadius: "25px",}}>Multi choice</MenuItem>
</Select>
</FormControl>

    <TextField
  label="ORDER"
  variant="standard"
  type="number"
  value={orderNumber}
  inputProps={{ min: 1 }}
  onChange={handleOrderChange}
  InputLabelProps={{
    sx: {
      color: "var(--mid-gray-color)",
      "&.Mui-focused": {
        color: "var(--primary-color)",
      },
    },
  }}
  InputProps={{
    sx: {
      color: "#fff",

      "& input[type=number]": {
        MozAppearance: "textfield",
      },

      "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
  WebkitAppearance: "inner-spin-button",
  opacity: 1,
  filter: "invert(1) sepia(0) saturate(1) hue-rotate(147deg)",
  cursor: "pointer",
},

      "&:before": {
        borderBottom: "1px solid var(--mid-gray-color)",
      },
      "&:hover:not(.Mui-disabled):before": {
        borderBottom: "1px solid var(--dark-gray-color)",
      },
      "&:after": {
        borderBottom: "2px solid var(--primary-color)",
      }
    },
  }}
/>
  </Box>

  <Box className="options">
    <Typography sx={{ fontSize: "12px", color: "var(--mid-gray-color)", marginBottom:"8px" }}>
      OPTIONS
    </Typography>


    <Box
  sx={{
    display: "flex",
    alignItems: "flex-end",
    gap: 1,
    borderBottom: "1px solid var(--mid-gray-color)",
    paddingBottom: "10px",
    "&:hover": {
      borderBottom: "1px solid var(--dark-gray-color)",
    },
    "&:focus-within": {
      borderBottom: "2px solid var(--primary-color)",
    },
  }}
>
      {optionsList.map((option, index) => (
        <Chip
          key={index}
          label={option}
          size="small" 
          onDelete={() => handleDeleteOption(index)}
          sx={{
            bgcolor: "rgba(229, 226, 226, 0.21)",
            color: "#fff",
            "& .MuiChip-deleteIcon": {
  color: "var(--mid-gray-color)",
  transition: "0.2s",
  "&:hover": {
    color: "var(--primary-color)"
  },
}
          }}
        />
      ))}
      <TextField
  variant="standard"
  value={optionInput}
  onChange={(e) => setOptionInput(e.target.value)}
  onKeyDown={handleAddOption}
  label="Type and press Enter..."
  sx={{
    flex: 1,
    minWidth: "150px",
  }}
  InputLabelProps={{
    sx: {
      color: "var(--mid-gray-color)",
      fontSize:"13px",
      "&.Mui-focused": {
       opacity: 0,
      },
    },
  }}
  InputProps={{
    disableUnderline: true,
    sx: {
      color: "#fff",
      "& .MuiInput-input": {
        padding: "0", 
        margin: 0,
      },
    },
  }}
/>
    </Box>
  </Box>

  <Box className="action_btns"
    sx={{
      display: "flex",
      justifyContent: "flex-end",
      gap: 2,
      marginTop:"16px",
    }}
  >
    <Button
    startIcon={<MdClose size={18} />}
    onClick={() => {setOpenEditForm(false);}}
  sx={{
    color: "#aaa",
    borderRadius: "20px",
    paddingX: "8px",
    transition:"all 0.3s",
    '&:hover': {
        color: 'var(--primary-color)',
    },
    "& .MuiButton-startIcon": {
      marginRight: "4px",
    },
  }}
>
  <Typography sx={{ fontSize: "14px" }}>Cancel</Typography>
</Button>

    <Button
  variant="contained"
  startIcon={<MdCheck size={18} />}
  sx={{
    bgcolor: "var(--primary-color)",
    borderRadius: "20px",
    px: 3,
    transition: "all 0.3s",
    "&:hover": {
      backgroundColor: "#ae1d1d",
    },
    "& .MuiButton-startIcon": {
      marginRight: "4px",
    },
  }}
>
  Save
</Button>
  </Box>
</Box>
          }
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    order: PropTypes.number,
    code: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.number,
    isActive: PropTypes.bool,
  }).isRequired,
};

export default function QuestionsTabel(data) {
  console.log("table ", data?.data);

  return (
    <TableContainer component={Paper}>
      <Table
        aria-label="collapsible table"
        sx={{
          bgcolor: "var(--navy-color)",
          "& .MuiTableCell-root": {
            borderBottomColor: "#1e1d1d",
          }
        }}
      >
        <TableBody>
          {data?.data?.map((row) => (
            <Row key={row?.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}