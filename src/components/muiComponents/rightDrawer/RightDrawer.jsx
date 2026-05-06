import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControlLabel,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Switch } from "@mui/material";
import { FiPlus } from "react-icons/fi";
import { Controller, useForm } from "react-hook-form";
import { CreateQuestionSchema } from "../../../validations/CreateQuestionsSchema";
import useCreateQuestion from "../../../hooks/supervisorHooks/useCreateQuestion";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Chip } from "@mui/material";

function RightDrawer({ open, setOpen }) {
  const theme = useTheme();
  const isXSmall = useMediaQuery("(max-width:400px)");

  const [questionType, setQuestionType] = useState(1); //لانهم مش فيلد عادي استعملت اليوزستيت
  const [isActive, setIsActive] = useState(true); //
  const [optionInput, setOptionInput] = useState(""); //القيمة اللي بكتبها في الانبوت
  const [optionsList, setOptionsList] = useState([]); //اريه جواها كل الاوبشين اللي انضافت
  const [optionsError, setOptionsError] = useState("");

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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateQuestionSchema),
  });

  useEffect(() => {
    if (optionsList.length >= 2) {
      setOptionsError(""); //  امسح الخطأ لما يصيروا 2 اوبشنز أو أكثر
    }
  }, [optionsList]);
  useEffect(() => {
    // نفضي الاوبشين اللي كتبناها لو اخترنا التايب 1
    if (questionType === 1) {
      setOptionsList([]);
      setOptionInput("");
      setOptionsError("");
    }
  }, [questionType]);
  const resetDrawer = () => {
    // عشان افضيه بس يتسكر
    setOptionsList([]);
    setOptionInput("");
    setQuestionType(1);
    setIsActive(true);
    reset();
  };

  const { usePostMutation, serverErrors } = useCreateQuestion({
    onSuccess: () => {
      reset();
      setOpen(false);
    },
  });

  const onSubmit = (data) => {
    if (questionType === 2) {
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
    usePostMutation.mutate({
      code: data?.code,
      text: data?.text,
      type: questionType,
      order: Number(data.order),
      isActive: isActive,
      isRequired: data?.isRequired ?? false,
      skipWhenNoTumor: data?.skipWhenNoTumor ?? false,
      options: optionsList.length > 0 ? optionsList : [""],
    });
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => {
          resetDrawer();
          setOpen(false);
        }}
        PaperProps={{
          sx: {
            bgcolor: "var(--navy-color)",
            paddingY: "40px",
            paddingX: "30px",
            width: { xs: "100%", sm: 400, md: 450 },
            border: "1px solid #66636347",
            overflowY: "auto",

            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "var(--primary-color)",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "var(--primary-color)",
              cursor: "grab",
            },
          },
        }}
      >
        <Box className="drawer_content">
          <Box
            className="drawer_titel flex_column"
            sx={{ marginBottom: "40px" }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                component={"h1"}
                sx={{
                  color: "#fff",
                  fontSize: "30px",
                  fontWeight: "600",
                  fontFamily: "var(--primary-font)",
                  "@media (max-width:700px)": {
                    fontSize: "22px",
                  },
                }}
              >
                New Question
              </Typography>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <IoMdClose
                  onClick={() => {
                    resetDrawer();
                    setOpen(false);
                  }}
                  size={22}
                  color="var(--secondary-color)"
                  style={{ cursor: "pointer", flexShrink: 0 }}
                />
              </Box>
            </Box>
            <Typography
              sx={{
                color: "var(--secondary-color)",
                fontSize: "15px",
                width: "fit-content",
                fontWeight: "200",
                "@media (max-width:700px)": {
                  fontSize: "13px",
                },
                "@media (max-width:390px)": {
                  paddingRight: "40px",
                },
              }}
            >
              Add a question to the supervisor review form.
            </Typography>
          </Box>

          <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
            <Typography
              sx={{
                color: "var(--secondary-color)",
                fontSize: "15px",
                fontWeight: "200",
                marginBottom: "10px",
                fontFamily: "var(--secondary-font)",
              }}
            >
              Question text
            </Typography>
            <TextField
              placeholder={" What should students answer?"}
              fullWidth
              multiline
              rows={3}
              {...register("text")}
              error={!!errors.text}
              helperText={errors.text?.message}
              sx={{
                "& input::placeholder, & textarea::placeholder": {
                  color: "var(--secondary-color)",
                  opacity: 1,
                  fontWeight: "400",
                },
                "& .MuiInputBase-root": {
                  padding: 0,
                },
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  backgroundColor: "var(--navy-color)",
                  "&:hover fieldset": {
                    borderBottom: "1px solid var(--dark-gray-color)",
                  },
                  "& fieldset": {
                    border: "none",
                    borderBottom: "1px solid #5958588b",
                    borderRadius: 0,
                  },
                  "&.Mui-focused fieldset": {
                    borderBottom: "1px solid var(--primary-color)",
                  },
                },
                "& textarea": {
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "var(--secondary-color)",
                    cursor: "grab",
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "var(--navy-color)",
                  },
                  "@media (max-width:435px)": {
                    fontSize: "14px",
                  },
                },
              }}
            />

            <Box sx={{ display: "flex", gap: "25px", marginTop: "50px" }}>
              <TextField
                label="CODE"
                fullWidth
                multiline
                rows={2}
                {...register("code")}
                error={!!errors.code}
                helperText={errors.code?.message}
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
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    backgroundColor: "var(--navy-color)",
                    "&:hover fieldset": {
                      borderBottom: "1px solid var(--dark-gray-color)",
                    },
                    "& fieldset": {
                      border: "none",
                      borderBottom: "1px solid #5958588b",
                      borderRadius: 0,
                    },
                    "&.Mui-focused fieldset": {
                      borderBottom: "1px solid var(--primary-color)",
                    },
                    "& textarea": {
                      overflowY: "auto",
                      "&::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "var(--secondary-color)",
                        cursor: "grab",
                        borderRadius: "10px",
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "var(--navy-color)",
                      },
                      "@media (max-width:435px)": {
                        fontSize: "14px",
                      },
                    },
                  },
                }}
              />

              <TextField
                label="ORDER"
                fullWidth
                rows={2}
                multiline
                {...register("order")}
                error={!!errors.order}
                helperText={errors.order?.message}
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
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    backgroundColor: "var(--navy-color)",
                    "&:hover fieldset": {
                      borderBottom: "1px solid var(--dark-gray-color)",
                    },
                    "& fieldset": {
                      border: "none",
                      borderBottom: "1px solid #5958588b",
                      borderRadius: 0,
                    },
                    "&.Mui-focused fieldset": {
                      borderBottom: "1px solid var(--primary-color)",
                    },
                    "& textarea": {
                      overflowY: "auto",
                      "&::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "var(--secondary-color)",
                        cursor: "grab",
                        borderRadius: "10px",
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "var(--navy-color)",
                      },
                      "@media (max-width:435px)": {
                        fontSize: "14px",
                      },
                    },
                  },
                }}
              />
            </Box>

            <Box
              className="question_type flex_column"
              sx={{ marginTop: "30px", gap: "10px" }}
            >
              <Typography
                sx={{ color: "var(--secondary-color)", fontSize: "13px" }}
              >
                Type
              </Typography>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Button
                  onClick={() => setQuestionType(1)}
                  sx={{
                    color:
                      questionType === 1 ? "#fff" : "var(--secondary-color)",
                    textTransform: "capitalize",
                    fontSize: "13px",
                    bgcolor:
                      questionType === 1 ? "var(--primary-color)" : "#242424",
                    paddingY: "4px",
                    paddingX: "9px",
                    borderRadius: "15px",
                    textAlign: "center",
                    "@media (max-width:435px)": {
                      fontSize: "11px",
                      paddingX: "7px",
                      paddingY: "2px",
                    },
                  }}
                >
                  Free Text
                </Button>
                <Button
                  onClick={() => setQuestionType(2)}
                  sx={{
                    color:
                      questionType === 2 ? "#fff" : "var(--secondary-color)",
                    textTransform: "capitalize",
                    fontSize: "13px",
                    bgcolor:
                      questionType === 2 ? "var(--primary-color)" : "#242424",
                    paddingY: "4px",
                    paddingX: "9px",
                    borderRadius: "15px",
                    textAlign: "center",
                    "@media (max-width:435px)": {
                      fontSize: "11px",
                      paddingX: "7px",
                      paddingY: "2px",
                    },
                  }}
                >
                  Single Choice
                </Button>
              </Box>
            </Box>
            {questionType !== 1 && (
              <Box>
                <Typography
                  sx={{
                    color: "var(--secondary-color)",
                    fontSize: "14px",
                    fontWeight: "200",
                    marginBottom: "10px",
                    fontFamily: "var(--secondary-font)",
                    marginTop: "20px",
                  }}
                >
                  Options
                </Typography>

                <Box
                  sx={{
                    border: "none",
                    borderBottom: optionsError
                      ? "1px solid #ca2528"
                      : "1px solid #5958588b",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    padding: "8px 0",
                    marginTop: "15px",
                    alignItems: "center",
                    maxHeight: "90px",
                    "&:hover": {
                      borderBottom: "1px solid var(--dark-gray-color)",
                    },
                    "&:focus-within": {
                      borderBottom: "2px solid var(--primary-color)",
                    },
                    overflowY: "auto",
                    "&::-webkit-scrollbar": {
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "var(--secondary-color)",
                      borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      backgroundColor: "#ff4d4d",
                      cursor: "grab",
                    },
                  }}
                >
                  {optionsList.map(
                    (
                      option,
                      index, // بنلف ع العنصار الاريه عشان نعرض الاوبشين
                    ) => (
                      <Chip // مربوط فيه الانديكس
                        key={index}
                        label={option}
                        onDelete={() => handleDeleteOption(index)}
                        sx={{
                          bgcolor: "#242424",
                          color: "#eee7e7",
                          "& .MuiChip-deleteIcon:hover": {
                            color: "var(praimary-color)",
                          },
                          "& .MuiChip-deleteIcon": {
                            fontSize: "20px",
                            color: "#6c6c6c",
                          },
                          "@media (max-width:435px)": {
                            fontSize: "11px",
                          },
                        }}
                      />
                    ),
                  )}
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

            <Box
              className="active"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "30px",
                paddingTop: "20px",
                borderTop: "1px solid #55555582",
              }}
            >
              <Typography
                sx={{ color: "var(--secondary-color)", fontSize: "15px" }}
              >
                Active immediately
              </Typography>
              <Switch
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
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

                    "&.Mui-checked": {
                      transform: "translateX(18px)",
                    },

                    "&.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "var(--primary-color) !important",
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
            </Box>

            <Box className="check_boxes flex_column" sx={{ marginTop: "20px" }}>
              <Controller
                name="isRequired"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    label="Required"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        color: "var(--secondary-color)",
                        fontSize: "13px",
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
                        fontSize: "13px",
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
                sx={{ color: "var(--primary-color)", marginTop: "20px" }}
              >
                {serverErrors}
              </Typography>
            ) : (
              ""
            )}

            <Box
              className="buttons"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "80px",
              }}
            >
              <Button
                onClick={() => {
                  resetDrawer();
                  setOpen(false);
                }}
                sx={{
                  color: "var(--secondary-color)",
                  fontSize: "14px",
                  textTransform: "capitalize",
                  paddingY: "4px",
                  borderRadius: "15px",
                  textAlign: "center",
                  transition: "all 0.2s ease-in-out", 
                  "&:hover": {
                    color: "#fff",
                    transform: "translateY(-3px)",
                  },
                  "@media (max-width:350px)": { fontSize: "12px" },
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={usePostMutation?.isPending}
                sx={{
                  bgcolor: "#ed2c2c",
                  color: "#f0f2f5",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "3px",
                  borderRadius: "25px",
                  whiteSpace: "nowrap",
                  boxShadow: "0 0 15px rgba(207, 25, 25, 0.81)",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
                  },
                }}
              >
                <FiPlus
                  style={{
                    flexShrink: 0,
                    fontSize: isXSmall ? "14px" : "20px",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "14px",
                    justifyContent: "flex-start",
                    display: "flex",
                    textTransform: "capitalize",
                    fontWeight: "500",
                    "@media (max-width:350px)": { fontSize: "12px" },
                  }}
                >
                  Create{" "}
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default RightDrawer;