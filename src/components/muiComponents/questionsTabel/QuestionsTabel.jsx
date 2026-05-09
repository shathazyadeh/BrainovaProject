import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import { Fragment, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import { useTheme, useMediaQuery } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { FiPlus } from "react-icons/fi";

import {
  MdArrowForwardIos,
  MdOutlineEdit,
  MdClose,
  MdCheck,
} from "react-icons/md";
import {
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useUpdateQuestions from "../../../hooks/supervisorHooks/useUpdateQuestions";
import useActivation from "../../../hooks/supervisorHooks/useActivation";
import RightDrawer from "../rightDrawer/RightDrawer";
import { CreateQuestionSchema } from "../../../validations/CreateQuestionsSchema";

function Row(props) {
  const { row } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isXSmall = useMediaQuery("(max-width:600px)");

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(row?.isActive);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [optionInput, setOptionInput] = useState(""); //for option input
  const [optionsList, setOptionsList] = useState(row?.options || []); //اريه جواها كل الاوبشين اللي قبل والي هتنضاف
  const [optionsError, setOptionsError] = useState("");

  const { usePatchMutation } = useActivation();
  const handleToggle = (id) => {
    usePatchMutation.mutate(`${id}/toggle`, {
      onSuccess: () => {
        setChecked((prev) => !prev); //عشان اعكس حالة السويتش بس تنجح العملية
      },
    });
  };

  const handleAddOption = (e) => {
    //عشان بس يكبس انتر ينضاف الاوبشين
    if (e.key === "Enter" && optionInput.trim()) {
      //تأكدت انه كبس انتر
      e.preventDefault(); // عشان امنع الفورم يسبميت لما اكبس اينتر
      setOptionsList([...optionsList, optionInput.trim()]); // القيمة اللي كتبها ضفتها جوا الاريه وعملت الاوبشين ليست سيباريت عشان نحافظ عالقيمة القديمة ونضيف الجديدة
      setOptionInput(""); //فرغت الانبوت
    }
  };
  const handleDeleteOption = (index) => {
    // بتحذف العنصر حسب الانديكس
    setOptionsList(optionsList.filter((item, i) => i !== index));
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateQuestionSchema),
    context: { optionsList }, // يب لازم تعمل الفالديشين على الليستة عشان الخيارات بالبداية بتنضاف عاللستة مش عالقيمة بالباك
    mode: "onChange",
    defaultValues: {
      //  عشان نعمل ريسيت بلزم نعرف ديفولت فاليوز
      text: row?.text,
      code: row?.code,
      order: row?.order,
      type: row?.type,
      options: row?.options || [],
      isRequired: row?.isRequired ?? false,
      skipWhenNoTumor: row?.skipWhenNoTumor ?? false,
    },
  });

  const selectedType = watch("type");
  useEffect(() => {
    //عشان اذا غير التايب ل 1 نفضي الاوبشينز
    if (selectedType === 1) {
      setOptionsList([]);
      setValue("options", []);
    }
  }, [selectedType, setValue]);

  useEffect(() => {
    //ريسيت للفورم عشان لما افتحه ما يكون على الكتابة الي عدلتها وما سبمتها
    if (openEditForm) {
      reset({
        text: row?.text,
        code: row?.code,
        order: row?.order,
        type: row?.type,
        isRequired: row?.isRequired ?? false,
        skipWhenNoTumor: row?.skipWhenNoTumor ?? false,
        options: row?.options || [],
      });

      setOptionsList(row?.options || []);
    }
  }, [openEditForm, row, reset]);

  useEffect(() => {
    if (optionsList.length >= 2) {
      setOptionsError(""); //  امسح الخطأ لما يصيروا 2 اوبشنز أو أكثر
    }
  }, [optionsList]);

  const { updateQuestionsMutation, serverErrors, setServerErrors } =
    useUpdateQuestions();

  const resetServerErrors = () => setServerErrors("");

  const updateQuestion = (formData) => {
    if (formData.type === 2) {
      if (optionsList.length < 2) {
        setOptionsError("At least 2 options are required");
        return;
      }

      const hasDuplicate = optionsList.some(
        (item, index) =>
          optionsList.findIndex(
            (opt) => opt.toLowerCase() === item.toLowerCase(),
          ) !== index,
      );

      if (hasDuplicate) {
        setOptionsError("Options must be unique");
        return;
      }
    }
    const payload = {
      text: formData.text,
      code: formData.code,
      order: Number(formData.order),
      type: formData.type,
      isActive: checked,
      isRequired: formData.isRequired,
      skipWhenNoTumor: formData.skipWhenNoTumor,
      options: optionsList.length ? optionsList : [],
    };
    updateQuestionsMutation.mutate(
      {
        reportId: row.id,
        data: payload,
      },
      {
        onSuccess: () => {
          setOpenEditForm(false);
        },
      },
    );
  };

  return (
    <Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: open ? "none" : "1px solid #1e1d1d" } }}
      >
        <TableCell align="center" sx={{ width: "50px", paddingLeft: "0px" }}>
          <IconButton
            size="small"
            onClick={() => {
              setOpen(!open);
              setTimeout(() => setOpenEditForm(false), 300);
              resetServerErrors();
            }}
          >
            {open ? (
              <KeyboardArrowDownIcon sx={{ color: "var(--secondary-color)" }} />
            ) : (
              <MdArrowForwardIos size={"15"} fill={"var(--secondary-color)"} />
            )}
          </IconButton>
        </TableCell>

        {isMobile ? (
          <TableCell colSpan={5}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "var(--primary-color)",
                    fontSize: "11px",
                    mb: "2px",
                  }}
                >
                  #{row?.order} ·{" "}
                  {row?.type === 1 ? "Free text" : "Single choice"}
                </Typography>
                <Typography
                  sx={{
                    color: "var(--secondary-color)",
                    fontWeight: "600",
                    fontSize: "13px",
                    maxWidth: "180px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    "@media (max-width:365px)": { maxWidth: "100px" },
                  }}
                >
                  {row?.code}
                </Typography>
                <Typography
                  sx={{
                    color: checked ? "#fff" : "var(--secondary-color)",
                    fontSize: "12px",
                    textDecoration: checked ? "none" : "line-through",
                    maxWidth: "380px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    "@media (max-width:644px)": { maxWidth: "280px" },
                    "@media (max-width:516px)": { maxWidth: "180px" },
                    "@media (max-width:365px)": { maxWidth: "120px" },
                  }}
                >
                  {row?.text}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Switch
                  disabled={row?.code === "preliminary assesment"}
                  checked={checked}
                  onChange={() => handleToggle(row.id)}
                  disableRipple
                  sx={{
                    width: 42,
                    height: 24,
                    padding: 0,
                    "& .MuiSwitch-switchBase": {
                      padding: "3px",
                      "&.Mui-checked": { transform: "translateX(18px)" },
                      "&.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#ff0000 !important",
                        opacity: 1,
                      },
                    },
                    "& .MuiSwitch-thumb": {
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      backgroundColor: "var(--navy-color)",
                    },
                    "& .MuiSwitch-track": {
                      borderRadius: 12,
                      backgroundColor: "#575656 !important",
                      opacity: 1,
                    },
                  }}
                />
                <Box
                  onClick={() => {
                    if (row?.code === "preliminary assesment") return;
                    setOpen(true);
                    setOpenEditForm(true);
                  }}
                  sx={{
                    backgroundColor: "var(--navy-color)",
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor:
                      row?.code === "preliminary assesment"
                        ? "not-allowed"
                        : "pointer",
                    transition: "all .3s",
                    "&:hover": { bgcolor: "rgba(229, 226, 226, 0.21)" },
                    "@media (max-width:418px)": { display: "none" },
                  }}
                >
                  <MdOutlineEdit size={19} fill={"var(--secondary-color)"} />
                </Box>
              </Box>
            </Box>
          </TableCell>
        ) : (
          <>
            <TableCell
              align="left"
              sx={{ color: "var(--secondary-color)", fontWeight: "600" }}
            >
              #{row?.order}
            </TableCell>

            <TableCell
              component="th"
              scope="row"
              sx={{
                maxWidth: 200,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: "var(--secondary-color)",
                fontWeight: "600",
                "@media (max-width:1060px)": { maxWidth: 100 },
              }}
            >
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
                textDecoration: checked ? "none" : "line-through",
                "@media (max-width:1060px)": { maxWidth: 300 },
              }}
            >
              {row?.text}
            </TableCell>

            <TableCell
              align="left"
              sx={{ color: "var(--secondary-color)", fontWeight: "600" }}
            >
              {row?.type === 1 ? "Free text" : "Single choice"}
            </TableCell>

            <TableCell
              align="left"
              sx={{
                color: "var(--secondary-color)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                "@media (max-width:1178px)": { display: "none" },
              }}
            >
              <Switch
                disabled={row?.code === "preliminary assesment"}
                checked={checked}
                onChange={() => handleToggle(row.id)}
                disableRipple
                sx={{
                  width: 42,
                  height: 24,
                  padding: 0,
                  "& .MuiSwitch-switchBase": {
                    padding: "3px",
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: "rgba(81, 81, 81, 0.22) !important",
                    },
                    "&.Mui-checked": { transform: "translateX(18px)" },
                    "&.Mui-disabled": {
                      cursor: "not-allowed",
                      pointerEvents: "auto",
                    },
                    "&.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#ff0000 !important",
                      opacity: 1,
                    },
                  },
                  "& .MuiSwitch-thumb": {
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: "var(--navy-color)",
                  },
                  "& .MuiSwitch-track": {
                    borderRadius: 12,
                    backgroundColor: "#575656 !important",
                    opacity: 1,
                  },
                }}
              />
              <Box
                onClick={() => {
                  if (row?.code === "preliminary assesment") return;
                  setOpen(true);
                  setOpenEditForm(true);
                }}
                sx={{
                  backgroundColor: "var(--navy-color)",
                  height: "30px",
                  width: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor:
                    row?.code === "preliminary assesment"
                      ? "not-allowed"
                      : "pointer",
                  transition: "all .3s",
                  "&:hover": { bgcolor: "rgba(229, 226, 226, 0.21)" },
                }}
              >
                <MdOutlineEdit size={19} />
              </Box>
            </TableCell>
          </>
        )}
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {!openEditForm ? (
              <Box
                className="inner_content"
                sx={{
                  color: "#fff",
                  paddingBottom: "30px",
                  paddingTop: "10px",
                  paddingLeft: "70px",
                  "@media (max-width:360px)": { paddingLeft: "58px" },
                }}
              >
                <Box
                  className="options"
                  sx={{
                    display: "flex",
                    gap: "8px",
                    marginBottom: "20px",
                    flexWrap: "wrap",
                    maxHeight: "80px",
                    overflowY: "auto",
                    overflowX: "hidden",

                    "&::-webkit-scrollbar": {
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "var(--secondary-color)",
                      borderRadius: "10px",
                      cursor: "grab",
                    },
                  }}
                >
                  {row?.type === 2 ? (
                    row?.options?.map((option) => (
                      <Typography
                        key={option}
                        sx={{
                          width: "fit-content",
                          bgcolor: "rgba(229, 226, 226, 0.21)",
                          borderRadius: "15px",
                          paddingY: "2px",
                          paddingX: "10px",
                          color: "rgb(209, 206, 206)",
                          fontSize: "12px",
                        }}
                      >
                        {option}
                      </Typography>
                    ))
                  ) : (
                    <Typography
                      sx={{ color: "var(--secondary-color)", fontSize: "13px" }}
                    >
                      No options defined.
                    </Typography>
                  )}
                </Box>
                <Box
                  className="question_text"
                  sx={{
                    flexWrap: "wrap",
                    maxHeight: "80px",
                    overflowY: "auto",
                    overflowX: "hidden",

                    "&::-webkit-scrollbar": {
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "var(--secondary-color)",
                      borderRadius: "10px",
                      cursor: "grab",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "var(--secondary-color)",
                      marginBottom: "4px",
                    }}
                  >
                    <Typography
                      component={"span"}
                      sx={{ fontSize: "13px", color: "var(--primary-color)" }}
                    >
                      Question:{" "}
                    </Typography>
                    {row?.text}
                  </Typography>
                </Box>
                <Box className="code">
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "var(--secondary-color)",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      component={"span"}
                      sx={{ fontSize: "13px", color: "var(--primary-color)" }}
                    >
                      Code:{" "}
                    </Typography>
                    {row?.code}
                  </Typography>
                </Box>
                <Box className="footer" sx={{ display: "flex", gap: "20px" }}>
                  <Typography
                    sx={{ fontSize: "13px", color: "var(--secondary-color)" }}
                  >
                    Status:{" "}
                    {row?.isActive ? (
                      <Typography
                        component={"span"}
                        sx={{
                          color: "#38d479",
                          fontSize: "13px",
                          textShadow: "0 0 6px #38d479",
                        }}
                      >
                        Active
                      </Typography>
                    ) : (
                      <Typography component={"span"} sx={{ fontSize: "13px" }}>
                        Inactive
                      </Typography>
                    )}
                  </Typography>
                  {row?.code === "preliminary assesment" ? (
                    <Typography
                      sx={{ color: "var(--primary-color)", fontSize: "13px" }}
                    >
                      This question is not editable
                    </Typography>
                  ) : (
                    <Box
                      onClick={() => setOpenEditForm(true)}
                      sx={{
                        color: "var(--primary-color)",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        borderBottom: "1px solid transparent",
                        "&:hover": {
                          borderBottom: "1px solid var(--primary-color)",
                        },
                      }}
                    >
                      <MdOutlineEdit
                        size={15}
                        style={{ transform: "translateY(-1px)" }}
                      />
                      <Typography
                        sx={{
                          fontSize: "13px",
                          textShadow: "0 0 6px var(--primary-color)",
                        }}
                      >
                        Edit inline
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            ) : (
              <Box
                className="edit_question_form"
                component={"form"}
                onSubmit={handleSubmit(updateQuestion)}
                sx={{
                  paddingBottom: "30px",
                  paddingTop: "10px",
                  paddingLeft: "70px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  "@media (max-width:360px)": { paddingLeft: "58px" },
                }}
              >
                <Box className="question_text">
                  <TextField
                    label="QUESTION TEXT"
                    fullWidth
                    multiline
                    variant="standard"
                    {...register("text")}
                    error={!!errors.text}
                    helperText={errors.text?.message}
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
                        "@media (max-width:635px)": {
                          fontSize: "14px",
                        },
                        "& .MuiInput-input": {
                          paddingBottom: "10px",
                        },
                        "& input:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0 100px transparent inset",
                          WebkitTextFillColor: "#fff",
                          transition: "background-color 9999s ease-in-out 0s",
                        },

                        "& input:-webkit-autofill:hover": {
                          WebkitBoxShadow: "0 0 0 100px transparent inset",
                        },

                        "& input:-webkit-autofill:focus": {
                          WebkitBoxShadow: "0 0 0 100px transparent inset",
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
                        "& textarea": {
                          overflowY: "auto !important",
                          maxHeight: "100px",
                        },

                        "& textarea::-webkit-scrollbar": {
                          width: "6px",
                        },
                        "& textarea::-webkit-scrollbar-thumb": {
                          backgroundColor: "var(--secondary-color)",
                          borderRadius: "10px",
                          cursor: "grab",
                        },
                        "& textarea::-webkit-scrollbar-track": {
                          backgroundColor: "var(--navy-color)",
                        },
                      },
                    }}
                  />
                </Box>

                <Box
                  className="code_type_order"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 5,
                    "@media (max-width:611px)": {
                      flexDirection: "column",
                      alignItems: "stretch",
                    },
                  }}
                >
                  <TextField
                    label="CODE"
                    multiline
                    variant="standard"
                    {...register("code")}
                    error={!!errors.code}
                    helperText={errors.code?.message}
                    sx={{ flex: 1 }}
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
                        "@media (max-width:635px)": {
                          fontSize: "14px",
                        },
                        "& .MuiInput-input": {
                          paddingBottom: "10px",
                        },
                        "& textarea": {
                          maxHeight: "50px",
                          overflowY: "auto !important",
                          overflowX: "hidden",
                          "&::-webkit-scrollbar": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "var(--secondary-color)",
                            borderRadius: "10px",
                            cursor: "grab",
                          },
                        },
                        "& input:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0 100px transparent inset",
                          WebkitTextFillColor: "#fff",
                          transition: "background-color 9999s ease-in-out 0s",
                        },

                        "& input:-webkit-autofill:hover": {
                          WebkitBoxShadow: "0 0 0 100px transparent inset",
                        },

                        "& input:-webkit-autofill:focus": {
                          WebkitBoxShadow: "0 0 0 100px transparent inset",
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
                      },
                    }}
                  />

                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        variant="standard"
                        sx={{ flex: 1, minWidth: 150 }}
                        error={!!errors.type}
                      >
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
                          {...field}
                          IconComponent={KeyboardArrowDownIcon}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                bgcolor: "var(--navy-color)",
                                color: "var(--secondary-color)",
                                overflow: "hidden",
                                "& .MuiMenuItem-root": {
                                  color: "var(--secondary-color)",
                                  transition: "0.2s",
                                  "&:hover": {
                                    backgroundColor:
                                      "rgba(229, 226, 226, 0.08)",
                                  },

                                  "&.Mui-selected": {
                                    backgroundColor:
                                      "rgba(229, 226, 226, 0.15)",
                                    color: "var(--primary-color)",
                                  },

                                  "&.Mui-selected:hover": {
                                    backgroundColor: "rgba(229, 226, 226, 0.2)",
                                  },
                                },
                                "& .MuiMenuItem-root:last-of-type": {
                                  borderBottomLeftRadius: "25px",
                                  borderBottomRightRadius: "25px",
                                },
                              },
                            },
                          }}
                          sx={{
                            color: "#fff",
                            "@media (max-width:635px)": {
                              fontSize: "14px",
                            },
                            "& .MuiInput-input": {
                              paddingBottom: "15px",
                            },
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
                          <MenuItem value={2}>Single choice</MenuItem>
                        </Select>
                        {errors.type && (
                          <FormHelperText>{errors.type.message}</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />

                  <TextField
                    label="ORDER"
                    variant="standard"
                    type="number"
                    inputProps={{ min: 1 }}
                    {...register("order")}
                    error={!!errors.order}
                    helperText={errors.order?.message}
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
                        "@media (max-width:635px)": {
                          fontSize: "14px",
                        },
                        "& .MuiInput-input": {
                          paddingBottom: "15px",
                        },
                        "& input[type=number]": {
                          MozAppearance: "textfield",
                        },
                        "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                          {
                            WebkitAppearance: "inner-spin-button",
                            opacity: 1,
                            filter:
                              "invert(1) sepia(0) saturate(1) hue-rotate(147deg) !important",
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
                        },
                      },
                    }}
                  />
                </Box>
                {selectedType !== 1 && (
                  <Box className="options">
                    <Typography
                      sx={{ fontSize: "12px", color: "var(--mid-gray-color)" }}
                    >
                      OPTIONS
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: 1,
                        borderBottom: optionsError
                          ? "1px solid #ca2528"
                          : "1px solid var(--mid-gray-color)",
                        paddingBottom: "10px",
                        flexWrap: "wrap",

                        maxHeight: "80px",
                        overflowY: "auto",

                        "&:hover": {
                          borderBottom: "1px solid var(--dark-gray-color)",
                        },
                        "&:focus-within": {
                          borderBottom: "2px solid var(--primary-color)",
                        },

                        "&::-webkit-scrollbar": {
                          width: "6px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "var(--secondary-color)",
                          borderRadius: "10px",
                          cursor: "grab",
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
                                color: "var(--primary-color)",
                              },
                            },
                            "@media (max-width:635px)": {
                              fontSize: "12px",
                            },
                          }}
                        />
                      ))}
                      <TextField
                        variant="standard"
                        error={!!errors.options}
                        helperText={errors.options?.message}
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
                            fontSize: "13px",
                            "&.Mui-focused": {
                              opacity: 0,
                            },
                          },
                        }}
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            color: "#fff",
                            "& input:-webkit-autofill": {
                              WebkitBoxShadow: "0 0 0 100px transparent inset",
                              WebkitTextFillColor: "#fff",
                              transition:
                                "background-color 9999s ease-in-out 0s",
                            },
                            "& input:-webkit-autofill:hover": {
                              WebkitBoxShadow: "0 0 0 100px transparent inset",
                            },

                            "& input:-webkit-autofill:focus": {
                              WebkitBoxShadow: "0 0 0 100px transparent inset",
                            },
                            "& .MuiInput-input": {
                              padding: "0",
                              margin: 0,
                            },
                          },
                        }}
                      />
                    </Box>
                    {optionsError && (
                      <Typography
                        sx={{
                          color: "#ca2528",
                          fontSize: "12px",
                          marginTop: "5px",
                        }}
                      >
                        {optionsError}
                      </Typography>
                    )}
                  </Box>
                )}

                <Box className="check_boxes flex_column">
                  <Controller
                    name="isRequired"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label="Required"
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            color: "var(--secondary-color)",
                            fontSize: { xs: "11px", md: "13px" },
                            fontWeight: "600",
                          },
                        }}
                        control={
                          <Checkbox
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            sx={{
                              "& .MuiTouchRipple-root span": {
                                backgroundColor: "#ee060656",
                              },
                            }}
                            icon={
                              <Box
                                component="span"
                                sx={{
                                  width: { xs: 14, sm: 17 },
                                  height: { xs: 14, sm: 17 },
                                  borderRadius: "4px",
                                  border: "2px solid var(--secondary-color)",
                                  display: "inline-block",
                                }}
                              />
                            }
                            checkedIcon={
                              <span
                                style={{
                                  width: isXSmall ? 14 : 17,
                                  height: isXSmall ? 14 : 17,
                                  borderRadius: 4,
                                  backgroundColor: "red",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <svg width="14" height="14">
                                  <path
                                    d="M2 7L5.5 10.5L12 3.5"
                                    stroke="white"
                                    strokeWidth={isXSmall ? "1.5" : "2.5"}
                                    fill="none"
                                  />
                                </svg>
                              </span>
                            }
                          />
                        }
                      />
                    )}
                  />

                  <Controller
                    name="skipWhenNoTumor"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label="Skip when no tumor"
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            color: "var(--secondary-color)",
                            fontSize: { xs: "11px", md: "13px" },
                            fontWeight: "600",
                          },
                        }}
                        control={
                          <Checkbox
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            sx={{
                              "& .MuiTouchRipple-root span": {
                                backgroundColor: "#ee060656",
                              },
                            }}
                            icon={
                              <Box
                                component="span"
                                sx={{
                                  width: { xs: 14, sm: 17 },
                                  height: { xs: 14, sm: 17 },
                                  borderRadius: "4px",
                                  border: "2px solid var(--secondary-color)",
                                  display: "inline-block",
                                }}
                              />
                            }
                            checkedIcon={
                              <span
                                style={{
                                  width: isXSmall ? 14 : 17,
                                  height: isXSmall ? 14 : 17,
                                  borderRadius: 4,
                                  backgroundColor: "red",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <svg width="14" height="14">
                                  <path
                                    d="M2 7L5.5 10.5L12 3.5"
                                    stroke="white"
                                    strokeWidth={isXSmall ? "1.5" : "2.5"}
                                    fill="none"
                                  />
                                </svg>
                              </span>
                            }
                          />
                        }
                      />
                    )}
                  />
                </Box>

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
                  className="action_btns"
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    marginTop: "16px",
                  }}
                >
                  <Button
                    startIcon={<MdClose size={18} />}
                    onClick={() => {
                      setOpenEditForm(false);
                      resetServerErrors();
                    }}
                    sx={{
                      color: "#aaa",
                      borderRadius: "20px",
                      paddingX: { sm: "4px", md: "8px" },
                      transition: "all 0.3s",
                      "&:hover": {
                        color: "var(--primary-color)",
                      },
                      "& .MuiButton-startIcon": {
                        marginRight: "4px",
                      },
                    }}
                  >
                    <Typography
                      sx={{ fontSize: { xs: "10px", sm: "13px", md: "14px" } }}
                    >
                      Cancel
                    </Typography>
                  </Button>

                  <Button
                    variant="contained"
                    type="submit"
                    startIcon={<MdCheck size={18} />}
                    sx={{
                      bgcolor: "var(--primary-color)",
                      borderRadius: "20px",
                      paddingX: { sm: "12px", md: "24px" },
                      transition: "all 0.3s",
                      fontSize: { xs: "10px", sm: "13px", md: "14px" },
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
            )}
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

export default function QuestionsTabel({ data, search }) {
  const filteredData = data?.filter(
    (row) =>
      row?.text?.toLowerCase().includes(search.toLowerCase()) ||
      row?.code?.toLowerCase().includes(search.toLowerCase()),
  );
  const [openDrawer, setOpenDrawer] = useState(false);

  const hasResults = filteredData?.length > 0; //اذا في نتائج للبحث
  const isEmptyData = data?.length === 0; // اذا ما في ولا سؤال اصلا

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 0,
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          height: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "var(--dark-gray-color)",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "var(--primary-color)",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#ac2222",
          cursor: "grab",
        },
      }}
    >
      <Table
        aria-label="collapsible table"
        sx={{
          bgcolor: "var(--navy-color)",
          "& .MuiTableCell-root": {
            borderBottomColor: "#1e1d1d",
          },
        }}
      >
        <TableBody>
          {isEmptyData ? (
            <TableRow>
              <TableCell
                colSpan={7}
                align="center"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  alignItems: "center",
                  paddingBottom: "55px",
                }}
              >
                <Typography
                  sx={{
                    color: "var(--mid-gray-color)",
                    fontSize: "15px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                  }}
                >
                  No questions yet
                </Typography>
                <Typography
                  sx={{
                    color: "#ffffffda",
                    fontSize: "15px",
                    maxWidth: "340px",
                    wordBreak: "break-word",
                  }}
                >
                  Start organizing the questions that your students will answer
                  when submitting MRI cases.
                </Typography>
                <Button
                  onClick={() => setOpenDrawer(true)}
                  sx={{
                    bgcolor: "#ed2c2c",
                    color: "#f0f2f5",
                    display: "flex",
                    paddingX: { xs: "10px", md: "15px" },
                    paddingY: { xs: "5px", md: "10px" },
                    gap: "10px",
                    justifyContent: "center",
                    textAlign: "center",
                    borderRadius: "25px",
                    whiteSpace: "nowrap",
                    boxShadow: "0 0 15px rgba(207, 25, 25, 0.81)",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
                    },
                    "@media (max-width:1142px)": { marginTop: "20px" },
                  }}
                >
                  {" "}
                  <Box sx={{ alignItems: "center", display: "flex" }}>
                    <FiPlus size={20} style={{ flexShrink: 0 }} />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: { xs: "14px", sm: "15px", md: "17px" },
                      justifyContent: "flex-start",
                      display: "flex",
                      textTransform: "capitalize",
                      fontWeight: "500",
                    }}
                  >
                    Create the first question
                  </Typography>
                </Button>
                <RightDrawer open={openDrawer} setOpen={setOpenDrawer} />
              </TableCell>
            </TableRow>
          ) : hasResults ? (
            filteredData.map((row) => <Row key={row?.id} row={row} />)
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                align="center"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  alignItems: "center",
                  paddingBottom: "55px",
                }}
              >
                <Typography
                  sx={{
                    color: "var(--mid-gray-color)",
                    fontSize: "15px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                  }}
                >
                  No matching questions
                </Typography>
                <Typography
                  sx={{
                    color: "#ffffffda",
                    fontSize: "15px",
                    maxWidth: "340px",
                    wordBreak: "break-word",
                  }}
                >
                  No questions match your search for "{search}". Please try
                  different keywords.
                </Typography>
                <Button
                  onClick={() => setOpenDrawer(true)}
                  sx={{
                    bgcolor: "#ed2c2c",
                    color: "#f0f2f5",
                    display: "flex",
                    paddingX: { xs: "10px", md: "15px" },
                    paddingY: { xs: "5px", md: "10px" },
                    gap: "10px",
                    justifyContent: "center",
                    textAlign: "center",
                    borderRadius: "25px",
                    whiteSpace: "nowrap",
                    boxShadow: "0 0 15px rgba(207, 25, 25, 0.81)",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
                    },
                    "@media (max-width:1142px)": { marginTop: "20px" },
                  }}
                >
                  {" "}
                  <Box sx={{ alignItems: "center", display: "flex" }}>
                    <FiPlus size={20} style={{ flexShrink: 0 }} />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: { xs: "14px", sm: "15px", md: "17px" },
                      justifyContent: "flex-start",
                      display: "flex",
                      textTransform: "capitalize",
                      fontWeight: "500",
                    }}
                  >
                    Create it now
                  </Typography>
                </Button>
                <RightDrawer open={openDrawer} setOpen={setOpenDrawer} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}