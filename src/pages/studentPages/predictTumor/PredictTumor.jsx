import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import usePredictMRI from "../../../hooks/mriHooks/usePredictMRI";
import { FaCloudUploadAlt } from "react-icons/fa"; //ايقونة الابلود من مكتبة رياكت ايكونز
import { FaFolderOpen } from "react-icons/fa6";
import { GiCycle } from "react-icons/gi";
import { FaCircle } from "react-icons/fa";
import { LuBrain } from "react-icons/lu";
import { useEffect, useMemo, useState } from "react";
import style from "./PredictTumor.module.css";
import useUploadMRI from "../../../hooks/mriHooks/useUploadMRI";
import usePreviewMRI from "../../../hooks/mriHooks/usePreviewMRI";
import TooltipButton from "../../../components/uiVerseComponents/tooltipButton/TooltipButton";
import SendButton from "../../../components/uiVerseComponents/sendButton/SendButton";
import Loader from "../../../components/uiVerseComponents/loader/Loader";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetQuestions from "../../../hooks/studentHooks/useGetQuestions";
import useSubmitReport from "../../../hooks/studentHooks/useSubmitReport";
import { SubmitReportSchema } from "../../../validations/SubmitReportSchema";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { LinearProgress } from "@mui/material";
import { IoLockClosedOutline } from "react-icons/io5";
import { SlEnergy } from "react-icons/sl";

function PredictTumor() {
  const { isError, error, isLoading, data } = useGetQuestions();

  //لتعطيل باقي الاسئلة اا جاوب نو تيومر
  const preliminaryQuestion = data?.find(
    (q) => q.code === "preliminary assesment",
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const preliminaryAnswer = watch(preliminaryQuestion?.id);
  const isNoTumor = preliminaryAnswer === "no tumor";

  const resolver = useMemo(() => {
    if (!data) return undefined;
    return yupResolver(SubmitReportSchema(data, isNoTumor));
  }, [data, isNoTumor]);

  const fileRegister = register("file"); // ربط input تبع الملف مع react-hook-form عشان يخزن قيمة الفايل (FileList) ويتحكم فيه
  const [fileValue, setFileValue] = useState(null);
  const [previewGradCam, setPreviewGradCam] = useState(null);
  const [caseId, setCaseId] = useState(null);
  const [fileError, setFileError] = useState("");
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

  const { predictMRIMutation } = usePredictMRI();
  const { uploadMRIMutation } = useUploadMRI();
  const { preview, setPreview, handelImagePreview } = usePreviewMRI();
  const {
    usePostMutation: submitReportMutation,
    serverErrors,
    isLoading: isLoadingBtn,
  } = useSubmitReport();
  const [showGradCam, setShowGradCam] = useState(false); //عشان اخفي او اظهر الجراد كام من خلال البوتون
  const [analysisTime, setAnalysisTime] = useState(null); //لحساب وقت التحليل

  const [showResult, setShowResult] = useState(false); // البوكس الي بتظهر فيه اجابات المودل
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isLocked = isSubmitted; //عشان ما يشوف الجواب ويرجع فوق يعبي الفورم ويسلم

  console.log("data ", data);

  const resetImage = () => {
    setPreview(null);
    setPreviewGradCam(null);
    setFileValue(null);
    setShowGradCam(null);
    setShowResult(false);
    setFileError("");
    setIsSubmitted(false);

    const emptyValues = data?.reduce((acc, q) => {
      acc[q.id] = "";
      return acc;
    }, {});

    reset(emptyValues);
  };

  const uploadMRI = async () => {
    if (!fileValue) return;

    const uploadResponse = await uploadMRIMutation.mutateAsync(fileValue);
    const newCaseId = uploadResponse.caseId;
    setCaseId(newCaseId);

    return newCaseId;
  };

  const submitReport = async (formValues) => {
    setIsSubmittedSuccessfully(false);

    if (!fileValue) {
      if (isLocked) {
        setFileError("Please upload a new MRI image to submit again");
      } else {
        setFileError("Please upload an MRI file");
      }
      return;
    }

    setFileError("");
    setIsSubmitted(true);

    try {
      const newCaseId = await uploadMRI();
      const answersArray = data.map((q) => ({
        questionId: q.id,
        answerValue: formValues[q.id] || "",
      }));

      await submitReportMutation.mutateAsync({
        caseId: newCaseId,
        answers: answersArray,
      });
      setIsSubmittedSuccessfully(true);
      const startTime = Date.now(); //عشان ابلش احسب الوقت
      const modelResponse = await predictMRIMutation.mutateAsync(newCaseId);
      console.log("model res ", modelResponse);
      setShowResult(true);

      const endTime = Date.now(); //نهاية الوقت
      const duration = ((endTime - startTime) / 1000).toFixed(2); //حولناها لثواني
      setAnalysisTime(duration); //stateخزناها بال
      // reset
      setCaseId(null);
      setPreviewGradCam(null);
      setFileValue(null);
    } catch (err) {
      setIsSubmitted(false);
      setTimeout(() => {
        setIsSubmittedSuccessfully(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (isNoTumor) {
      const updatedValues = data?.reduce((acc, q) => {
        // نخلي السؤال الأساسي زي ما هو
        if (q.code === "preliminary assesment") {
          acc[q.id] = preliminaryAnswer;
        }
        // فقط اللي skipWhenNoTumor = true بنفضيه
        else if (q.skipWhenNoTumor === true) {
          acc[q.id] = "";
        }
        // الباقي بنحافظ عليه
        else {
          acc[q.id] = watch(q.id);
        }

        return acc;
      }, {});

      reset(updatedValues);
    }
  }, [isNoTumor, data, preliminaryAnswer]);

  const isDisabled = (q) => {
    if (isLocked) return true; //لقفل الفورم بعد النتيجة
    if (q.code === "preliminary assesment") return false;
    if (isNoTumor) {
      return q.skipWhenNoTumor;
    }
    return false;
  };

  //////////////////////////////////////

  return (
    <Box className="predict_tumor_section" sx={{ padding: "1px" }}>
      <Container maxWidth="lg">
        <Box
          className="header_section flex_column"
          component={"section"}
          sx={{
            alignItems: "center",
            paddingTop: "80px",
            gap: "20px",
          }}
        >
          <Typography
            component={"p"}
            sx={{
              border: "1px solid var(--primary-color)",
              width: "fit-content",
              borderRadius: "60px",
              color: "var(--light-red-color)",
              px: "18px",
              py: "10px",
              bgcolor: "rgba(255, 0, 0, 0.1)",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              "@media (max-width:700px)": {
                fontSize: "14px",
              },
              "@media (max-width:900px)": {
                fontSize: "12px",
              },
              "@media (max-width:600px)": {
                fontSize: "12px",
              }
            }}
          >
            <Typography component={"span"} className={style.pulse_wrapper}>
              <LuBrain size={18} color="var(--light-red-color)" />
            </Typography>
            AI-Powered Medical Platform
          </Typography>
          <Typography
            component={"h1"}
            sx={{
              fontFamily: "var(--primary-font)",
              fontWeight: "800",
              color: "var(--primary-color)",
              background: "linear-gradient(90deg, #ec827c, #e80d0d, #ff0000)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
              fontSize: { xs: "38px", sm: "60px", md: "88px" ,lg:"96px"},
              lineHeight: { xs: "70px", sm: "100px" },
            }}
          >
            Predict Tumor
          </Typography>
          <Typography
            sx={{
              color: "var(--secondary-color)",
              fontFamily: "var(--secondary-font)",
              fontSize: {xs:"14px",sm:'15px',md:"19px",lg:"24px"},
              textAlign: "center",
            }}
          >
            Upload an MRI scan, analuze it with AI, and Submit your diagnosis
            for review.
          </Typography>
        </Box>
        <Box
          component={"section"}
          className="upload_mri_form"
          sx={{
            position: "relative",
            zIndex: 20,
            background: "#25252578",
            boxShadow: "0 0 10px 0 rgb(249, 10, 10)",
            paddingX: "26px",
            paddingTop: "30px",
            paddingBottom: "30px",
            borderRadius: "29px",
            minHeight:{ xs:"500px",md:"540px"},
            marginTop: "60px",
            marginBottom: "100px",
            marginX:{xs:"3px",sm:"0px"}
          }}
        >
          <Typography
            component={"h2"}
            sx={{
              color: "#fff",
              fontWeight: "500",
              paddingBottom: "20px",
              fontSize: {xs:"16px",sm:"21px",md:"25px",lg:"30px"},
              fontFamily: "var(--secondary-font)",
            }}
          >
            MRI Upload
          </Typography>

          {!preview ? (
            <Box
              className="flex_column"
              component={"form"}
              sx={{
                minHeight: {xs:"370px",md:"450px"},
              }}
            >
              <Box
                className={`flex_column ${style.dashed_form_hover}`}
                component={"label"}
                sx={{
                  flex: 1,
                  justifyContent: "center",
                  boxShadow: "0 0 10px 0 rgb(59, 58, 58)",
                  alignItems: "center",
                  bgcolor: "#0e0d0d3a",
                  gap: "20px",
                  cursor: "pointer",
                  borderRadius: "20px",
                  paddingTop: "20px",
                  paddingBottom: "80px",
                }}
              >
                <input
                  className={style.opacity_0}
                  {...register("file")}
                  type="file"
                  onChange={(e) => {
                    fileRegister.onChange(e); // خبرنا الفورم انه صار تغيير
                    handelImagePreview(e);
                    const file = e.target.files[0];
                    setFileValue(file);
                    if (file) {
                      setFileError("");
                    }
                  }}
                />
                <Box
                  component={FaCloudUploadAlt}
                  className={style.animatedIcon}
                  sx={{color:"var(--primary-color)",filter: "drop-shadow(0 0 6px rgba(232, 6, 6, 0.44))",fontSize:{xs:"50px",sm:"70px",md:"90px",lg:"100px"}}}
                  
                    
                 
                />
                <Typography
                  component={"p"}
                  variant="h5"
                  sx={{
                    fontSize:{xs:"15px",sm:"18px",md:"24px"},
                    color: "#fff",
                    letterSpacing: "1px",
                    fontFamily: "var(--secondary-font)",
                  }}
                >
                  Upload MRI Image
                </Typography>
                <Button
                  component={"span"}
                 
                  sx={{
                    bgcolor: "var(--primary-color)",
                    color: "#fff",
                    textTransform: "capitalize",
                    fontSize: {xs:"11px",sm:"15px",md:"16px",lg:"18px"},
                    paddingY: "7px",
                    paddingX: "35px",
                    borderRadius: "8px",
                    boxShadow: "0 0 15px rgba(255, 0, 0, 0.6)",
                  }}
                > <Box component={FaFolderOpen} sx={{marginRight:'7px',fontSize:{xs:"14px",sm:"18px",md:"23px"}}}/>
                  Browse File
                </Button>
              </Box>
            </Box>
          ) : (
            <Box
              className="image_preview_gradcam flex_column"
              sx={{
                bgcolor: "#3b3a3a42",
                border: "1px solid #4b4848",
                boxShadow: "0 0 20px 0 rgba(213, 211, 211, 0.2)",
                borderRadius: "20px",
                padding: "15px",
                height: "100%",
              }}
            >
              <Grid container spacing={2} sx={{ height: "100%" }}>
                <Grid
                  item
                  size={{ xs: 12, sm: 8, md: 6 }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    className="image"
                    sx={{
                      position: "relative",
                      bgcolor: "#000",
                      paddingX: { xs: "10px", md: "60px" },
                      paddingY: "10px",
                      borderRadius: "20px",
                      textAlign: "center",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box component={"img"}
                      src={preview}
                      alt="Brain MRI scan"
                      sx={{ height: "100%", width: "100%" }}
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  size={{ xs: 12, sm: 4, md: 6 }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    className="ready_to_analysis flex_column"
                    sx={{
                      bgcolor: "#000",
                      alignItems: "center",
                      paddingX: "20px",
                      paddingY: "25px",
                      width: "fit-content",
                      borderRadius: "20px",
                    }}
                  >
                    <Typography
                      component={"h3"}
                      sx={{
                        fontSize: {xs:'18px',sm:"25px"},
                        textAlign: "center",
                        fontWeight: "600",
                        color: "var(--primary-color)",
                        background:
                          "linear-gradient(90deg, #ec827c, #e80d0d, #ff0000)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Ready to analysis
                    </Typography>
                    <Typography
                      sx={{
                        color: "#fff",
                        textAlign: "center",
                        marginTop: "3px",
                        marginBottom: "20px",
                        fontSize:{xs:'14px',sm:"16px"},
            "@media (max-width:698px)": {
               fontSize:'13px'
            },
                      }}
                    >
                      Click the button below to
                      <br />
                      upload a different MRI
                      <br />
                      image.
                    </Typography>
                    <TooltipButton onClick={resetImage}></TooltipButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Container>

      <Box
        component={"section"}
        className="predict_tumor_form"
        sx={{ bgcolor: "#fff" ,
               }}
      >
        <Box
          className="student_diagnosis_form"
          sx={{
            backgroundColor: "#171717",
            paddingX: "26px",
            paddingTop: "30px",
            paddingBottom: "90px",
            minHeight: "540px",
            position: "relative",
            paddingRight: "650px",
            "@media (max-width:1400px)": {
              paddingRight: "560px",
            },
            "@media (max-width:1080px)": {
              paddingX: "20px",
              paddingBottom: "25px",
            },
          }}
        >
          <Typography
            component={"h2"}
            sx={{
              color: "#fff",
              fontWeight: "500",
              paddingBottom: "20px",
              fontSize:{xs:"22px",sm: "30px"},
              fontFamily: "var(--secondary-font)",
            }}
          >
            Student Diagnosis
          </Typography>
          <Box
            className="student_form flex_column"
            component={"form"}
            onSubmit={handleSubmit(submitReport)}
            sx={{
              minHeight: isLoading ? "880px" : "auto",
              position: "relative",
            }}
          >
            {isError && (
              <Box
                component={"section"}
                className="server_error_section"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "200px",
                }}
              >
                <Typography
                  component={"h1"}
                  variant="h5"
                  sx={{
                    boxShadow: "0 0 15px rgba(255, 0, 0, 0.6)",
                    border: "1px solid var(--primary-color)",
                    width: "fit-content",
                    borderRadius: "60px",
                    color: "#fff",
                    px: "18px",
                    py: "10px",
                    bgcolor: "#171717",
                        fontSize:{xs:"12px",sm:"15px"},
                  }}
                >
                  {error?.message}
                </Typography>
              </Box>
            )}
            {/* Loader فوق الفورم */}
            {isLoading && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 10,
                }}
              >
                <Loader />
              </Box>
            )}

            {/* الفورم */}
            {!isLoading &&
              data?.map((q, index) => (
                <FormControl
                  key={q.id}
                  error={!!errors[q.id]}
                  fullWidth
                  sx={{ marginY: "20px" }}
                >
                  <FormLabel
                    sx={{
                      color: "#fff",
                      "&.Mui-focused": { color: "#fff" },
                      mb: 2,
                      fontSize:{ xs:"15px",sm:"17px"},
                     wordBreak: "break-word",      
                     overflowWrap: "break-word",   
                    }}
                  >
                    <Typography
                      className={style.pulse_wrapper}
                      component="span"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        backgroundColor: "var(--primary-color)",
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        marginRight: "12px",
                      }}
                    >
                      {index + 1}
                    </Typography>
                      {q.text}
                    {q.isRequired === false && (
                      <Typography
                        component="span"
                        sx={{
                          marginLeft: "10px",
                          fontSize: "12px",
                          color: "#9c9898",
                        }}
                      >
                        (Optional)
                      </Typography>
                    )}
                  </FormLabel>

                  {q.type === 2 && (
                    <Controller
                      name={q.id}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <>
                          <RadioGroup
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                          >
                            <Grid container spacing={2}>
                              {" "}
                              {q.options.map((opt) => (
                                <Grid item size={{ xs: 12, md: 6 }} key={opt}>
                                  {" "}
                                  <FormControlLabel
                                    disabled={isDisabled(q)}
                                    control={
                                      <Radio
                                        value={opt}
                                        sx={{ display: "none" }}
                                      />
                                    }
                                    label={opt}
                                    sx={{
                                      m: 0,
                                      width: "100%",
                                      borderRadius: "14px",
                                      border: "1px solid #333",
                                      backgroundColor: "#111",
                                      color: "#fff",
                                      py: 2,
                                      px: 2,
                                      textTransform: "capitalize",
                                      "&.Mui-disabled": {
                                        cursor: "not-allowed !important",
                                      },
                                      "&:hover": {
                                        backgroundColor: "#1a1a1a",
                                        transform: "scale(1.02)",
                                      },
                                      "&.Mui-disabled .MuiTypography-root": {
                                        color: "#4e4c4c",
                                        fontWeight:"500"
                                      },
                                      "&:has(input:checked)": {
                                        backgroundColor: "#ff2d2d",
                                        borderColor: "#ff2d2d",
                                      },
                                    }}
                                  />{" "}
                                </Grid>
                              ))}{" "}
                            </Grid>
                          </RadioGroup>
                          <FormHelperText sx={{ color: "red" }}>
                            {errors[q.id]?.message}
                          </FormHelperText>
                        </>
                      )}
                    />
                  )}

                  {q.type === 1 && (
                    <TextField
                      {...register(q.id)}
                      disabled={isDisabled(q)}
                      variant="filled"
                      label={q.code}
                      fullWidth
                      multiline
                      rows={2}
                      error={!!errors[q.id]}
                      helperText={errors[q.id]?.message}
                      sx={{
                        "& .MuiInputBase-root.Mui-disabled": {
                          cursor: "not-allowed !important",
                        },
                        "& .MuiInputBase-root.Mui-disabled textarea": {
                          cursor: "not-allowed !important",
                        },
                       
                        "& textarea": {
                          "&::-webkit-scrollbar": { width: "6px" },
                          "&::-webkit-scrollbar-track": { background: "#171717" },
                          "&::-webkit-scrollbar-thumb": {
                            background: "#ff0000",
                            borderRadius: "10px"
                          },"&::-webkit-scrollbar-thumb:hover": { background: "#cc0000", cursor:"grab" },
                        }
                      }}
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          color: "#ccd6f6",
                          paddingInline: "1em",
                          borderRadius: "10px",
                          boxShadow: "inset 2px 5px 10px rgb(5,5,5)",
                          backgroundColor: "#171717",
                        },
                      }}
                      InputLabelProps={{
                        shrink: !!watch(q.id),
                        sx: {
                          color: "var(--mid-gray-color)",
                          marginLeft: "10px",
                          fontWeight: "500",
                          "&.Mui-focused": {
                            color: "var(--mid-gray-color)",
                          },
                          "&.Mui-disabled": {
                            color: "var(--mid-gray-color)",
                          },
                        },
                      }}
                    />
                  )}
                </FormControl>
              ))}
          </Box>
          <Box
            className="send_btn_and_errors flex_column"
            sx={{
              "@media (min-width:1080.1px)": {
                display: "none",
              },
              alignItems: "center",
            }}
          >
            <Box className="send_btn" sx={{ marginTop: "30px" }}>
              <SendButton
                onClick={handleSubmit(submitReport)}
                isSuccess={isSubmittedSuccessfully}
                disabled={isLocked || isLoadingBtn}
              />
            </Box>
            {serverErrors?.length > 0 ? (
              <Typography
                component={"p"}
                sx={{
                  border: "1px solid var(--primary-color)",
                  width: "fit-content",
                  borderRadius: "60px",
                  color: "#fff",
                  px: "18px",
                  py: "10px",
                  bgcolor: "#171717",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 0 15px rgba(255, 0, 0, 0.6)",
                  marginTop: "40px",
                      fontSize:{xs:"12px",sm:"15px"},
                }}
              >
                <Typography component={"span"} className={style.pulse_wrapper} sx={{
                   "--pulse-size": "14px",          
                   "--pulse-wrapper-size": "14px",  "--pulse-scale": "0.1"  }}  >
                  <FaCircle size={18} color="ff2d2d" />
                </Typography>
                {serverErrors}
              </Typography>
            ) : (
              ""
            )}
            {fileError && (
              <Typography
                component={"p"}
                sx={{
                  border: "1px solid var(--primary-color)",
                  width: "fit-content",
                  borderRadius: "60px",
                  color: "#fff",
                  px: "18px",
                  py: "10px",
                  bgcolor: "#171717",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 0 15px rgba(255, 0, 0, 0.6)",
                  marginTop: "40px",
                  fontSize:{xs:"12px",sm:"15px"},
                }}
              >
                <Typography component={"span"} className={style.pulse_wrapper} sx={{
                   "--pulse-size": "14px",          
                   "--pulse-wrapper-size": "14px",  "--pulse-scale": "0.1"  }} >
                  <FaCircle size={18} color="ff2d2d" />
                </Typography>
                {fileError}
              </Typography>
            )}
          </Box>
          <Box
            className="flex_column"
            sx={{
              bgcolor: "#fff",
              position: "absolute",
              right: "0",
              top: "0",
              bottom: "0",
              borderBottomLeftRadius: "50%",
              borderTopLeftRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              paddingX: "45px",
              "@media (max-width:1400px)": {
                paddingX: "10px",
              },
              "@media (max-width:1080px)": {
                display: "none",
              },
            }}
          >
            <Typography
              component={"h2"}
              sx={{
                fontFamily: "var(--secondary-font)",
                fontSize: "70px",
                fontWeight: "600",
              }}
            >
              Case Evaluation
            </Typography>
            <Typography
              sx={{
                fontFamily: "var(--secondary-font)",
                fontSize: "17px",
                color: "var(--mid-gray-color)",
                marginBottom: "60px",
                marginTop: "10px",
              }}
            >
              Carefully analyze the MRI image and answer the questions based{" "}
              <br /> on your observation. This step helps you practice clinical
              thinking
              <br />
              before viewing the AI results.
            </Typography>
            <SendButton
              onClick={handleSubmit(submitReport)}
              isSuccess={isSubmittedSuccessfully}
            />
            {serverErrors?.length > 0 ? (
              <Typography
                component={"p"}
                sx={{
                  border: "1px solid var(--primary-color)",
                  width: "fit-content",
                  borderRadius: "60px",
                  color: "#fff",
                  px: "18px",
                  py: "10px",
                  bgcolor: "#171717",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 0 15px rgba(255, 0, 0, 0.6)",
                  marginTop: "40px",
                      fontSize:{xs:"12px",sm:"15px"},
                  
                }}
              >
                <Typography component={"span"} className={style.pulse_wrapper} sx={{
                "--pulse-size": "14px",          
                "--pulse-wrapper-size": "14px",  "--pulse-scale": "0.1"  }} >
                  <FaCircle size={18} color="ff2d2d" />
                </Typography>
                {serverErrors}
              </Typography>
            ) : (
              ""
            )}
            {fileError && (
              <Typography
                component={"p"}
                sx={{
                  border: "1px solid var(--primary-color)",
                  width: "fit-content",
                  borderRadius: "60px",
                  color: "#ffffff",
                  px: "18px",
                  py: "10px",
                  bgcolor: "#171717",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 0 15px rgba(255, 0, 0, 0.6)",
                  marginTop: "40px",
                      fontSize:{xs:"12px",sm:"15px"},
                  
                }}
              >
                <Typography component={"span"} className={style.pulse_wrapper} sx={{
                  "--pulse-size": "14px",          
                  "--pulse-wrapper-size": "14px",  "--pulse-scale": "0.1"  }} >
                  <FaCircle size={18} color="ff2d2d" />
                </Typography>
                {fileError}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
     {showResult && predictMRIMutation.data && preview ? (
        <Box component={"section"} sx={{ bgcolor: "#fff" }}>
          <Box
            className="ai_result flex_column"
            sx={{
              bgcolor: "#171717",
              paddingTop: "25px",
              paddingBottom: "150px",
              paddingX: {xs:"0px",sm:"30px"},
              gap: "10px",
              justifyContent: "center",
              borderTopRightRadius: "15%",
              "@media (max-width:1080px)": {
                borderTopRightRadius: "0",
              }
              
            }}
          >
            <Grid
              container
              spacing={7}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Grid item size={{ xs: 10, sm: 8, md: 5 }}>
                <Box className="left_side" sx={{ marginBottom: "40px",marginTop:{xs:"40px",sm:"50px",md:"0px"} }}>
                  <Typography
                    component={"h3"}
                    sx={{
                      color: "#fff",
                      fontWeight: "500",
                      fontSize:{xs:"22px",sm: "30px"},
                      paddingBottom: "25px",
                      fontFamily: "var(--secondary-font)",
                    }}
                  > 
                  <Box component={SlEnergy} sx={{color:"var(--primary-color)",fontSize:{xs:"27px",sm:"30px"}}} />
                    
                    Grad-CAM Heatmap
                  </Typography>
                  <Box
                    className="image_preview_gradcam flex_column"
                    sx={{
                      bgcolor: "#171717",
                      border: "1px solid #4b4848",
                      boxShadow: "0 0 20px 0 rgba(213, 211, 211, 0.2)",
                      borderRadius: "20px",
                      padding: "15px",
                    }}
                  >
                    <Box
                      className="image"
                      sx={{
                        position: "relative",
                        paddingX: "60px",
                        paddingY: "10px",
                        borderRadius: "20px",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        "@media (max-width:1200px)": {
                          paddingLeft: 0,
                          paddingRight: 0,
                        },
                      }}
                    >
                      <Box component={"img"}
                        src={preview}
                        alt="Brain MRI scan"
                        sx={{ height: "auto", width: "100%" }}
                      />
                      <Box
                        className="gradcam_container"
                        sx={{
                          position: "absolute",
                          left: "60px",
                          right: "60px",
                          top: "10px",
                          bottom: "10px",
                        }}
                      >
                        {showGradCam && (
                          <Box component={"img"}
                            src={predictMRIMutation.data?.gradCamUrl}
                            sx={{ height: "100%", width: "100%" }}
                            alt="Grad-CAM brain scan heatmap explaining why the AI model classified the MRI as this tumor type"
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    className="viewing_buttons"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      className={style.toggle_btn}
                      type="button"
                      onClick={() => setShowGradCam((prev) => !prev)}
                      sx={{
                        backgroundColor: showGradCam ? "#410f0fb3" : "#d80101",
                        color: "#fff",
                        textTransform: "capitalize",
                        paddingY: "5px",
                        paddingX: {xs:'15px',sm:"20px"},
                        marginTop: "30px",
                        display: "flex",
                        gap: "20px",
                        borderRadius: "20px",
                        boxShadow: "0 0 15px rgba(255, 0, 0, 0.6)",
                      }}
                    >
                      <GiCycle size={20} />
                      <Typography sx={{ fontSize: {xs:'14px',sm:"17px"}, fontWeight: "500" }}>
                        {showGradCam ? (
                          <>
                            {" "}
                            Preview <br /> MRI Scan
                          </>
                        ) : (
                          <>
                            {" "}
                            Preview <br /> Heatmap{" "}
                          </>
                        )}
                      </Typography>
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item size={{ xs: 12, md: 7 }}>
                <Box className="right_side" sx={{padding:{xs:'20px',sm:"0px"},}}>
                  <Box
                    component={"span"}
                    sx={{
                      color: "#fff",
                      display: "flex",
                      gap: "10px",
                      fontWeight: "500",
                       fontSize:{xs:"22px",sm: "30px"},
                      marginBottom: "40px",
                      alignItems: "center",
                      fontFamily: "var(--secondary-font)",
                    }}
                  >
                    <Box component={LuBrain} sx={{color:"var(--primary-color)",fontSize:{xs:"25px",sm:"30px"}}} />
                    AI Diagnosis Result
                  </Box>
                  <Box
                    className="ai_prediction"
                    sx={{
                      width: "100%",
                      marginTop: { xs: "20px", md: "100px" },
                      marginBottom: "55px",
                    }}
                  >
                    <Typography
                      component={"h3"}
                      sx={{
                        color: "var(--secondary-color)",
                        paddingBottom: "10px",
                        fontWeight: "600",
                        fontSize:{xs:'14px',sm:'16px'}
                      }}
                    >
                      Predicted Condition
                    </Typography>
                    <Typography
                      sx={{
                        color: "#fff",
                        border: "2px solid #343434",
                        borderRadius: "5px",
                        padding: "10px",
                        fontSize: {xs:'15px',sm:"20px"},
                        fontWeight: "500",
                        textTransform: "capitalize",
                        paddingLeft: "20px",
                      }}
                    >
                      {predictMRIMutation.data?.tumorResult}
                    </Typography>
                  </Box>
                  <Box
                    className="confidence_level"
                    sx={{ marginTop: "40px", width: "100%", mt: 2 }}
                  >
                    <Box
                      className="percentage"
                      sx={{ display: "flex", marginBottom: "10px" }}
                    >
                      <Typography
                        sx={{
                          color: "var(--secondary-color)",
                          fontWeight: "600",
                          flexGrow: "1",
                          fontSize:{xs:'14px',sm:'16px'}
                        }}
                      >
                        Confidence Level
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgb(249, 10, 10)",
                          mb: 1,
                          fontSize: {xs:'15px',sm:"20px"},
                          fontWeight: "400",
                        }}
                      >
                        {predictMRIMutation.data?.percentage}%
                      </Typography>
                    </Box>

                    <LinearProgress
                      variant="determinate"
                      value={predictMRIMutation.data?.percentage || 0}
                      sx={{
                        boxShadow: "0 0 10px 0 rgb(249, 10, 10)",
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "#020202",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "red",
                        },
                      }}
                    />
                  </Box>
                  <Box
                    className="detection_status flex_column"
                    sx={{ alignItems: "flex-start" }}
                  >
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontWeight: "600",
                        marginTop: "22px",
                        marginBottom: "10px",
                        fontSize:{xs:'14px',sm:'16px'}
                      }}
                    >
                      Detection Status
                    </Typography>
                    <Box
                      component={"span"}
                      sx={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        border: "1px solid #ff0000",
                        borderRadius: "5px",
                        bgcolor: "#79030334",
                        color: "#ff0000",
                        paddingY:{xs:'5px',sm: "5px"},
                        paddingX:{xs:'13px',sm: "25px"},
                        fontSize:{xs:'14px',sm:'16px'}
                      }}
                    >
                      <IoIosCheckmarkCircleOutline size={18} color="#ff0000" />
                      Detected
                    </Box>
                  </Box>
                  <Box
                    className="analysis_time"
                    sx={{
                      borderTop: "1px solid #343434",
                      width: "100%",
                      marginTop: "25px",
                    }}
                  >
                    <Typography
                      component={"h3"}
                      sx={{
                        color: "var(--secondary-color)",
                        paddingTop: "30px",
                        width: "100%",
                        paddingBottom: "10px",
                        fontWeight: "100",
                        fontSize: "13px",
                      }}
                    >
                      Analysis Time
                    </Typography>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: "100",
                      }}
                    >
                      {analysisTime ? `${analysisTime} seconds` : "—"}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <Box component={"section"} sx={{ bgcolor: "#fff" }}>
          <Box
            className="hidden_ai_result flex_column"
            sx={{
              bgcolor: "#171717",
              alignItems: "center",
              paddingX: { xs: "10px", md: "80px" },
              paddingY: { xs: "30px", md: "80px" },
              borderTopRightRadius: "15%",
              "@media (max-width:1080px)": {
                borderTopRightRadius: "0",
              }
            }}
          >
            <Box
              component={"span"}
              sx={{
                color: "#fff",
                display: "flex",
                gap: "10px",
                fontWeight: "500",
                fontSize: "30px",
                marginBottom: "50px",
                alignItems: "center", "@media (max-width:900px)": {
                    marginTop:'35px'
              },
              }}
            >
              <Box component={LuBrain} sx={{color:"var(--primary-color)",fontSize:{xs:"25px",sm:"30px"}}} />
              <Typography
                sx={{
                  fontFamily: "var(--secondary-font)",
                  fontWeight: "500",
                  fontSize: { xs: "22px", sm: "40px" },
                  flex: "0 0 auto"
                }}
              >
                AI Diagnosis Result
              </Typography>
            </Box>

            <Box component={"span"} className={style.pulse_wrapper_lock}>
              <IoLockClosedOutline size={60} color="var(--light-red-color)" />
            </Box>

            <Typography
              component={"p"}
              sx={{
                color: "var(--secondary-color)",
                marginY: "50px",
                letterSpacing: "2px",
                textAlign: "center",
                 fontSize: { xs: "14px", sm: "18px" },
              }}
            >
              AI result will appear after submitting the report
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default PredictTumor;